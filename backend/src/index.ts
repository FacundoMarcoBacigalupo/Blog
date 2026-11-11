import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();
const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const IS_PROD = process.env.NODE_ENV === "production";

// ---------- In-memory rate limiter: 15 attempts per IP, 6h block ----------
type Bucket = { count: number; firstAt: number; blockedUntil: number };
const buckets = new Map<string, Bucket>();
const MAX_ATTEMPTS = 15;
const WINDOW_MS = 6 * 60 * 60 * 1000; // 6h

function checkRate(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b) return { ok: true };
  if (b.blockedUntil && now < b.blockedUntil) {
    return { ok: false, retryAfter: Math.ceil((b.blockedUntil - now) / 1000) };
  }
  if (now - b.firstAt > WINDOW_MS) {
    buckets.delete(ip);
    return { ok: true };
  }
  if (b.count >= MAX_ATTEMPTS) {
    b.blockedUntil = now + WINDOW_MS;
    return { ok: false, retryAfter: Math.ceil(WINDOW_MS / 1000) };
  }
  return { ok: true };
}

function recordAttempt(ip: string, success: boolean) {
  const now = Date.now();
  let b = buckets.get(ip);
  if (!b || now - b.firstAt > WINDOW_MS) {
    b = { count: 0, firstAt: now, blockedUntil: 0 };
    buckets.set(ip, b);
  }
  if (success) {
    buckets.delete(ip);
  } else {
    b.count += 1;
    if (b.count >= MAX_ATTEMPTS) {
      b.blockedUntil = now + WINDOW_MS;
    }
  }
}

// ---------- Seed admin ----------
async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "statimsoftware@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "ssstatim12345678";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, passwordHash: hash, role: "admin" } });
    console.log("Admin seeded:", email);
  }
}

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: FRONTEND_URL.split(",").map((s) => s.trim()),
  credentials: true,
});
await app.register(cookie);

// Rate limit hook for auth routes
app.addHook("preHandler", async (req, reply) => {
  if (req.url.startsWith("/api/auth/")) {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip;
    const r = checkRate(ip);
    if (!r.ok) {
      reply.code(429).send({ error: "too_many_attempts", retryAfter: r.retryAfter });
      return;
    }
  }
});

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
const registerSchema = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().optional() });

app.post("/api/auth/register", async (req, reply) => {
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip;
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    recordAttempt(ip, false);
    return reply.code(400).send({ error: "invalid_input" });
  }
  const { email, password } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    recordAttempt(ip, false);
    return reply.code(409).send({ error: "email_taken" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash: hash, role: "user" } });
  recordAttempt(ip, true);
  const token = jwt.sign({ uid: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  reply.setCookie("access_token", token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: IS_PROD ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return { user: { id: user.id, email: user.email, role: user.role } };
});

app.post("/api/auth/login", async (req, reply) => {
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip;
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    recordAttempt(ip, false);
    return reply.code(400).send({ error: "invalid_input" });
  }
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    recordAttempt(ip, false);
    return reply.code(401).send({ error: "invalid_credentials" });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    recordAttempt(ip, false);
    return reply.code(401).send({ error: "invalid_credentials" });
  }
  recordAttempt(ip, true);
  const token = jwt.sign({ uid: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  reply.setCookie("access_token", token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: IS_PROD ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return { user: { id: user.id, email: user.email, role: user.role } };
});

app.post("/api/auth/logout", async (_req, reply) => {
  reply.clearCookie("access_token", { path: "/" });
  return { ok: true };
});

app.get("/api/auth/me", async (req, reply) => {
  const token = req.cookies?.access_token;
  if (!token) return reply.code(401).send({ error: "unauthenticated" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { uid: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: payload.uid } });
    if (!user) return reply.code(401).send({ error: "unauthenticated" });
    return { user: { id: user.id, email: user.email, role: user.role } };
  } catch {
    return reply.code(401).send({ error: "unauthenticated" });
  }
});

app.get("/api/health", async () => ({ ok: true }));

const start = async () => {
  await seedAdmin();
  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`Backend listening on ${PORT}`);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
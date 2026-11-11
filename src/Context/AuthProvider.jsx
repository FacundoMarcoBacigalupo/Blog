/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const AuthContext = React.createContext([]);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categorySelected, setCategorySelected] = useState("");

    const api = async (path, opts = {}) => {
        const res = await fetch(`${BACKEND}${path}`, {
            ...opts,
            credentials: "include",
            headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
            body: opts.body ? JSON.stringify(opts.body) : undefined,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "request_failed");
        return data;
    };

    const registerUser = async (email, password) => {
        const data = await api("/api/auth/register", { method: "POST", body: { email, password } });
        setUser(data.user);
    };

    const loginUser = async (email, password) => {
        const data = await api("/api/auth/login", { method: "POST", body: { email, password } });
        setUser(data.user);
        return data.user;
    };

    const closeSesion = async () => {
        try { await api("/api/auth/logout", { method: "POST" }); } catch (e) { console.error(e); }
        setUser(null);
        window.location.reload();
    };

    const getRol = useCallback(async () => {
        return user?.role || "user";
    }, [user]);

    useEffect(() => {
        api("/api/auth/me").then(d => setUser(d.user)).catch(() => setUser(null)).finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, registerUser, loginUser, getRol, closeSesion, categorySelected, setCategorySelected }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
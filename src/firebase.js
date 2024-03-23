import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASURE_REMENT_ID
}  


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


export const storage = getStorage(app)
const storageRef = ref(storage, `picturesPosts/${v4()}`)

export async function uploadFile(file){
    return await uploadBytes(storageRef, file)
}

export async function getFile(filePath){
    const fileRef = ref(storage, filePath);
    const url = await getDownloadURL(fileRef);
    return url;
}
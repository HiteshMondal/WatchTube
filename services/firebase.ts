import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
} from "firebase/firestore";
import { Alert } from "react-native";

// Use process.env from Expo config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      authProvider: "local",
      name,
      email,
    });
    Alert.alert("Success", "Account created successfully!");
  } catch (error: any) {
    console.error("Signup error:", error);
    const msg = error.code?.split("/")[1]?.split("-").join(" ") || "Signup failed";
    Alert.alert("Signup Error", msg);
  }
};

const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Alert.alert("Success", "Logged in successfully!");
  } catch (error: any) {
    console.error("Login error:", error);
    const msg = error.code?.split("/")[1]?.split("-").join(" ") || "Login failed";
    Alert.alert("Login Error", msg);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    Alert.alert("Logged Out", "You have been signed out.");
  } catch (error) {
    console.error("Logout error:", error);
    Alert.alert("Logout Error", "Something went wrong.");
  }
};

export { auth, db, login, logout, signup };


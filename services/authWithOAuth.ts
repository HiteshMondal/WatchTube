import * as Google from "expo-auth-session/providers/google";
import { auth } from "./firebaseConfig";
const { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } = require("firebase/auth");


export const signInWithOAuth = async (provider: "google") => {
  if (provider === "google") {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO,
    });

    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      await signInWithCredential(auth, credential);
      return { type: "success", user: auth.currentUser };
    } else {
      return { type: "error", message: "Google sign-in failed." };
    }
  }

  return { type: "error", message: "Unsupported provider" };
};

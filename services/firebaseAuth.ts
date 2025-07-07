import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export const firebaseSignUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const firebaseSignIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

import { account } from './appwrite';

export const appwriteSignUp = async (email: string, password: string, name: string) => {
  return await account.create('unique()', email, password, name);
};

export const appwriteSignIn = async (email: string, password: string) => {
  return await account.createSession(email, password);
};

export const appwriteGetUser = async () => {
  return await account.get();
};

export const appwriteLogout = async () => {
  return await account.deleteSession('current');
};

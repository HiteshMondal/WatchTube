// services/authWithOAuth.ts
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { client } from "./appwrite";

WebBrowser.maybeCompleteAuthSession();

export const signInWithOAuth = async (provider: "google") => {
    const redirectUri = makeRedirectUri({
        native: "watchtube://auth",
      });      
     console.log("Redirect URI:", redirectUri);
       
  const authUrl =
  `${client.config.endpoint}/account/sessions/oauth2` +
  `?provider=${provider}&project=${client.config.project}` +
  `&success=${encodeURIComponent(redirectUri)}` +
  `&failure=${encodeURIComponent(redirectUri)}`;

  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

  return result;
};

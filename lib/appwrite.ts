import { Account, Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://[YOUR-ENDPOINT].appwrite.io/v1") // replace with your Appwrite endpoint
  .setProject("[YOUR-PROJECT-ID]"); // replace with your project ID

const account = new Account(client);

export { account, client };


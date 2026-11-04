import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_CLIENT_URL as string);
const db = client.db("socialEvenets");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins:[
    jwt(),
  ],
  session:{
    cookieCache:{
      enabled: true,
      strategy: 'jwt',
      maxAge: 3 * 24 * 60 * 60
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});

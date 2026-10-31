import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("wanderlust");

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://wanderlust-frontend-pi.vercel.app",
  ],
     emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    client,
  }),
  plugins:[
    jwt()
  ], session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60
    }
  }
});

/**
 * 
 * 4 end video
 */
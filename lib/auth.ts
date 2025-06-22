import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { SignInSchemaType, signInSchema } from "@/lib/signInSchema"
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client"

const adapter = PrismaAdapter(prisma as  unknown as PrismaClient)

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: adapter,
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "john.doe@example.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials as SignInSchemaType)
                             
          const user = await prisma.user.findUnique({
            where: {
              email,
            }
          })
                     
          if (!user || !user.password) {
            console.log("User not found error")
            return null
          }
                     
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log("Password mismatch error")
            return null
          }
                                 

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
          }
        } catch (error) {
          console.log("Auth Error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
 
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        try {
          const sessionToken = uuid();
 
          if (!params.token.sub) {
            console.error("No user ID found in token");

            return defaultEncode(params);
          }
 
          const createdSession = await adapter?.createSession?.({
            sessionToken: sessionToken,
            userId: params.token.sub,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });
 
          if (!createdSession) {
            console.error("Failed to create session");
            return defaultEncode(params);
          }
 
          return sessionToken;
        } catch (error) {
          console.error("Error in custom JWT encode:", error);
          return defaultEncode(params);
        }
      }
      return defaultEncode(params);
    },
  },
  pages: {
    signIn: '/signin', 
  },
});
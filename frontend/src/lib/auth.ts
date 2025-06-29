import { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
          id: string;
          googleId: string;
          email: string;
          name?: string;
        } 
        & DefaultSession["user"];
        accessToken?: string;
        nextAuthToken?: any;
        error?: string;
    }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    encode: async ({ secret, token }) => {
      const jwt = require('jsonwebtoken');
      return jwt.sign(token, secret, { algorithm: 'HS256' });
    },
    decode: async ({ secret, token }) => {
      const jwt = require('jsonwebtoken');
      return jwt.verify(token, secret, { algorithms: ['HS256'] });
    },
  },
  
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if(account && user){
        // add user info to token
        token.sub = user.id;
        
        // save Google's access token to pass to backend
        if(account.access_token){
          token.accessToken = account.access_token;
        }
      }
      
      // return the token for future use
      return token;
    },
    
    async session({ session, token }) {
      // add user ID and access token to session
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.googleId = token.sub as string;
        session.accessToken = token.accessToken as string;
      }

      session.nextAuthToken = token;
      
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
  
          const response = await fetch(`${process.env.BACKEND_URL}/api/users/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              googleId: account.providerAccountId, // gogole ID
              email: user.email,
              name: user.name,
            }),
          })
          
          if(response.ok){
            return true
          } 
          else{
            console.error('failed to create/update user in backend')
            return false // block login if failed
          }
        } 
        catch(error){
          console.error('Error calling backend:', error)
          return false
        }
      }
      return true
    },
  },
};
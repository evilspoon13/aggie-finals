import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
        id: string;
        email: string;
        name?: string;
        } & DefaultSession["user"];
        accessToken?: string;
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
        session.accessToken = token.accessToken as string;
      }
      
      return session;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
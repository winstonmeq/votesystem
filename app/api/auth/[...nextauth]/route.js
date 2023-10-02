import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.isAdmin = sessionUser.admin;
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        throw error;
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          // If the user doesn't exist, create a new user
          await User.create({
            email: profile.email,
            username: profile.name.replace(/ /g, '').toLowerCase(),
            admin: true,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        throw error;
      }
    },
  },
});

export { handler as GET, handler as POST };

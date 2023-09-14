import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@/utils/database";

import User from "@/models/User";





const handler = NextAuth({

            providers: [
              GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              }),
            ],

         

            
callbacks:{
  
    async session({ session }) {

        const sessionUser = await User.findOne({

          email: session.user.email,

        });
    
        //session.user.id = sessionUser._id.toString();
        session.user.isAdmin = sessionUser.admin; // Add the isAdmin property to the session user object
    
        return session;

      },
    


  async signIn({ profile }) {

        try {
                   

          await connectToDB();

          //check if a user already exists
          const userExists = await User.findOne({

            email: profile.email,

          });
    
         // console.log(profile.email)
          
          //if not, create a new user
    
          if (!userExists) {
    
            await User.create({
    
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              admin:true,
              image: profile.picture,
    
            });


          }
    
          return true;
    
        } catch (error) {
    
          console.log(error);
    
        }
      },


}

});

export { handler as GET, handler as POST };

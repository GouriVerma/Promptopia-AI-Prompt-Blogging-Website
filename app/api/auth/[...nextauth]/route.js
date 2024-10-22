import User from "@models/user";
import { connectToDB } from "@utils/connectToDB";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks:{
        async session({session}){
            // console.log(session);
            try {
                await connectToDB();
                // console.log("email ",session?.user?.email);
                const sessionUser=await User.findOne({email:session?.user?.email});
                // console.log("sessionUser ",sessionUser);
                session.user.id=sessionUser?._id.toString(); //so that session user id has actual user id
                console.log("returned session ",session);
                return session;
            } catch (error) {
                console.log(error);
                
            }
            
            
        },

        async signIn({profile}){
            console.log("sign in called");
            console.log(profile);
            try {
                await connectToDB();

                //check if user exists
                const user=await User.findOne({email:profile.email});
                if(!user){
                    
                    await User.create({email:profile.email.toLowerCase(),userName:profile.name.replace(" ","").toLowerCase(),image:profile.picture});
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export {handler as GET, handler as POST}
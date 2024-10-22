import User from "@models/user";
import { connectToDB } from "@utils/connectToDB";

export const GET=async(req,{params})=>{
    console.log("params ",params);
    console.log("req",req);
    try {
        await connectToDB();
        console.log("params id",params?.userId);
        const user=await User.findOne({_id:params?.userId});
        return new Response(JSON.stringify(user),{status:200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts",{status:500});
    }
}
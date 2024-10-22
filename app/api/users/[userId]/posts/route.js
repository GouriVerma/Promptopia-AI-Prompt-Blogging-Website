import Prompt from "@models/prompt";
import { connectToDB } from "@utils/connectToDB";

export const GET=async(req,{params})=>{
    console.log("params ",params);
    try {
        await connectToDB();
        const posts=await Prompt.find({userId:params?.userId}).populate("userId");
        return new Response(JSON.stringify(posts),{status:200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts",{status:500});
    }
}
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/connectToDB";

export const GET=async(req,{params,searchParams})=>{
    
    const url=new URL(req.url);
    const tag=url.searchParams.get("tag");
    // console.log("tag ",tag);
    try {
        await connectToDB();
        let searchQuery={};
        if(tag) searchQuery={tag:tag};
        const posts=await Prompt.find({...searchQuery}).populate("userId");
        return new Response(JSON.stringify(posts),{status:200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts",{status:500});
    }
}
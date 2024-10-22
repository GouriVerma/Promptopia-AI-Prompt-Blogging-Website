import Prompt from "@models/prompt";
import { connectToDB } from "@utils/connectToDB";


export const POST=async(req,res)=>{
    const {prompt,tag,userId}=await req.json();
    console.log("userId ",userId);

    try {
        await connectToDB();
        const newPrompt=await Prompt.create({prompt,tag,userId});
        console.log(newPrompt);
        return new Response(JSON.stringify(newPrompt),{status:201});
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new prompt",{status:500});
    }
}


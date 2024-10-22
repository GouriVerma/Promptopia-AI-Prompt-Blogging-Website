import Prompt from "@models/prompt";
import { connectToDB } from "@utils/connectToDB";

//GET
export const GET=async(req,{params})=>{
    
    const promptId=params?.promptId;
    try {
        await connectToDB();
        if(promptId){
            const prompt=await Prompt.findById(promptId);
            if(!prompt){
                return new Response("Prompt not found",{status:404});
            }
            return new Response(JSON.stringify(prompt),{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompt",{status:500});
    }
}


//PATCH
export const PATCH=async(req,{params})=>{
    const promptId=params.promptId;
    const {prompt,tag}=await req.json();
    try {
        await connectToDB();
        const post=await Prompt.findByIdAndUpdate(promptId,{prompt,tag},{new:true});
        if(!post){
            return new Response("Prompt not found",{status:404});    
        }
        return new Response(JSON.stringify(post),{status:200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to update prompt",{status:500});
    }
}


//DELETE
export const DELETE=async(req,{params})=>{
    const promptId=params.promptId;
    try {
        await connectToDB(); 
        await Prompt.findByIdAndDelete(promptId);
        return new Response("Successfully Deleted",{status:200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete prompt",{status:500});
    }
}
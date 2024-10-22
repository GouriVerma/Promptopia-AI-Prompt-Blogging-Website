import {Mongoose, Schema, model, models} from "mongoose"

const promptSchema=new Schema({
    prompt:{
        type:String,
        required:[true,'Prompt is required']
    },
    tag:{
        type:String,
        required:[true,'Tag is required']
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Session user id is required']
    },
    
})

const Prompt=models.Prompt || model("Prompt",promptSchema);
export default Prompt;
const mongoose=require('mongoose');

let isConnected=false;
export const connectToDB=async()=>{
    console.log("hi mongo");
    mongoose.set('strictQuery',true); //Mongoose will ensure that only the fields that are specified in your schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).
    if(isConnected){
        console.log('MongoDB already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            
        })
        isConnected=true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}

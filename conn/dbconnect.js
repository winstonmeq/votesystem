
import mongoose from 'mongoose';



global.mongoose = {
    conn:null,
    promise:null
}


export default async function dbConnect(){

    if(global.mongoose && global.mongoose.conn){

        console.log('already connected!');
     
         return global.mongoose.conn;
         
     }else {
     

        // const connString = 'mongodb+srv://admin:admin123@cluster0.bi6qm.mongodb.net/skvotedb?retryWrites=true&w=majority'
         
         
     
         const promise = mongoose.connect(process.env.MONGODB_URI,{
     
             useNewUrlParser: true,
             useUnifiedTopology: true,
             autoIndex:true,
     
         }).then(mongoose => mongoose);
     
         global.mongoose = {
             conn: await promise,
             promise
         }

         console.log('creating new connection');

     
         return await promise
     
     }


}
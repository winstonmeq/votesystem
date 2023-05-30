
import mongoose from "mongoose";

const VoterSchema = mongoose.Schema({
    
    

    fname: {
        type:String,
     
    },
    lname: {
        type:String,
    
    },

    position: {
        type:String,

    },
  
    address:{
        type:String, 
       
    }

},{

    timestamps: true,

});



export default mongoose.models.Voter || mongoose.model('Voter', VoterSchema);
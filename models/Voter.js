
import mongoose from "mongoose";

const VoterSchema = mongoose.Schema({
    
    

    fname: {
        type:String,
     
    },
    lname: {
        type:String,
    
    },
    age: {
        type:Number,

    },

    position: {
        type:String,

    },

    Prec_Num: {
        type: String
    }, 

    Purok:{
        type:String,        
    },
    
    Member:{
        type:Number,
    }

},{

    timestamps: true,

});



export default mongoose.models.Voter || mongoose.model('Voter', VoterSchema);
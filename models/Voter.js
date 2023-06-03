
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

    prec_num: {
        type: String
    }, 

    purok:{
        type:String,        
    },
    
    member:{
        type:Number,
    }

},{

    timestamps: true,

});



export default mongoose.models.Voter || mongoose.model('Voter', VoterSchema);
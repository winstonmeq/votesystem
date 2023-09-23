
import mongoose from "mongoose";

const RecipientSchema = mongoose.Schema({
    
    

    distribution_id: {
        type:String,
    
    },
    distribution_name: {
        type:String,
     
    },

    voter_id: {
        type: String
    }, 

     
    voter_name: {
        type:String,

    },

    municipality: {
        type:String,

    },

    barangay:{
        type:String,        
    },

    active:{
        type:String,        
    },

    status:{
        type:String,        
    },
        
        

},{

    timestamps: true,

});



export default mongoose.models.Recipient || mongoose.model('Recipient', RecipientSchema);
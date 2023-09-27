
import mongoose from "mongoose";

const GenerateSchema = mongoose.Schema({
    
    

    distribution_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Distribution', // Reference to the Distribution model
    },
    voter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter', // Reference to the Voter model
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store', // Reference to the Store model
    },

    municipality:{
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



export default mongoose.models.Generate || mongoose.model('Generate', GenerateSchema);
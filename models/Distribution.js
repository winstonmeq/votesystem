
import mongoose from "mongoose";

const DistributionSchema = mongoose.Schema({
    
    

    distribution_name: {
        type:String,
    
    },
    type: {
        type:String,
     
    },

    target: {
        type:Number,     
    },
   
    active:{
        type:String,        
    },
    
    

},{

    timestamps: true,

});



export default mongoose.models.Distribution || mongoose.model('Distribution', DistributionSchema);

import mongoose from "mongoose";

const StoreSchema = mongoose.Schema({
    
    

    store_name: {
        type:String,
    
    },
    owner_name: {
        type:String,
     
    },

    mobile: {
        type: String
    }, 

     
    barangay: {
        type:String,

    },

    municipality: {
        type:String,

    },

    active:{
        type:String,        
    },
    
    

},{

    timestamps: true,

});



export default mongoose.models.Store || mongoose.model('Store', StoreSchema);
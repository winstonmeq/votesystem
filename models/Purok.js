
import mongoose from "mongoose";

const PurokSchema = mongoose.Schema({
    
    

    PName: {
        type:String,
     
    },

    
    Coordinator: {
        type:String,
     
    },

    Phone: {
        type:String,
     
    },

    totalVote: {
        type:Number,
    
    },

    RedBox: {
        type:Number,

    },
  
    BlueBox:{
        type:Number, 
       
    },

    GreenBox:{
        type:Number, 
       
    }

},{

    timestamps: true,

});



export default mongoose.models.Purok || mongoose.model('Purok', PurokSchema);
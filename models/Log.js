
import mongoose from "mongoose";
// const bcrypt = require('bcrypt');

const LogSchema = mongoose.Schema({
    
    

    name: {
        type:String,
      
    },
   

},{

    timestamps: true,

});


export default mongoose.models.Log || mongoose.model('Log', LogSchema);
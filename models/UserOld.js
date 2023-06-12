
import mongoose from "mongoose";
// const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    
    

    email: {
        type:String,
        required:true,        
        index: true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        trim:true

    },

    fname: {
        type:String,
        required:true,        
        index: true,
        unique:true

    },
    lname: {
        type:String,
        required:true,        
        index: true,
        unique:true

    },

    position: {
        type:String,
        required:true,        
        index: true,
        unique:true

    },
  
    userlevel:{
        type:Number, 
        index:true,            
        trim:true
    }

},{

    timestamps: true,

});

// UserSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
//   };

UserSchema.methods.comparePassword = function (password) {
    return this.password === password;
  };
  


export default mongoose.models.User || mongoose.model('User', UserSchema);
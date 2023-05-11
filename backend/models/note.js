const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'users',
    },
    title : {
        type:String,
        require : true ,

    }, 
    tag : {
        type:String,
        default : "personal"
    },
    description : {
        type:String,
        require : true ,
    },
    date  : {
        type : Date ,
        default : Date.now 
    }

})

const Note = mongoose.model('notes', noteSchema);

module.exports = Note ; 


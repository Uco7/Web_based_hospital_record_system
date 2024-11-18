const mongoose=require("mongoose");
const emailSchema= mongoose.Schema({
    doc_email:{
        type:String,
        required:true
    },
    doc_name:{
        type:String,
        required:true
    },
    specialty:{
        type:String,
        required:true,
    },
    patient_name:{
        type:String,
        required:true,
    },
    patient_email:{
        type:String,
        required:true,
    },
    currentDate: {
        type: Date,
        default: Date.now // Automatically set to the current date and time when the document is created
    },

})
const Email=mongoose.model("email",emailSchema)
module.exports=Email;
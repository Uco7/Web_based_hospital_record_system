const mongoose=require("mongoose");
const appointtmentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone_no:{
        type:Number,
        required:true
    },
    currentDate: {
        type: Date,
        default: Date.now // Automatically set to the current date and time when the document is created
    },
})
const Appointment=mongoose.model("bookedAppointment",appointtmentSchema)
module.exports=Appointment;
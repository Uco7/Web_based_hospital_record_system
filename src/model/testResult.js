const { type } = require('jquery');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the TestResult
const testResultCardSchema = new Schema({
    fName: { type: String, required: true },
    phone_no: { type: String, required: true },
    address: { type: String, required: true },
    docRemark: { type: String, default: '' },
    genotype: { type: String, default: '' },
    blood_group: { type: String, default: '' },
    illness: { type: String, default: '' },
    pulseRate: { type: Number, required: true },
    bloodPressure: {
        type: String, // Change this to String or Enum based on your needs
        enum: ['Normal', 'Elevated', 'High', 'Very High'], // Example values
        required: true
    },
    hivStatus: {
        type: String,
        enum: ['Positive', 'Negative'],
        required: true
    },
    aidsStatus: {
        type: String,
        enum: ['Positive', 'Negative'],
        required: true
    },
    sugarLevel: { type: Number, required: true },
    feverStatus: {
        type: String,
        enum: ['++', '+', 'Normal', '-'],
        required: true
    },
    pregnancyStatus: {
        type: String,
        enum: ['Positive', 'Negative'],
       
    },
    malariaStatus: {
        type: String,
        enum: ['High', 'Normal', 'Accurate', 'Negative'],
        required: true
    },
    currentDate: {
        type: Date,
        default: Date.now // Automatically set to the current date and time when the document is created
    },
    doc_email:{
        type:String,
        required:true
    },
    doc_name:{
        type:String,
        required:true
    },
    patient_email:{
        type:String,
        required:true

    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the model
const TestResult = mongoose.model('TestResult', testResultCardSchema);
module.exports = TestResult;

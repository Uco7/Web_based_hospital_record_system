const TestResult = require('../model/testResult');
const nodemailer = require('nodemailer');
const Patientmodel = require('../model/patient');
const PurchaseCard = require('../model/purchaseCard');
const Email = require("../model/email");
const DocSpecialty=require("../model/docSpecialty")
const Appointment = require('../model/appointment');

module.exports = {
    findPurchaseCard: async (req, res) => {
        try {
            if (req.query.id) {
                const cardId = req.query.id;
                const user = await PurchaseCard.findById(cardId).populate("patient");
                if (user) {
                    console.log('Retrieved user', user);
                    res.status(201).json({
                        status: 'success',
                        cardData: user
                    });
                } else {
                    res.status(404).json({ status: 'fail', message: 'Card not found' });
                }
            } else {
                const allData = await PurchaseCard.find().populate("patient");
                if (allData) {
                    console.log('All users', allData);
                    res.status(201).json({
                        status: 'success',
                        allData
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    submitTestResult: async (req, res) => {
        try {
            // Extract form data from the request body
            const {
                doc_name,
                doc_email,
                fName,
                phone_no,
                address,
                docRemark,
                genotype,
                blood_group,
                illness,
                pulseRate,
                bloodPressure,
                hivStatus,
                aidsStatus,
                sugarLevel,
                feverStatus,
                pregnancyStatus,
                malariaStatus,
                patient_email
            } = req.body;

            // Validate bloodPressure format
            const validBloodPressureValues = ["Normal", "Elevated", "High", "Very High"];
            if (!validBloodPressureValues.includes(bloodPressure)) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid bloodPressure value. Use one of the predefined options.'
                });
            }

            // Find the patient by phone number
            const patient = await Patientmodel.findOne({ phone_no });
            if (!patient) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Patient not found'
                });
            }

            console.log('Found patient:', patient);

            // Create a new test result document
            const newTestResult = new TestResult({
                doc_name,
                doc_email,
                fName,
                phone_no,
                patient_email,
                address,
                docRemark,
                genotype,
                blood_group,
                illness,
                pulseRate,
                bloodPressure,
                hivStatus,
                aidsStatus,
                sugarLevel,
                feverStatus,
                pregnancyStatus,
                malariaStatus,
                patient: patient._id, // Reference the patient
                currentDate: new Date() // Store current date
            });

            // Save the test result to the database
            await newTestResult.save();
            console.log("new test result",newTestResult)

            // Send email to the doctor
            await sendEmailToDoctor({
                doc_name,
                doc_email,
                illness,
                patient_email,
                patient_name: fName
            });

            // Save email data to the database
            const emailData = await Email.create({
                doc_name,
                doc_email,
                fName,
                specialty: illness,
                patient_email,
                patient_name: fName
            });

            if (emailData) {
                console.log("Email data saved:", emailData);
            }

            // Respond with success
            res.status(201).json({
                status: 'success',
                message: 'Test result submitted successfully',
                testResult: newTestResult
            });

        } catch (error) {
            console.error('Error submitting test result:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to submit test result',
                error: error.message
            });
        }
    },

    patientTestResult: async (req, res) => {
        try {
            const allTestResult = await TestResult.find();
            if (allTestResult) {
                console.log('all test result', allTestResult);

                return res.status(201).json({
                    status: "success",
                    allTestResult
                });
            }

        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                message: "internal server error" || error
            });
        }
    },

    docPatient: async (req, res) => {
        try {
            const asignedPatient = await Email.find();
            if (asignedPatient) {
                console.log('all asigned patients', asignedPatient);

                return res.status(201).json({
                    status: "success",
                   asignedPatient
                });
            }

        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                message: "internal server error" || error
            });
        }
    },
    findSpecialty: async(req,res)=>{
        try {
        
            const specialty = await DocSpecialty.find();
        
            if (!specialty) {
              return res.status(404).send('Doctor specialization not found');
            }
        
            res.status(200).json(specialty);
          } catch (error) {
            console.error('Error fetching doctor specialization:', error);
            res.status(500).send('An error occurred while fetching the specialization');
          }
    },
    patientRecords: async(req,res)=>{
        try {
            const cardRecords=await Email.find()
            if(cardRecords){
                console.log("patients records",cardRecords);
                res.status(200).json({
                    status:"success",
                    cardRecords
                })
            }
            
        } catch (error) {
            console.log("error")
            res.status(500).json({
                message:"internal server error"||error
            })
            
        }
    
    },
    // labTecUpdate: async(req,res)=>{

    //     try {
    //         if(req.params.id){
    //             const dataId=req.params.id;
    //             const result=await TestResult.findByIdAndUpdate(dataId)
    //             if(!result){
    //                 res.status(404).json({
    //                     status:"failed"||"Resource Not Found!!!"
    //                 })
    //             }

    //         }
    //         console.log("data updated successfully",result);
            
    //     } catch (error) {
    //         console.log("error",error);
    //         res.status(500).json({
    //             message:"internal servrer error"|| error
    //         })
            
            
    //     }
    // },
    
    // labTecDelete: async(req,res)=>{

    //     try {
    //         if(req.params.id){
    //             const dataId=req.params.id;
    //             const result=await TestResult.findByIdAndDelete(dataId)
    //             if(!result){
    //                 res.status(404).json({
    //                     status:"failed"||"Resource Not Found!!!"
    //                 })
    //             }

    //         }
    //         console.log("data deleted successfully",result);
            
    //     } catch (error) {
    //         console.log("error",error);
    //         res.status(500).json({
    //             message:"internal servrer error"|| error
    //         })
            
            
    //     }
    // }
    appointmentRecords:async(req,res)=>{
        try {
            if(req.query.id){
                const recordId=req.query.id
                const appointment=await Appointment.findById(recordId)
                if(appointment){
                    console.log("record found",appointment)
                    return res.status(200).json({
                        status:"success",
                        appointment
                    })
                }
                else{
                    console.log("record not found")
                }
            }
            else{
                const allRecord=await Appointment.find()
                if(allRecord){
                    console.log("all records found",allRecord)
                    return res.status(201).json({
                        status:"success",
                        allRecord
                    })
                }
                else{
                    console.log("no record found")
                }
            }
            
        } catch (error) {
            res.status(500).json({
                message:"internal server error"
            })
            
        }
    }
   
    
};

// Function to send an email to the doctor
async function sendEmailToDoctor({ doc_name, doc_email, patient_name, patient_email, illness }) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Define email options
        let mailOptions = {
            from: process.env.EMAIL,
            to: doc_email,
            subject: `Test Result for Patient ${patient_name}`,
            html: `
                <h1>Hello, Dr. ${doc_name}!</h1>
                <p>You have received a new test result for patient: ${patient_name}. Email: ${patient_email}</p>
                <p>The patient is diagnosed with ${illness} and needs attention.</p>
                <p>Best regards,<br>Your Company</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent to doctor:', doc_email);

    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}


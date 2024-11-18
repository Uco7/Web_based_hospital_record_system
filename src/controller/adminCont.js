
// const DocSpecialty = require('../model/docSpecialty');
const TestResult = require('../model/testResult');
const Patientmodel = require('../model/patient');
const PurchaseCard = require('../model/purchaseCard');
// const Email = require("../model/email");
const Staffmodel=require("../model/staffs");
const Appointment = require('../model/appointment');



module.exports={
    viewRegStaffs: async(req,res)=>{
        try {
            if(req.query.id){
                const staffId=req.query.id
                const singleStaff=await Staffmodel.findById(staffId);
                if(singleStaff){
                    console.log("single patient",singleStaff);
                    res.status(200).json({
                        status:"success",
                        singleStaff
                    })
                }
                else{
                    console.log("patient not found");
                    
                }
            }else{

                const regStaff = await Staffmodel.find();
            if (regStaff) {
                console.log("reg staff", regStaff);
                return res.status(200).json({
                    status:"success",
                    regStaff
                })
               
            }
            }
            
        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                message: "internal server error" || error
            });
        }

    },
    viewRegPatients:async(req,res)=>{
        try {
            if(req.query.id){
                const patientId=req.query.id
                const patient=await Patientmodel.findById(patientId);
                if(patient){
                    console.log("single patient",patient);
                    res.status(200).json({
                        status:"success",
                        patient
                    })
                }
                else{
                    console.log("patient not found");
                    
                }
            }else{

                const regPatients=await Patientmodel.find()
                if(regPatients){
                    console.log("reg patients",regPatients);
                    
                   return res.status(200).json({
                        status:"success",
                        regPatients
                    })
                }
            }
        
        } catch (error) {
            console.log("error",error)
            res.status(500).json({
                message:"internal server error"||error
            })
            
        }

    },
    viewCards:async(req,res)=>{
        try {
            const patientCard=await PurchaseCard.find()
            if( patientCard){
                console.log("patients Cards",patientCard);
                
               return res.status(200).json({
                    status:"success",
                    patientCard
                })
            };
            } catch (error) {
    console.log("error",error)
    res.status(500).json({
        message:"internal server error"||error
    })
    
}

    },
    patientRecords:async(req,res)=>{
        try {
            if(req.query.id){
                const testId=req.query.id
                const result=await TestResult.findById(testId);
                if(result){
                    console.log("single patient",result);
                    res.status(200).json({
                        status:"success",
                        result
                    })
                }
                else{
                    console.log("patient not found");
                    
                }
            }else{

                const patientRecords=await TestResult.find()
            if( patientRecords){
                console.log("patients Cards",patientRecords);
                
               return res.status(200).json({
                    status:"success",
                    patientRecords
                })
            };
            }
          
            } catch (error) {
    console.log("error",error)
    res.status(500).json({
        message:"internal server error"||error
    })
    
}

    },
    updateTestResult: async(req,res)=>{

        // try {
        //     if(req.params.id){
        //         const dataId=req.params.id;
        //         const body=req.body
        //         const result=await TestResult.findByIdAndUpdate(dataId,body,{new:true})
        //         if(result){
        //             console.log("data updated successfully",result);
        //             return res.status(200),json({
        //                 status:"success",
        //                 result
        //             })
                
        //         }
        //         else {
        //             return res.status(404).json({
        //                 status: "failed",
        //                 message: "Resource Not Found!!!"  
        //             });
        //         }
        //     }
            
        // } catch (error) {
        //     console.log("error",error);
        //     res.status(500).json({
        //         message:"internal servrer error"|| error
        //     })
            
            
        // }
        try {
            if (req.params.id) {
                const dataId = req.params.id;
                const body = req.body;
                const result = await TestResult.findByIdAndUpdate(dataId, body, { new: true });
                
                if (result) {
                    console.log("Data updated successfully", result);
                    return res.status(200).json({
                        status: "success",
                        result
                    });
                } else {
                    return res.status(404).json({
                        status: "failed",
                        message: "Resource Not Found!!!"
                    });
                }
            }
        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                status: "failed",
                message: "Internal Server Error" || error
            });
        }
    },
    updatePatient: async(req,res)=>{

        try {
            if (req.params.id) {
                const dataId = req.params.id;
                const body = req.body;
                const result = await Patientmodel.findByIdAndUpdate(dataId, body, { new: true });
                
                if (result) {
                    console.log("Data updated successfully", result);
                    return res.status(200).json({
                        status: "success",
                        result
                    });
                } else {
                    return res.status(404).json({
                        status: "failed",
                        message: "Resource Not Found!!!"
                    });
                }
            }
        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                status: "failed",
                message: "Internal Server Error" || error
            });
        }
        
    },
    updateStaff: async(req,res)=>{
        try {
            if (req.params.id) {
                const dataId = req.params.id;
                const body = req.body;
                const result=await Staffmodel.findByIdAndUpdate(dataId,body,{new:true})
        
                if (result) {
                    console.log("Data updated successfully", result);
                    return res.status(200).json({
                        status: "success",
                        result
                    });
                } else {
                    return res.status(404).json({
                        status: "failed",
                        message: "Resource Not Found!!!"  
                    });
                }
            }
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error.message
            });
        }

        
    },
    deleteTestResult:async(req,res)=>{

        try {
            if(req.params.id){
                const dataId=req.params.id;
                const result=await TestResult.findByIdAndDelete(dataId)
                if(!result){
                    res.status(404).json({
                        error:"failed"||"Resource Not Found!!!"
                    })
                }
                else{
                    console.log("data deleted successfully");
                    res.status(201).json({
                        status:"success"
                    })
                }

            }
            
        } catch (error) {
            console.log("error",error);
            res.status(500).json({
                message:"internal servrer error"|| error
            })
            
            
        }
    },
    deletePatient:async(req,res)=>{

        try {
            if(req.params.id){
                const dataId=req.params.id;
                const result=await Patientmodel.findByIdAndDelete(dataId)
                if(!result){
                    res.status(404).json({
                        error:"failed"||"Resource Not Found!!!"
                    })
                }else{
                    console.log("data deleted successfully");
                    res.status(201).json({
                        status:"success"
                    })
                }
                
            }
            
        } catch (error) {
            console.log("error",error);
            res.status(500).json({
                message:"internal servrer error"|| error
            })
            
            
        }
    },
    deleteStaff:async(req,res)=>{

        try {
            if(req.params.id){
                const dataId=req.params.id;
                const result=await Staffmodel.findByIdAndDelete(dataId)
                if(!result){
                    res.status(404).json({
                        error:"failed"||"Resource Not Found!!!"
                    })
                }
                else{
                    console.log("data deleted successfully");
                    res.status(201).json({
                        
                        status:"success"
                    })
                }

            }
            
        } catch (error) {
            console.log("error",error);
            res.status(500).json({
                message:"internal servrer error"|| error
            })
            
            
        }
    },
    deleteAppointmentRecords:async(req,res)=>{

        try {
            if(req.params.id){
                const dataId=req.params.id;
                const result=await Appointment.findByIdAndDelete(dataId)
                if(!result){
                    res.status(404).json({
                        error:"failed"||"Resource Not Found!!!"
                    })
                }
                else{
                    console.log("data deleted successfully");
                    res.status(201).json({
                        status:"success"
                    })
                }

            }
            
        } catch (error) {
            console.log("error",error);
            res.status(500).json({
                message:"internal servrer error"|| error
            })
            
            
        }
    }

    
       
    }
   

  


const DocSpecialty = require('../model/docSpecialty');
const TestResult = require('../model/testResult');
const Patientmodel = require('../model/patient');
const PurchaseCard = require('../model/purchaseCard');
const Email = require("../model/email");
const Staffmodel=require("../model/staffs")


// const Patientmodel = require('../model/patient');

module.exports={
    homePage: (req,res)=>{
       res.render("index")
    },
    registerPage: (req,res)=>{
       res.render("register")
    },
    loginPage: (req,res)=>{
       res.render("login")
    },
    // labTech PageTransitionEvent..............
    labTecProfile: async(req,res)=>{
        try {
            const labTecProfile = req.loginStaff;
            console.log("Lab Tec profile",labTecProfile)
            res.render("./labTechFolder/labTecProfile",{labTecProfile})
            
        } catch (error) {
            console.log("error",error);
            res.status(500).json({
                error:"internal server error"
            })
            
            
        }

     },
    labtechDashbord: async (req, res) => {

        const page = parseInt(req.query.page) || 1; // Get the current page from the query string, default to 1
        const limit = parseInt(req.query.limit) || 10; // Get the limit from the query string, default to 10
        const response1= await fetch(`http://localhost:4322/api/appointment/recod`)
        const response = await fetch(`http://localhost:4322/api/patients/purchase/card/recod`);
        const data = await response.json();
        const data1=await response1.json();
        if(data && data1){
            console.log("data and and data1 foud in fetch",data,data1);
            console.log("data1 foud in fetch",data1);
            
            
        }
        else{
            console.log("no data found in fetch")
        }
        const appointment=data1?data1.allRecord:"";

    
    

        const datas = data.allData;
    
        // Calculate pagination variables
        const totalItems = datas.length; // Assuming you're getting all data and filtering in the frontend
        const totalPages = Math.ceil(totalItems / limit);
    
        // Slice data to match the current page
        const paginatedData = datas.slice((page - 1) * limit, page * limit);
    
        // Render the EJS template with paginated data and pagination info
        res.render("./labTechFolder/labtechDasbord", {
            datas: paginatedData, // Send only the data for the current page
            currentPage: page,
            totalPages: totalPages,
            limit: limit,
            appointment
        });
    },

    cardform: async (req, res) => {
        try {
            const cardId = req.query.id;
            if (!cardId) {
                return res.status(400).send('Card ID is required');
            }
    
            // Correcting the URL by removing the unnecessary '=' after the '?'
            const response = await fetch(`http://localhost:4322/api/patients/purchase/card/recod?id=${cardId}`);
    
            if (!response.ok) {
                throw new Error('Failed to fetch card details');
            }
    
            const data = await response.json();
            if (!data || !data.cardData) {
                return res.status(404).send('Patient card not found');
            }
    
            console.log('Fetched patient card', data); 
            
            // Render the template with fetched data
            res.render("./labTechFolder/cardForm", { cardData: data.cardData });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    labTechTestResultRecord: async (req, res) => {
        try {
            

            
       
            // else{
            //     console.log("no data found in fetch")
            // }
            
            
            
            const response1= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data1=await response1.json();
            const response = await fetch(`http://localhost:4322/api/labTechs/patients/test/result/page`);
            const data = await response.json();
            const datas=data.allTestResult;
            
            if(datas){
                console.log("patients medicle records",datas);
                
            }
            
            const appointment=data1.allRecord
    
   
    
            // Render the EJS template with paginated data and pagination info
            res.render("./labTechFolder/labTechTestResultRecods", {
                datas ,
                appointment
              
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Internal server error" || error.message });
        }
    },
    patientRecordPage: async (req, res) => {
        try {
     
            const response1= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data1=await response1.json();
            const response = await fetch(`http://localhost:4322/api/patients/card/recod`);
            const data = await response.json();
            const datas = data.cardRecords;
    
         
            if(datas){
                console.log("patients medicle records",datas);
                
            }
                   
            const appointment=data1.allRecord
         
            res.render("./labTechFolder/LabTechPatientrecord", {
                cardRecords:datas,
                appointment
                
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Internal server error" || error.message });
        }
    },
    
    
    // labTech PageTransitionEvent..............end
    // doc pageXOffset................

     docProfile: async(req,res)=>{
        try {
            const docProfile = req.loginStaff;
            console.log("doctor Profile profile",docProfile)
            res.render("./doctorFolder/docProfile",{docProfile})
            
        } catch (error) {
            console.log("error",error);
            res.status(500).json({
                error:"internal server error"
            })
            
            
        }

     },
     docDashbord: async (req, res) => {
        try {
            // Assuming req.loginStaff contains the logged-in doctor's information
            const doctor = req.loginStaff;

            const response1= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data1=await response1.json();
            // Fetch the doctor's specialization
            const doctorSpecialty = await DocSpecialty.findOne({ email: doctor.email });
          
            const appointment=data1?data1.allRecord:"";
            console.log("doctor booked patients",appointment)

            // Log the doctor's specialty for debugging
            console.log("doc specialty", doctorSpecialty);
    
            // If doctorSpecialty is null, set an empty string or a default value for the specialty
            const specialty = doctorSpecialty ? doctorSpecialty.specialty : '';
    
            // Find all test results where the illness matches the doctor's specialty
            // If specialty is an empty string, this query will return no results
            const matchingTestResults = await TestResult.find({
                illness: specialty
            });
    
            // Render the dashboard template with the fetched test results
            res.render('./doctorFolder/doctorDashBord', {
                assignedPatients: matchingTestResults, // Ensure this matches your EJS variable name
                doctor: doctor,
                appointment
            });
        } catch (error) {
            console.error('Error in docDashbord:', error);
            res.status(500).send('An error occurred while fetching the dashboard.');
        }
    },

    
    

    docTreatedPatient: async(req,res)=>{
        try {
            // Assuming req.loginStaff contains the logged-in doctor's information
            const doctor = req.loginStaff;
            const response1= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data1=await response1.json();
            const appointment=data1?data1.allRecord:"";
            console.log("doctor booked patients",appointment)

            // Fetch the doctor's specialization
            const doctorSpecialty = await DocSpecialty.findOne({ email: doctor.email });
            
           const specialty=doctorSpecialty?doctorSpecialty.specialty:"";
    
            // Find all test results where the illness matches the doctor's specialty
            const matchingTestResults = await TestResult.find({
                illness: specialty
            });
    
            // Render the dashboard template with the fetched test results
            return res.render("./doctorFolder/treatedPatient", {
                assignedPatients: matchingTestResults, // Ensure this matches your EJS variable name
                doctor: doctor,
                appointment
            });
    
        } catch (error) {
            console.error('Error fetching doctor dashboard data:', error);
            res.status(500).send('An error occurred while fetching dashboard data');
        }
       
    },
    // doc pageXOffset................end
    // patient render...............
    patientDashbord: async(req,res)=>{
        const patientData=  req.loginPatient
        const cardId = patientData._id;
        console.log("card id ",cardId);
        

        // Fetch the patient's card using the correct method
        const patientCard = await PurchaseCard.findOne({ patient: cardId });
        const patientTestResult=await TestResult.findOne({patient: cardId})
        console.log('patient cards',patientCard);
        console.log('patient  test result',patientTestResult);
        
        console.log("log in patients  ",patientData);
        
       ///
      res.render("./patientFolder/patientDashBord",{patientData,patientCard,patientTestResult})
    },
    patientPurchaseCard: (req,res)=>{
        res.render("./patientFolder/viewPurchaseCard")
    },
    patientpProfile: (req,res)=>{
        const patientData=  req.loginPatient;
        console.log('patients profile',patientData);
        
        res.render("./patientFolder/patientprofile",{patientData})
    },
    // patient render...............end
    // admin pageXOffset.................
    adminDashbord:async (req,res)=>{
        try {
            const  admin= req.loginAdmin 
            console.log("login in admin ", admin)
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            
            // Fetch test results data from the external API
            const  response3=await fetch(`http://localhost:4322/api/admin/view/register/patients`)
            const  response4=await fetch(`http://localhost:4322/api/admin/view/register/staffs`)
            const response = await fetch(`http://localhost:4322/api/labTechs/patients/test/result/page`);
            const  response1=await fetch(`http://localhost:4322/api/admin/view/patient/records`)
            const data2= await response1.json()
            
            const data = await response.json();
            const data3=await response3.json()
            const data4=await response4.json()
            const data7=await response7.json();
            const regPatients=data3.regPatients
            const regStaff=data4.regStaff
            const appointment=data7?data7.allRecord:"";

            const patientRecords =data2.patientRecords
            const datas = data.allTestResult;
            if(data2 && datas &&data3&&data4){
                console.log('patients cards and patients records',datas,data2);
                console.log('eg staffs',data3);
                console.log('eg staffs',data4);
                console.log("doctor booked patients",appointment)
               
                
            }
            // Calculate pagination variables
            // const totalItems = datas.length;
            // const totalPages = Math.ceil(totalItems / limit);
            // const paginatedData = datas.slice((page - 1) * limit, page * limit);
        
            // Fetch all doctor specializations and populate their test results
            const allDocSpecialties = await DocSpecialty.find().populate('testResults');
        
            if (!allDocSpecialties) {
              return res.status(404).send('No doctor specializations found');
            }
        
            // Extract the populated test results for each doctor
            const assignedPatients = allDocSpecialties.flatMap(docSpecialty => docSpecialty.testResults);
        
            // Render the dashboard template with the fetched data
            res.render('adminfolder/adminDashBord', {
              assignedPatients: assignedPatients,
            //   datas: paginatedData,
              patientRecords,
              regPatients,
              regStaff,
              admin,
              appointment
            
            });
        
          } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).send('An error occurred while fetching dashboard data');
          }
     },
     regStaffs: async(req,res)=>{
        try {




             const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data7=await response7.json();
        const  response=await fetch(`http://localhost:4322/api/admin/view/register/staffs`)
        const data=await response.json()
        if(data){
            console.log('eg staffs',data);
           
            
        }
        const appointment=data7?data7.allRecord:"";

        const regStaff=data.regStaff
        
        return res.render("adminfolder/regStaff", {appointment, regStaff});
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('An error occurred while fetching dashboard data');
      }
        
     },
     regPatients: async(req,res)=>{
        try {
            const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data7=await response7.json();
            const  response=await fetch(`http://localhost:4322/api/admin/view/register/patients`)
            const data=await response.json()
            if(data){
                console.log('eg staffs',data);
               
                
            }
            const regPatients=data.regPatients
            const appointment=data7?data7.allRecord:"";
            return res.render("adminfolder/regpatient", {appointment, regPatients});
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).send('An error occurred while fetching dashboard data');
          }
      
    

     },
     patientTest: async(req,res)=>{
        try {



             const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data7=await response7.json();
            const  response1=await fetch(`http://localhost:4322/api/admin/view/patient/records`)
            const data2= await response1.json()
            
            if( data2){
                console.log(' patients records'.data2);
               
                
            }
            const appointment=data7?data7.allRecord:"";

            const patientRecords =data2.patientRecords
            
            res.render("adminfolder/patientRecord",{ appointment,patientRecords})
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).send('An error occurred while fetching dashboard data');
          }
     },
     adminViewCards: async(req,res)=>{
        try {
            const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data7=await response7.json();
            const  response=await fetch(`http://localhost:4322/api/admin/view/purchase/cards`)
            const  response1=await fetch(`http://localhost:4322/api/admin/view/patient/records`)
            const data2= await response1.json()
            const data=await response.json()
            if(data && data2){
                console.log('patients cards and patients records',data,data2);
               
                
            }
            const patientCard=data.patientCard
            const patientRecords =data2.patientRecords
            const appointment=data7?data7.allRecord:"";

            res.render("adminfolder/adminViewCards",{appointment, patientCard, patientRecords})
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).send('An error occurred while fetching dashboard data');
          }
      
        

     },
     adminProfile: async(req,res)=>{
        try {
            const adminProfile=req.loginAdmin
            console.log("admin profile",adminProfile)
            res.render("adminfolder/adminProfile",{admin:adminProfile})
            
        } catch (error) {
            console.log("error",error);
            res.status(500).json({
                error:"internal server error"
            })
            
            
        }
     },
     regPatient: async (req,res)=>{
        const patientId=req.query.id


         const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data7=await response7.json();
        const response=await fetch(`http://localhost:4322/api/admin/view/register/patients?id=${patientId}`)
        const data=await response.json()
        const patient=data
        if(patient){
            console.log("single patient data in fetch",patient);
            
        }
        const appointment=data7?data7.allRecord:"";

        res.render("adminfolder/updatePatient",{ appointment, patient:patient.patient})

     },
     regStaff: async (req,res)=>{
        const staffId=req.query.id

         const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data7=await response7.json();
        const  response=await fetch(`http://localhost:4322/api/admin/view/register/staffs?id=${staffId}`)
        const data=await response.json()
        const staff=data
        if(staff){
            console.log("single patient data in fetch",staff);
            
        }
        const appointment=data7?data7.allRecord:"";

        res.render("adminfolder/updateStaff",{appointment, staff:staff.singleStaff})

     },
     testResultForm: async (req,res)=>{
        const dataId=req.query.id
         const response7= await fetch(`http://localhost:4322/api/appointment/recod`)
            const data7=await response7.json();
        const  response=await fetch(`http://localhost:4322/api/admin/view/patient/records?id=${dataId}`)
        const data=await response.json()
        const testResult=data
        if(testResult){
            console.log("single patient data in fetch",testResult);
            
        }
        const appointment=data7?data7.allRecord:"";

        res.render("adminfolder/updateTestResult",{appointment,testResult:testResult.result})

     }
     
    // admin pageXOffset.................
}
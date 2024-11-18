const Patientmodel=require("../model/patient")
const Adminmodel=require("../model/admin")
const Staffmodel=require("../model/staffs")
const TestResult = require('../model/testResult');
const Appointment=require("../model/appointment")

const DocSpecialty=require("../model/docSpecialty")
const {genAdmintoken,genPatientToken,genStafftoken}=require("../helperMildleWare/jwtTokenmidleWre")
module.exports={
    registerActors: async(req,res)=>{
        try {
           const { fName,
            email,
            password,
            lName,
            phone_no,
            address,
            date_of_birth,
            state,
            LGA,
            gender,
         
            role,}=req.body;
            const profileImage=req.file?req.file.buffer.toString("base64"):null;
            const  imageType=req.file?req.file.mimetype:null; 
            if(role==="admin"){
                const fnameRegex = /^[A-Za-z\s.'-]+$/;
                const lnameRegex = /^[A-Za-z\s.'-]+$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[<,.])[^\s]{8,}$/;
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&<>^.,:;[\]{}()|~`#\-_/\\+=]{4,}$/;
        
                const phone_numberRegex = /^\+?\d{1,4}[-\s]?\d{1,15}$/;
                const addressRegex = /^[A-Za-z0-9\s.,#'-]+$/;
                const stateRegex = /^[A-Za-z\s.'-]+$/;
                const lgaRegex = /^[A-Za-z\s\-'’]+$/;
                  // Validate input fields
        if (!fnameRegex.test(fName)) throw new Error("Invalid first name format");
        if (!lnameRegex.test(lName)) throw new Error("Invalid last name format");
        if (!emailRegex.test(email)) throw new Error("Invalid email format");
        if (!passwordRegex.test(password)) throw new Error("Invalid password format");
        if (!phone_numberRegex.test(phone_no)) throw new Error("Invalid phone number format");
        if (!addressRegex.test(address)) throw new Error("Invalid address format");
        if (!stateRegex.test(state)) throw new Error("Invalid state format");
        if (!lgaRegex.test(LGA)) throw new Error("Invalid LGA format");
        if (isNaN(Date.parse(date_of_birth))) throw new Error("Invalid date of birth format");
           const newAdmin=await Adminmodel.create({
            fName,
            email,
            password,
            lName,
            phone_no,
            address,
            date_of_birth,
            state,
            LGA,
            gender,
         
            role,
            profileImage,
            imageType

           })
           if(newAdmin){
            console.log("admin created successfuly", newAdmin);
           
            res.redirect("/login/page")
           }
           console.log(" registration failed");

            }
            else if (role==="patient"){
                const fnameRegex = /^[A-Za-z\s.'-]+$/;
                const lnameRegex = /^[A-Za-z\s.'-]+$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[<,.])[^\s]{8,}$/;
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&<>^.,:;[\]{}()|~`#\-_/\\+=]{4,}$/;
        
                const phone_numberRegex = /^\+?\d{1,4}[-\s]?\d{1,15}$/;
                const addressRegex = /^[A-Za-z0-9\s.,#'-]+$/;
                const stateRegex = /^[A-Za-z\s.'-]+$/;
                const lgaRegex = /^[A-Za-z\s\-'’]+$/;
                  // Validate input fields
        if (!fnameRegex.test(fName)) throw new Error("Invalid first name format");
        if (!lnameRegex.test(lName)) throw new Error("Invalid last name format");
        if (!emailRegex.test(email)) throw new Error("Invalid email format");
        if (!passwordRegex.test(password)) throw new Error("Invalid password format");
        if (!phone_numberRegex.test(phone_no)) throw new Error("Invalid phone number format");
        if (!addressRegex.test(address)) throw new Error("Invalid address format");
        if (!stateRegex.test(state)) throw new Error("Invalid state format");
        if (!lgaRegex.test(LGA)) throw new Error("Invalid LGA format");
        if (isNaN(Date.parse(date_of_birth))) throw new Error("Invalid date of birth format");
           const newPatience=await Patientmodel.create({
            fName,
            email,
            password,
            lName,
            phone_no,
            address,
            date_of_birth,
            state,
            LGA,
            gender,
         
            role,
            profileImage,
            imageType

           })
           if(newPatience){
            console.log("patient created successfuly", newPatience);
            
            res.redirect("/login/page")
           }
           console.log(" registration failed");


            }
            else  {
              const lnameRegex = /^[A-Za-z\s.'-]+$/;
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[<,.])[^\s]{8,}$/;
              const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&<>^.,:;[\]{}()|~`#\-_/\\+=]{4,}$/;
              const fnameRegex = /^[A-Za-z\s.'-]+$/;
        
                const phone_numberRegex = /^\+?\d{1,4}[-\s]?\d{1,15}$/;
                const addressRegex = /^[A-Za-z0-9\s.,#'-]+$/;
                const stateRegex = /^[A-Za-z\s.'-]+$/;
                const lgaRegex = /^[A-Za-z\s\-'’]+$/;
                  // Validate input fields
        if (!fnameRegex.test(fName)) throw new Error("Invalid first name format");
        if (!lnameRegex.test(lName)) throw new Error("Invalid last name format");
        if (!emailRegex.test(email)) throw new Error("Invalid email format");
        if (!passwordRegex.test(password)) throw new Error("Invalid password format");
        if (!phone_numberRegex.test(phone_no)) throw new Error("Invalid phone number format");
        if (!addressRegex.test(address)) throw new Error("Invalid address format");
        if (!stateRegex.test(state)) throw new Error("Invalid state format");
        if (!lgaRegex.test(LGA)) throw new Error("Invalid LGA format");
        if (isNaN(Date.parse(date_of_birth))) throw new Error("Invalid date of birth format");
           const newStaff=await Staffmodel.create({
            fName,
            email,
            password,
            lName,
            phone_no,
            address,
            date_of_birth,
            state,
            LGA,
            gender,
         
            role,
            profileImage,
            imageType

           })
           if(newStaff){
            console.log("new staff created successfuly", newStaff);
                
            res.redirect("/login/page")
           }
           console.log(" registration failed");

            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:"internal server error"|| error.message
            })
            
        }

            
        },
        docSpecialty: async(req,res)=>{
          try {
            const { fullName, email, specialty } = req.body;
    
            // Fetch test results that match the doctor's specialty
            const testResults = await TestResult.find({ illness: specialty }).select('_id');
    
            // Create a new doctor specialization entry
            const newDoctorSpecialty = new DocSpecialty({
                fullName,
                email,
                specialty,
                testResults: testResults.map(result => result._id) // Map to only include IDs
            });
    
            // Save the new entry to the database
            await newDoctorSpecialty.save();
    
            // Redirect or send a response after successful registration
            res.status(201).send('Doctor specialization registered successfully');
            // or redirect to a success page
            // res.redirect('/some/success/page');
        } catch (error) {
            console.error('Error registering doctor specialization:', error);
            res.status(500).send('An error occurred while registering the specialization');
        }

        },
        login :async (req, res) => {
            try {
              const { email, password, role } = req.body;
              if (role === "admin") {
                const loginAdmin = await Adminmodel.login(email, password);
                if (!loginAdmin) {
                  return res.status(400).send({ error: 'Invalid email or password' });
                }
                const token = genAdmintoken(loginAdmin._id);
                req.session.token = token;
                req.session.adminId = loginAdmin._id;
                return res.redirect('/admin/dashBord');
              } else if (role === "patient") {
                const loginPatient = await Patientmodel.login(email, password);
                if (!loginPatient) {
                  return res.status(400).send({ error: 'Invalid email or password' });
                }
                const token = genPatientToken(loginPatient._id);
                req.session.token = token;
                req.session.loginPatientId = loginPatient._id;
                return res.redirect('/patients/dashBord');
              } else {
                const loginStaff = await Staffmodel.login(email, password);
                if (!loginStaff) {
                  return res.status(400).send({ error: 'Invalid email or password' });
                }
                const token = genStafftoken(loginStaff._id);
                req.session.token = token;
                req.session.staffId = loginStaff._id;
                if (role === "doctor") return res.redirect("/doctors/dashbord");
                if (role === "labTechnician") return res.redirect("/labTechs/dashbord");
              } 
            } catch (error) {
              res.status(500).json({ message: "Internal server error" || error.message });
            }
          },
          appointment:async(req,res)=>{
            try {
              const {name,email,phone_no,address}=req.body
              const fnameRegex = /^[A-Za-z\s.'-]+$/;
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
                const phone_numberRegex = /^\+?\d{1,4}[-\s]?\d{1,15}$/;
                const addressRegex = /^[A-Za-z0-9\s.,#'-]+$/;
                          // Validate input fields
        if (!fnameRegex.test(name)) throw new Error("Invalid first name format");
        if (!emailRegex.test(email)) throw new Error("Invalid email format");
        if (!phone_numberRegex.test(phone_no)) throw new Error("Invalid phone number format");
        if (!addressRegex.test(address)) throw new Error("Invalid address format");
        const newData=await Appointment.create({
          name,email,phone_no,address

        })
        if(newData){
          console.log("new appointment ",newData)
          res.status(201).json({
            status:"success",
            newData
          })
        }else{
          return res.status(404).json({
            message:"error saving data"
          })
        }
              
            } catch (error) {
              res.status(500).json({
                message:"internal server error"||error
              })
              
            }
          }
          
        }


const getRoute=require("express").Router()
const pagerender=require("../render/pages")
const staffAuth=require("../controller/staffCont");
const adminAuth=require("../controller/adminCont")
const {verifyPatientToken,verifyAdminToken,verifyStaffToken} =require("../helperMildleWare/jwtTokenmidleWre")
getRoute.get("/",pagerender.homePage)
getRoute.get("/registration/page",pagerender.registerPage)
getRoute.get("/login/page",pagerender.loginPage)
// lab tech route functionality...............................................................
getRoute.get("/labTechs/dashbord",verifyStaffToken,pagerender.labtechDashbord)
getRoute.get("/labTechs/profile/page",verifyStaffToken,pagerender.labTecProfile)

getRoute.get("/labTechs/fill/card",pagerender.cardform)
getRoute.get("/labTechs/patients/test/result/records/page",pagerender.labTechTestResultRecord)
getRoute.get("/api/labTechs/patients/test/result/page",staffAuth.patientTestResult)
getRoute.get("/api/patients/purchase/card/recod",staffAuth.findPurchaseCard)
getRoute.get("/api/patients/card/recod",staffAuth.patientRecords)
getRoute.get("/api/appointment/recod",staffAuth.appointmentRecords)

getRoute.get("/patients/card/recod",pagerender.patientRecordPage)

// lab tech route functionality...............................................................
// doctor route functionality.......................................................................
getRoute.get("/doctors/dashbord",verifyStaffToken,pagerender.docDashbord)
getRoute.get("/doctors/dashbord",verifyStaffToken,pagerender.docDashbord)
getRoute.get("/doctor/profile/page",verifyStaffToken,pagerender.docProfile)
getRoute.get("/doctors/treated/patient",verifyStaffToken,pagerender.docTreatedPatient)
getRoute.get("/api/doctors/asigned/patient",staffAuth.docPatient)
getRoute.get("/api/doctors/specialty",staffAuth.findSpecialty)
// doctor route functionality.......................................................................

getRoute.get("/patients/dashbord",verifyPatientToken,pagerender.patientDashbord)
getRoute.get("/patients/profile/page",verifyPatientToken,pagerender.patientpProfile)
getRoute.get("/patients/purchased/card/page",pagerender. patientPurchaseCard)
// admin  route functionality--------------------------------------------------------------------------
getRoute.get("/admin/dashbord",verifyAdminToken,pagerender.adminDashbord)
getRoute.get("/admin/profile/page",verifyAdminToken,pagerender.adminProfile)
getRoute.get("/admin/reg/patient/page",pagerender.regPatient) 
getRoute.get("/admin/reg/staff/page",pagerender.regStaff)
getRoute.get("/admin/test/result/page",pagerender.testResultForm)
getRoute.get("/admin/profile/page",verifyAdminToken,pagerender.adminProfile)
getRoute.get("/admin/view/register/staffs",verifyAdminToken,pagerender.regStaffs)
getRoute.get("/admin/view/patients/test/results",pagerender.patientTest)
getRoute.put("/api/admin/update/test/results/:id",adminAuth.updateTestResult)  
getRoute.put("/api/admin/update/patient/:id",adminAuth.updatePatient)  
getRoute.put("/api/admin/update/staff/:id",adminAuth.updateStaff)  
getRoute.delete("/api/admin/delete/test/results/:id",adminAuth.deleteTestResult)  
getRoute.delete("/api/admin/delete/staff/:id",adminAuth.deleteStaff)  
getRoute.delete("/api/admin/delete/patient/:id",adminAuth.deletePatient)  
getRoute.delete("/api/appointment/recod/:id",adminAuth.deleteAppointmentRecords)  
getRoute.get("/api/admin/view/register/staffs",adminAuth.viewRegStaffs)
getRoute.get("/api/admin/view/register/patients",adminAuth.viewRegPatients)
getRoute.get("/api/admin/view/purchase/cards",adminAuth.viewCards)
getRoute.get("/api/admin/view/patient/records",adminAuth.patientRecords)
getRoute.get("/admin/view/register/patients",verifyAdminToken,pagerender.regPatients)
getRoute.get("/admin/view/purchase/card",verifyAdminToken,pagerender.adminViewCards)

// admin  route functionality--------------------------------------------------------------------------

module.exports=getRoute
 
const postRoute = require('express').Router();
const actorsAuthcont = require('../controller/actorsAuthCont');
const patientAuthcont = require('../controller/patientCont');
const staffAuth=require("../controller/staffCont")
const upload = require('../helperMildleWare/imageUpload');

postRoute.post('/register', upload.single('profileImage'), actorsAuthcont.registerActors);
postRoute.post('/login', actorsAuthcont.login);
postRoute.post('/doc/reg/specialty', actorsAuthcont.docSpecialty);
postRoute.post('/reg/appointment', actorsAuthcont.appointment);
postRoute.post('/labTech/submit/test/result', staffAuth.submitTestResult);
postRoute.post('/initialize-payment', patientAuthcont.payInit)
postRoute.post('/paystack-webhook',  patientAuthcont.webHook)


module.exports = postRoute;

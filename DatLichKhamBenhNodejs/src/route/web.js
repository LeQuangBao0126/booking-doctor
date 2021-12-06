

import express from 'express';
let router = express.Router();
//
import homeController from './../controllers/homeController'
import userController from './../controllers/userControllerr'
import doctorController from './../controllers/doctorController'
import patientController from './../controllers/patientController'



let initWebRoutes = (app)=>{
    router.get("/home", homeController.getHomePage)

    router.post("/api/login", userController.handleLogin)
    router.get("/api/get-all-users", userController.handleGetAllUsers)
    router.get("/api/allcode",userController.getAllCode )
    router.post("/api/create-new-user",userController.handleCreateNewUser )

    //get doctors
    router.get("/api/top-doctor-home",doctorController.getTopDoctorHome )
    router.post("/api/save-info-doctors",doctorController.postInfoDoctor )
    router.get("/api/get-detail-doctor-by-id",doctorController.getDetailDoctorById )
    router.post("/api/bulk-create-schedule",doctorController.bulkCreateSchedule)
    router.get("/api/get-schedule-doctor-date",doctorController.getScheduleDoctorDate)
    router.get("/api/get-profile-doctor-by-id",doctorController.getProfileDoctorById)


    router.post('/api/patient-book-appointment' ,patientController.postBookingAppointment )


    return app.use("/",router)
}
module.exports = initWebRoutes ;
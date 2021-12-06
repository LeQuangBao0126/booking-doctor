
import patientService from '../services/patientService'
import { v4 as uuid_v4 } from "uuid";
const postBookingAppointment = async (req,res)=>{
  try {
      let  obj =  req.body;
      obj.token = uuid_v4()
      await  patientService.postBookingAppointment(req.body)
      return res.status(200).json({
        "data":  uuid_v4()
      })
  }catch(e){
    return res.status(400).json({
         "err" : true
    })
  }
}

module.exports ={
  postBookingAppointment : postBookingAppointment
}
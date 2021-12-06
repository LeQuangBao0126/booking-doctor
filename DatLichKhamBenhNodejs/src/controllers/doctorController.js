import doctorService from './../services/doctorsService'

const getTopDoctorHome = async (req ,res) =>{
  try{
    let limit = req.query.limit
    if(!limit){
      limit = 2
    }
      let doctors = await doctorService.getTopDoctorHome(+limit);
      return res.status(200).json({"data": doctors } )
  }catch(e){
    return res.status(200).json({
      "errorCode" : -1,
      "errorMessage" : 'Error from server'
    })
  }
}
const postInfoDoctor = async (req ,res) =>{
  try{
      let response = await doctorService.saveDetailInfoDoctor(req.body);
      return res.status(200).json({"data": response } )
  }catch(e){
    return res.status(200).json({
      "errorCode" : -1,
      "errorMessage" : 'Error from server'
    })
  }
}
const getDetailDoctorById = async (req ,res) =>{
  try{
    let response = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json({"data": response } )
  }catch(e){
    return res.status(200).json({
      "errorCode" : -1,
      "errorMessage" : 'Error from server'
    })
  }
}
const bulkCreateSchedule = async (req ,res) =>{
  try{
    let response = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json({"data": response } )
  }catch(e){
    return res.status(200).json({
      "errorCode" : -1,
      "errorMessage" : 'Error from server'
    })
  }
}
const getScheduleDoctorDate = async (req ,res) =>{
  try{
    let response = await doctorService.getScheduleDoctorDate(req.query.doctorId , req.query.date);
    console.log("abc response " , response)
   return res.status(200).json({"data": response })

  }catch(e){
    return res.status(200).json({
      "errorCode" : -1,
      "errorMessage" : 'Error from server'
    })
  }
}
const getProfileDoctorById = async (req ,res) =>{
  try{
    let response = await doctorService.getProfileDoctorById(req.query.doctorId );
    return res.status(200).json({"data": response })
  }catch(e){
    return res.status(200).json({
      "errorCode" : -1,
      "errorMessage" : 'Error from server'
    })
  }
}

module.exports =  {
  getTopDoctorHome,
  postInfoDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleDoctorDate,
  getProfileDoctorById
}
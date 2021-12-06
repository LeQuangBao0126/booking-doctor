import db from '../models/index'
const postBookingAppointment = ( data ) =>{
    return new Promise( async ( resolve , reject) => {
      try {
       // console.log(data)
         // let data = await db.Booking.findOne(doctoId , patientId)
          let result = await db.Booking.create({
              statusId :  'S1',
              doctorId :    data.doctorId,
              patientId :   data.patientId,
              date      :   data.date,
              timeType  :   data.timeType,
              token:   data.token
          })
        // if(result){
          resolve(true)
        //}
        resolve(false)
      }catch (e){
        reject(e)
      }
    })
}

module.exports =  {
  postBookingAppointment
}
//96
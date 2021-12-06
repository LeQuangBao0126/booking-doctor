import db from '../models/index'

const getTopDoctorHome = (limit ) =>{
  return new Promise( async ( resolve , reject) => {
    try {
      let users = await db.User.findAll( {where : {
            roleId: 'R2'
        } ,limit: limit })
      if (users){
        resolve(users)
      }else{
        resolve(null)
      }
    }catch (e){
      reject(e)
    }
  })
}
const saveDetailInfoDoctor = (data ) =>{
  return new Promise( async ( resolve , reject) => {
    try {
      // console.log(data)
      let doctorMarkdown = await db.markdown.findOne({
        where : {doctorId : data.doctorId }
      })
      if(!doctorMarkdown){
        let obj = {
          doctorId : data.doctorId,
          contentHTML : data.contentHTML,
          contentMarkDown : data.contentMarkDown,
          description : data.description
         }
        await db.markdown.create(obj)
      }else{
        await db.markdown.update({
          contentHTML : data.contentHTML,
          contentMarkDown : data.contentMarkDown,
          description : data.description
        },{where : {doctorId : data.doctorId}})
      }

      let doctorInfo = await db.DoctorInfo.findOne({
          where : {doctorId : data.doctorId }
      })
      if(!doctorInfo){
        let obj = {
          doctorId : data.doctorId,
          priceId : data.selectedPrice,
          paymentId : data.selectedPayment,
          provinceId : data.selectedProvince,
          nameClinic :data.nameClinic,
          addressClinic :data.addressClinic,
          note :data.note
        }
         await db.DoctorInfo.create(obj)
      }else{
         await db.DoctorInfo.update({
           priceId: data.selectedPrice,
           provinceId: data.selectedProvince,
           paymentId: data.selectedPayment,
           addressClinic:data.addressClinic,
           nameClinic: data.nameClinic,
           note: data.note
         },{where : {doctorId : data.doctorId}})
      }

        resolve(true)
    }catch (e){
      reject(e)
    }
  })
}
const getDetailDoctorById = (doctorId ) =>{
  return new Promise( async ( resolve , reject) => {
    try {
       let resultMarkdown = await db.User.findOne({
         where : {id : doctorId },
         attributes: { exclude: ['password'] },
         include:[
             {model: db.markdown }
         ],
         raw : true,
         nest:true
         }
       )
      let resultInfo = await db.DoctorInfo.findOne({
          where : {doctorId : doctorId }
      })
      console.log(resultInfo)
      if(resultInfo.priceId ){
        let item = await db.Allcode.findOne({where : {keymap: resultInfo.priceId }});
        resultInfo.priceData = item
      }
      if(resultInfo.provinceId ){
        let item = await db.Allcode.findOne({where : {keymap: resultInfo.provinceId }});
        resultInfo.provinceData = item
      }
      if(resultInfo.paymentId ){
        let item = await db.Allcode.findOne({where : {keymap: resultInfo.paymentId }});
        resultInfo.paymentData = item
      }
      let result = {
         ...resultMarkdown,
         ...resultInfo
      }
      resolve(result)
    }catch (e){
      console.log(e)
      reject(e)
    }
  })
}
const bulkCreateSchedule = (data ) =>{
  return new Promise( async ( resolve , reject) => {
    try {
    //  console.log(data)
      let existing = await db.Schedule.findAll( {
        where : {
          doctorId:  data.doctorId , date : data.date
        } ,
        attributes :[
            "doctorId","date","timeType"
        ]
      })
      if(existing && existing.length >0){
        existing.forEach( async (item) =>{
         await db.Schedule.destroy({
            where : {
              doctorId:  item.doctorId , date : item.date
            }
          })
        })
      }
      let result = await db.Schedule.bulkCreate(data.schedules)
       resolve(true)
    }catch (e){
      console.log(e)
      reject(e)
    }
  })
}
const getScheduleDoctorDate =   (doctorId ,date ) =>{
  return new Promise( async ( resolve , reject) => {
    try {
      let arr = await db.Schedule.findAll( {
        where : {
          doctorId:  doctorId , date : date
        } ,
        attributes :[
            "doctorId","date","timeType"
        ]
      })

      if(arr && arr.length > 0 ){
          let actions = arr.map( async (item ) =>{
                 let objAllcode = await db.Allcode.findOne({   where : {  keymap : item.timeType } });
                 let obj ={
                   valueVi : objAllcode.valueVi,
                   valueEn : objAllcode.valueEn,
                   keymap : objAllcode.keymap,
                   doctorId : item.doctorId,
                   date : item.date,
                   timeType : item.timeType
                 }
                 return obj
           })
         let results = await Promise.all(actions);
         return  resolve(results)
      }
      return  resolve(null)
    }catch (e){
      console.log(e)
      reject(e)
    }
  })
}
const getProfileDoctorById = (doctorId ) =>{
  return new Promise( async ( resolve , reject) => {
    try {
      let resultMarkdown = await db.User.findOne({
            where : {id : doctorId },
            attributes: { exclude: ['password'] },
            include:[
              {model: db.markdown }
            ],
            raw : true,
            nest:true
          }
      )
      // let resultInfo = await db.DoctorInfo.findOne({
      //   where : {doctorId : doctorId }
      // })

      resolve(resultMarkdown)
    }catch (e){
      console.log(e)
      reject(e)
    }
  })
}
module.exports =  {
  getTopDoctorHome,
  saveDetailInfoDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleDoctorDate,
  getProfileDoctorById
}
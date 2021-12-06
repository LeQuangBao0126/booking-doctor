import db from '../models/index'

let handleUserLogin =  (email ,pass) => {
    return new Promise(async (resolve ,reject)=>{
        try {
          let user= await db.User.findOne({where : {email : email,password:pass} ,
            attributes: { exclude: ['password'] }})
          if (user){
             resolve(user)
          }else{
             resolve(null)
          }
        }catch (e){
            reject(e)
        }
    })
}
let getAllUsers =  (userId) => {
  return new Promise(async (resolve ,reject)=>{
    try {
      let users = null
      if(userId == 'all'){
        users = await db.User.findAll()
      }else{
        users = await db.User.findOne({
          where : {id : userId} ,
          attributes: { exclude: ['password'] },
          include :[
            {model :db.Allcode ,as: "positionData"},
            {model :db.Allcode ,as: "genderData"},
          ],
          nest : true,
          raw:true
        })
      }
       resolve(users)
    }catch (e){
      reject(e)
    }
  })
}
let getAllCodeService =  (typeInput) => {
  return new Promise(async (resolve ,reject)=>{
    try {
      let res ={}
        if(!typeInput){
            resolve({
              errCode :1,
              errMessage :"missing required"
            })
        }else{
           // let abc = await db.DoctorInfo.findAll()

            let allCode = await db.Allcode.findAll({where : {type: typeInput}});
            res.data = allCode
            resolve(res)
        }
    }catch (e){
      reject(e)
    }
  })
}
let handleCreateNewUser =  (user) => {
  return new Promise(async (resolve ,reject)=>{
    try {
      let obj ={
          email : user.email,
          password: user.password,
          firstName : user.firstName,
          lastName : user.lastName,
          phoneNumber : user.phoneNumber,
          address: user.address,
          gender: user.gender,
          positionId : user.position,
          roleId : user.role,
          avatar: user.avatar
      }
      let result = await db.User.create(obj);
      resolve(true)
    }catch (e){
      reject(e)
    }
  })
}

module.exports = {
  handleUserLogin : handleUserLogin,
  getAllUsers : getAllUsers,
  getAllCodeService:getAllCodeService,
  handleCreateNewUser:handleCreateNewUser
}
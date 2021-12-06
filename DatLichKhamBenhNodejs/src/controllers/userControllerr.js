
import db from './../models/index'
import userService from './../services/userService'

let handleLogin = async (req ,res) =>{
    let email = req.body.email
    let pass = req.body.password //string

    try{
        let result = await userService.handleUserLogin(email,pass)
        if (result){
            return res.status(200).json(result)
        }else{
            return res.status(400).json({ "msg" : "Invalid email or password"})
        }
    }catch(e){
        return res.status(400).json({ "err" : e.message})
    }
}
let handleGetAllUsers = async (req ,res) =>{
    let id = req.query.id ;
    let  users = await userService.getAllUsers(id)
    return res.status(200).json({
        "errorCode" : 0,
        "errorMessage" :"Ok",
         data : users
    })
}
let getAllCode = async (req ,res) =>{
    try{
        let data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data )
    }catch(e){
        console.log("Get all code error" , e.message)
        return res.status(200).json({
            "errorCode" : -1,
            "errorMessage" : 'Error from server'
        })
    }
}
let handleCreateNewUser = async (req ,res) =>{
    try{
        let isSuccess = await userService.handleCreateNewUser(req.body)
        return res.status(200).json({"ok":isSuccess} )
    }catch(e){
        console.log("Get all code error" , e.message)
        return res.status(200).json({
            "errorCode" : -1,
            "errorMessage" : 'Error from server'
        })
    }
}
module.exports =  {
    handleLogin:handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    getAllCode:getAllCode,
    handleCreateNewUser : handleCreateNewUser
}



import db from './../models/index'


let getHomePage = async (req ,res) =>{
    try {
        return res.render("homepage.ejs")
    }catch(e){

    }
    return res.render("homepage.ejs")
}
module.exports =  {
    getHomePage:getHomePage
}
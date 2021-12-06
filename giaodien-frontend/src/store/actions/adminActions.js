import actionTypes from './actionTypes';
import {getAllCodeService,addNewUser ,fetchAllUsers} from './../../services/userService'

export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let result = await fetchAllUsers()
            if (result) {
                dispatch( fetchAllUserSuccess(result.data ) ) 
            }  
        } catch (e) {
            console.log(e)
        }
    }
}

export const fetchGenderStart =    () =>  {
    return async (dispatch , getState )=>{
        try{
            let result = await getAllCodeService('GENDER')
            if(result ){
                  dispatch(fetchGenderSuccess(result.data ) )  
            }else{
                  dispatch(fetchGenderFail())
            }
        }catch(e){
                 dispatch(fetchGenderFail())
        }
    }
}
export const fetchPositionStart =() =>  {
    return async (dispatch , getState )=>{
        try{
            let result = await getAllCodeService('POSITION')
            if(result ){
                  dispatch(fetchPositionSuccess(result.data ) )  
            }else{
                  dispatch(fetchPositionFail())
            }
        }catch(e){
                 dispatch(fetchPositionFail())
        }
    }
}
export const fetchRoleStart =() =>  {
    return async (dispatch , getState )=>{
        try{
            let result = await getAllCodeService('ROLE')
            if(result ){
                  dispatch(fetchRoleSuccess(result.data ) )  
            }else{
                  dispatch(fetchRoleFail())
            }
        }catch(e){
                 dispatch(fetchRoleFail())
        }
    }
}
export const addUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let result = await addNewUser(data)
            if (result) {
                console.log(result)
                //CO THỂ DISPATH NHIỀU LẦN 
            } else {
                
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const fetchAllScheduleHours =(type) =>  {
    return async (dispatch , getState )=>{
        try{
            let result = await getAllCodeService(type)
            if(result ){
                  dispatch(fetchAllScheduleHoursSuccess(result.data ) )  
            }else{
                  dispatch(fetchAllScheduleHoursFail())
            }
        }catch(e){
                 dispatch(fetchAllScheduleHoursFail())
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch , getState )=>{
        try{    
            //dispatch({type  :actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})
            let resPrice = await getAllCodeService("PRICE")
            let resProvince = await getAllCodeService("PROVINCE")
            let resPayment = await getAllCodeService("PAYMENT")
            if(resPrice.data && resProvince.data && resPayment.data ){
                dispatch(fetchRequiredDoctorInfoSuccess([resPrice.data , 
                    resProvince.data , resPayment.data]))
            }
            // console.log(resPrice)
            // console.log(resProvince)
            // console.log(resPayment)
        }catch(e){
                 
        }
    }
}


export const fetchGenderSuccess = (data) => ({
    type : actionTypes.FETCH_GENDER_SUCCESS,
    payload : data
})
export const fetchGenderFail = () => ({
    type : actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionSuccess = (data) => ({
    type : actionTypes.FETCH_POSITION_SUCCESS,
    payload :data
})  
export const fetchPositionFail = () => ({
    type : actionTypes.FETCH_GENDER_FAIL
})

export const fetchRoleSuccess = (data) => ({
    type : actionTypes.FETCH_ROLE_SUCCESS,
    payload :data
})  
export const fetchRoleFail = () => ({
    type : actionTypes.FETCH_ROLE_FAIL
})
export const fetchAllUserSuccess = (data) => ({
    type : actionTypes.FETCH_ALL_USER_SUCCESS,
    payload : data
})
  
export const fetchAllScheduleHoursSuccess = (data) => ({
    type : actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCESS,
    payload : data
})
export const fetchAllScheduleHoursFail = () => ({
    type : actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAIL
})
export const fetchRequiredDoctorInfoSuccess = (data) => ({
    type : actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    payload : data
})
export const fetchRequiredDoctorInfoFail = () => ({
    type : actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL
})
  
    
 
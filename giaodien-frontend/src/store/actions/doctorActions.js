import actionTypes from './actionTypes';
import {getTopDoctorHomeService ,saveDetailDoctor
} from './../../services/doctorServices'

export const getTopHomeDoctors = () => {
    return async (dispatch , getState )=>{
        try{
            let result = await getTopDoctorHomeService(3)
            if(result ){
                  dispatch(fetchTopDoctorHomeSuccess(result.data ) )  
            }else{
                  dispatch(fetchTopDoctorHomeFail())
            }
        }catch(e){
                 dispatch(fetchTopDoctorHomeFail())
        }
    }
}
export const saveDetailDoctorAct = (data) => {
    return async (dispatch , getState )=>{
        try{
            let resp = await saveDetailDoctor(data) 
            if(resp ){
                  dispatch(saveDetailDoctorSuccess2() )  
            }else{
                  dispatch(saveDetailDoctorFailed())
            }
        }catch(e){
                 dispatch(saveDetailDoctorFailed())
        }
    }
}

const fetchTopDoctorHomeSuccess = ( data) =>  ({
    type : actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS , 
    payload : data 
})
const fetchTopDoctorHomeFail = () =>  ({
    type : actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED 
})
const saveDetailDoctorSuccess2 = ( ) =>  ({
    type : actionTypes.SaveDetailDoctorSuccess
})
const saveDetailDoctorFailed = ( ) =>  ({
    type : actionTypes.SaveDetailDoctorFailed
})
////////


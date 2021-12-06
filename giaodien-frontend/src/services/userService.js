import axios from '../axios';

export const getAllCodeService =(inputType)=> {
    return axios.get(`/api/allcode?type=${inputType}`)
};
export const addNewUser =(data)=> {
   
    return axios.post(`/api/create-new-user`,data)
};
export const fetchAllUsers =()=> {
    return axios.get(`/api/get-all-users?id=all`)
};
export const saveBulkSchedule =(data)=> {
    return axios.post(`/api/bulk-create-schedule`,data)
};
export const getScheduleDoctorByDate =(doctorId,date)=> {
    return axios.get(`/api/get-schedule-doctor-date?doctorId=${doctorId}&date=${date}`)
};
export const getExtraInfoByDoctorId =(doctorId)=> {
    return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`)
};

import axios from '../axios';

export const getTopDoctorHomeService =(limit)=> {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
};
export const saveDetailDoctor =(data)=> {
    return axios.post(`/api/save-info-doctors`,data)
};
export const getDoctorDetail =(doctorId)=> {
    return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`)
};
export const getAllDoctorPrice =()=> {
    return axios.get(`/api/get-all-doctor-price`)
};
export const getProfileDoctorById =(doctorId)=> {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
};
//patient booking appointment with doctor
export const bookingAppoitment =(data)=> {
    return axios.post(`/api/patient-book-appointment`,data)
};
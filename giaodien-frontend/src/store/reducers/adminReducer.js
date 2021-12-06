import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null,
    genders: [],
    roles: [],  //quyen
    positions: [],// chuc danh bac si
    users: [],
    doctorsHome: [],
    scheduleHours: [],

    arrPrice: [],
    arrProvince: [],
    arrPayment: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        /////////////////////////////
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:

            return {
                ...state,
                genders: action.payload
            }
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.payload
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.payload
            }
        case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS:
            return {
                ...state,
                doctorsHome: action.payload
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCESS:
            return {
                ...state,
                scheduleHours: action.payload
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            let [arr1, arr2, arr3] = action.payload
            return {
                ...state,
                arrPrice: arr1,
                arrProvince: arr2,
                arrPayment: arr3
            }
        default:
            return state;
    }
}

export default appReducer;
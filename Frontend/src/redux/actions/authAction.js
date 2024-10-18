import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT,STAFF_LOGOUT } from "../constants/constant"
import { BASE_URL } from "../../../config";




export const LOGIN=({credentials,navigate}) => async(dispatch) =>{
    try{
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        } 
        const { data } = await axios.post(  `${BASE_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password
        },
             config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
       console.log(data)
        sessionStorage.setItem('userInfo', JSON.stringify(data))
        const role = data?.user?.role || [];
        let redirectPath = "/"

        if (role === "admin") {
            toast.success(`${credentials.email} logged in as Admin`);
            redirectPath = "/admin/dashboard";
        } else if (role === "officeStaff") {
            toast.success(`${credentials.email} logged in as Staff`);
            redirectPath = "/staff";
        } else if (role === "librarian") {
            toast.success(`${credentials.email} logged in as Librarian`);
            redirectPath = "/librarian";
        }

        setTimeout(() => {
            navigate(redirectPath); 
        }, 1000);
    }
 catch (error) {
    const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: USER_LOGIN_FAIL,
        payload: errorMsg
    });
    toast.error(errorMsg); 
    navigate("/")
}
}

export const LOGOUT = (navigate,isStaff) => async (dispatch) => {
    sessionStorage.removeItem("userInfo");

    toast.warning("Logged out successfully");
  
    if (isStaff) {
        dispatch({ type: STAFF_LOGOUT });
    } else {
        dispatch({ type: USER_LOGOUT });
    }
  
    setTimeout(() => {
      navigate("/");  
    }, 2000)
  };
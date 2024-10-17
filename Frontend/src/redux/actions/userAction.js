import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from "../../../config";
import { USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, 
    USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_DELETE_REQUEST,USER_DELETE_SUCCESS,USER_DELETE_FAIL
} from "../constants/constant";

export const addNewUserAction = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_CREATE_REQUEST });
        const { auth: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        };
        console.log("Form Data being sent:", formData);
        console.log('Authorization token:', userInfo.token);

        const { data } = await axios.post(`${BASE_URL}/admin/add-user`, formData, config);
        dispatch({ type: USER_CREATE_SUCCESS, payload: data })
        if (data.success) {
            toast.success(data.message);
        }

    } catch (error) {
        const errorMsg =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({ type: USER_CREATE_FAIL, payload: errorMsg });
        toast.error(errorMsg);
    }
};

export const listUsersAction =()=>async(dispatch,getState)=>{
 try{
    dispatch({type:USER_LIST_REQUEST})
    const {auth:{userInfo}}=getState()
    const config={
        headers:{
            Authorization: `Bearer ${userInfo.token}`
        },
        withCredentials:true
    }

        const {data} =await axios.get(`${BASE_URL}/admin/users`,config)
        dispatch({type:USER_LIST_SUCCESS,payload:data.data})
       
 }catch(error){
    const errorMsg =
    error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

dispatch({ type: USER_LIST_FAIL, payload: errorMsg });
toast.error(errorMsg);
 }
}

export const userUpdateAction =(userId,formData) =>async(dispatch,getState)=>{
    try{
        dispatch({type:USER_UPDATE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        const {data} =await axios.put(`${BASE_URL}/admin/users/${userId}`,formData,config)
        dispatch({type:USER_UPDATE_SUCCESS,payload:data})
        if (data.success) {
            toast.success(data.message);
        }
        return data.user; 
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: USER_UPDATE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
}
 export const userDeleteAction=(userId) =>async(dispatch,getState)=>{
    try{
        dispatch({type:USER_DELETE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        const {data} =await axios.delete(`${BASE_URL}/admin/users/${userId}`,config)
        
        dispatch({type:USER_DELETE_SUCCESS,payload:data})
      
        if (data.success) {
            toast.success(data.message);
        }
       
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: USER_DELETE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
 }

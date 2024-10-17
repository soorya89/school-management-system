import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { STUDENT_CREATE_FAIL,STUDENT_CREATE_REQUEST,STUDENT_CREATE_SUCCESS,
    STUDENT_LIST_FAIL,STUDENT_LIST_REQUEST,STUDENT_LIST_SUCCESS,
    STUDENT_DELETE_FAIL,STUDENT_DELETE_REQUEST,STUDENT_DELETE_SUCCESS,
    STUDENT_UPDATE_FAIL,STUDENT_UPDATE_REQUEST,STUDENT_UPDATE_SUCCESS,
 } from "../constants/constant";


export const addNewStudentAction = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_CREATE_REQUEST });
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

        const { data } = await axios.post(`${BASE_URL}/student/add-student`, formData, config);
        console.log('Fetched students:', data.data); 
        dispatch({ type: STUDENT_CREATE_SUCCESS, payload: data })
        if (data.success) {
            toast.success(data.message);
        }

    } catch (error) {
        const errorMsg =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({ type: STUDENT_CREATE_FAIL, payload: errorMsg });
        toast.error(errorMsg);
    }
};

export const listStudentsAction =()=>async(dispatch,getState)=>{
    try{
       dispatch({type:STUDENT_LIST_REQUEST})
       const {auth:{userInfo}}=getState()
       const config={
           headers:{
               Authorization: `Bearer ${userInfo.token}`
           },
           withCredentials:true
       }
   
           const {data} =await axios.get(`${BASE_URL}/student/students`,config)
           dispatch({type:STUDENT_LIST_SUCCESS,payload:data.data})
          
    }catch(error){
       const errorMsg =
       error.response && error.response.data.message
           ? error.response.data.message
           : error.message;
   
   dispatch({ type: STUDENT_LIST_FAIL, payload: errorMsg });
   toast.error(errorMsg);
    }
   }

   export const studentUpdateAction =(studentId,formData) =>async(dispatch,getState)=>{
    try{
        dispatch({type:STUDENT_UPDATE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        const {data} =await axios.put(`${BASE_URL}/student/students/${studentId}`,formData,config)
        dispatch({type:STUDENT_UPDATE_SUCCESS,payload:data})
        if (data.success) {
            toast.success(data.message);
        }
        return data.user; 
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: STUDENT_UPDATE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
}

export const studentDeleteAction=(studentId) =>async(dispatch,getState)=>{
    try{
        dispatch({type:STUDENT_DELETE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        const {data} =await axios.delete(`${BASE_URL}/student/students/${studentId}`,config)
        
        dispatch({type:STUDENT_DELETE_SUCCESS,payload:data})
      
        if (data.success) {
            toast.success(data.message);
        }
       
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: STUDENT_DELETE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
 }
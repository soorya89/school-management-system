
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { LIBRARYHISTORY_LIST_REQUEST,LIBRARYHISTORY_LIST_SUCCESS,LIBRARYHISTORY_LIST_FAIL
    ,LIBRARYHISTORY_UPDATE_FAIL,LIBRARYHISTORY_UPDATE_REQUEST,LIBRARYHISTORY_UPDATE_SUCCESS,
    LIBRARYHISTORY_DELETE_FAIL,LIBRARYHISTORY_DELETE_SUCCESS,LIBRARYHISTORY_DELETE_REQUEST,
    LIBRARYHISTORY_CREATE_FAIL,LIBRARYHISTORY_CREATE_SUCCESS,LIBRARYHISTORY_CREATE_REQUEST
 } from '../constants/constant'
 


 export const addNewHistoryAction = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: LIBRARYHISTORY_CREATE_REQUEST });
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

        const { data } = await axios.post(`${BASE_URL}/library/add-history`, formData, config);
        console.log('Fetched history:', data.data); 
        dispatch({ type: LIBRARYHISTORY_CREATE_SUCCESS, payload: data })
        if (data.success) {
            toast.success(data.message);
        }

    } catch (error) {
        const errorMsg =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({ type: LIBRARYHISTORY_CREATE_FAIL, payload: errorMsg });
        toast.error(errorMsg);
    }
};

export const listHistoryAction =()=>async(dispatch,getState)=>{
    try{
       dispatch({type:LIBRARYHISTORY_LIST_REQUEST})
       const {auth:{userInfo}}=getState()
       const config={
           headers:{
               Authorization: `Bearer ${userInfo.token}`
           },
           withCredentials:true
       }
   console.log(userInfo,"////")
           const {data} =await axios.get(`${BASE_URL}/library/history`,config)
           console.log(data,"data")
           dispatch({type:LIBRARYHISTORY_LIST_SUCCESS,payload:data.data})
          
    }catch(error){
       const errorMsg =
       error.response && error.response.data.message
           ? error.response.data.message
           : error.message;
   
   dispatch({ type: LIBRARYHISTORY_LIST_FAIL, payload: errorMsg });
   toast.error(errorMsg);
    }
   }

   export const historyUpdateAction =(historyId,formData) =>async(dispatch,getState)=>{
    try{
        dispatch({type:LIBRARYHISTORY_UPDATE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        const {data} =await axios.put(`${BASE_URL}/library/history/${historyId}`,formData,config)
        dispatch({type:LIBRARYHISTORY_UPDATE_SUCCESS,payload:data})
        if (data.success) {
            toast.success(data.message);
        }
        return data.user; 
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: LIBRARYHISTORY_UPDATE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
}

export const historyDeleteAction=(historyId) =>async(dispatch,getState)=>{
    console.log(historyId,"id...")
    try{
        dispatch({type:LIBRARYHISTORY_DELETE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        console.log(historyId,"id...")
        const {data} =await axios.delete(`${BASE_URL}/library/history/${historyId}`,config)
        
        dispatch({type:LIBRARYHISTORY_DELETE_SUCCESS,payload:data})
      
        if (data.success) {
            toast.success(data.message);
        }
       
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: LIBRARYHISTORY_DELETE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
 }
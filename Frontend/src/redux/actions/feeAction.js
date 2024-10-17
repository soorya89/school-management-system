
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { FEEHISTORY_CREATE_FAIL,FEEHISTORY_CREATE_REQUEST,FEEHISTORY_CREATE_SUCCESS,
    FEEHISTORY_DELETE_FAIL,FEEHISTORY_DELETE_REQUEST,FEEHISTORY_DELETE_SUCCESS,
    FEEHISTORY_LIST_FAIL,FEEHISTORY_LIST_REQUEST,FEEHISTORY_LIST_SUCCESS,
    FEEHISTORY_UPDATE_FAIL,FEEHISTORY_UPDATE_REQUEST,FEEHISTORY_UPDATE_SUCCESS
} from "../constants/constant";  

export const addNewFeeHistoryAction = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: FEEHISTORY_CREATE_REQUEST });
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

        const { data } = await axios.post(`${BASE_URL}/fees/add-history`, formData, config);
        console.log('Fetched history:', data.data); 
        dispatch({ type: FEEHISTORY_CREATE_SUCCESS, payload: data })
        if (data.success) {
            toast.success(data.message);
        }

    } catch (error) {
        const errorMsg =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({ type: FEEHISTORY_CREATE_FAIL, payload: errorMsg });
        toast.error(errorMsg);
    }
};

export const listFeeHistoryAction =()=>async(dispatch,getState)=>{
    try{
       dispatch({type:FEEHISTORY_LIST_REQUEST})
       const {auth:{userInfo}}=getState()
       const config={
           headers:{
               Authorization: `Bearer ${userInfo.token}`
           },
           withCredentials:true
       }
   console.log(userInfo)
           const {data} =await axios.get(`${BASE_URL}/fees/history`,config)
           console.log(data,"data")
           dispatch({type:FEEHISTORY_LIST_SUCCESS,payload:data.data})
          
    }catch(error){
       const errorMsg =
       error.response && error.response.data.message
           ? error.response.data.message
           : error.message;
   
   dispatch({ type: FEEHISTORY_LIST_FAIL, payload: errorMsg });
   toast.error(errorMsg);
    }
   }

   export const feeHistoryUpdateAction =(feeId,formData) =>async(dispatch,getState)=>{
    try{
        dispatch({type:FEEHISTORY_UPDATE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        const {data} =await axios.put(`${BASE_URL}/fees/history/${feeId}`,formData,config)
        dispatch({type:FEEHISTORY_UPDATE_SUCCESS,payload:data})
        if (data.success) {
            toast.success(data.message);
        }
        return data.user; 
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: FEEHISTORY_UPDATE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
}

export const feeHistoryDeleteAction=(feeId) =>async(dispatch,getState)=>{
    try{
        dispatch({type:FEEHISTORY_DELETE_REQUEST})
        const{auth : {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        }
        const {data} =await axios.delete(`${BASE_URL}/fees/history/${feeId}`,config)
        
        dispatch({type:FEEHISTORY_DELETE_SUCCESS,payload:data})
      
        if (data.success) {
            toast.success(data.message);
        }
       
       
    }catch(error){
        const errorMsg =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    
    dispatch({ type: FEEHISTORY_DELETE_FAIL, payload: errorMsg });
    toast.error(errorMsg);
    }
 }
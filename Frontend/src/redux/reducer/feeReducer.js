import { FEEHISTORY_CREATE_FAIL,FEEHISTORY_CREATE_REQUEST,FEEHISTORY_CREATE_SUCCESS,
        FEEHISTORY_DELETE_FAIL,FEEHISTORY_DELETE_REQUEST,FEEHISTORY_DELETE_SUCCESS,
        FEEHISTORY_LIST_FAIL,FEEHISTORY_LIST_REQUEST,FEEHISTORY_LIST_SUCCESS,
        FEEHISTORY_UPDATE_FAIL,FEEHISTORY_UPDATE_REQUEST,FEEHISTORY_UPDATE_SUCCESS
 } from "../constants/constant";  
 
 
 export const feeHistoryListReducer=(state={ fee: [] },action)=>{
    switch(action.type){
        case FEEHISTORY_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case FEEHISTORY_LIST_SUCCESS:
            return { ...state, loading: false, history: action.payload }; 
        case FEEHISTORY_LIST_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };
        default:
            return state
    }
 }

 export const feeHistoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case FEEHISTORY_CREATE_REQUEST:
            return {...state, loading:true};
        case FEEHISTORY_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case FEEHISTORY_CREATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const feeHistoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case FEEHISTORY_UPDATE_REQUEST:
            return {...state, loading:true};
        case FEEHISTORY_UPDATE_SUCCESS:
            return {...state, loading:false, success:true};
        case FEEHISTORY_UPDATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const feeHistoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case FEEHISTORY_DELETE_REQUEST:
            return {...state, loading:true};
        case FEEHISTORY_DELETE_SUCCESS:
            return {...state, loading:false, success:true};
        case FEEHISTORY_DELETE_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}
  
import { LIBRARYHISTORY_LIST_REQUEST,LIBRARYHISTORY_LIST_SUCCESS,LIBRARYHISTORY_LIST_FAIL
    ,LIBRARYHISTORY_UPDATE_FAIL,LIBRARYHISTORY_UPDATE_REQUEST,LIBRARYHISTORY_UPDATE_SUCCESS,
    LIBRARYHISTORY_DELETE_FAIL,LIBRARYHISTORY_DELETE_SUCCESS,LIBRARYHISTORY_DELETE_REQUEST,
    LIBRARYHISTORY_CREATE_FAIL,LIBRARYHISTORY_CREATE_SUCCESS,LIBRARYHISTORY_CREATE_REQUEST
 } from "../constants/constant";


 const initialState = {
    loading: false,
    libraryHistory: [],
    error: null,
  };

  export const libraryHistoryListReducer=(state={ history: [] },action)=>{
    switch(action.type){
        case LIBRARYHISTORY_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case LIBRARYHISTORY_LIST_SUCCESS:
            return { ...state, loading: false, history: action.payload }; 
        case LIBRARYHISTORY_LIST_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };
        default:
            return state
    }
 }

 export const libraryHistoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case LIBRARYHISTORY_CREATE_REQUEST:
            return {...state, loading:true};
        case LIBRARYHISTORY_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case LIBRARYHISTORY_CREATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const libraryHistoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case LIBRARYHISTORY_UPDATE_REQUEST:
            return {...state, loading:true};
        case LIBRARYHISTORY_UPDATE_SUCCESS:
            return {...state, loading:false, success:true};
        case LIBRARYHISTORY_UPDATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const libraryHistoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case LIBRARYHISTORY_DELETE_REQUEST:
            return {...state, loading:true};
        case LIBRARYHISTORY_DELETE_SUCCESS:
            return {...state, loading:false, success:true};
        case LIBRARYHISTORY_DELETE_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}
  
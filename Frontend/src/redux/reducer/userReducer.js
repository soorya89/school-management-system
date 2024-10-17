import { USER_CREATE_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
USER_UPDATE_REQUEST,
USER_UPDATE_FAIL,
USER_LIST_FAIL,
USER_LIST_REQUEST,
USER_LIST_SUCCESS
 } from "../constants/constant";


 const initialState={
    loading:false,
    OfficeStaff:[],
    librarian:[],
    users:[],
    error:null
 }

 export const userListReducer=(state=initialState,action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case USER_LIST_SUCCESS:
            return { ...state, loading: false, users: action.payload }; 
        case USER_LIST_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };
        default:
            return state
    }
 }

 export const userCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return {...state, loading:true};
        case USER_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case USER_CREATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {...state, loading:true};
        case USER_UPDATE_SUCCESS:
            return {...state, loading:false, success:true};
        case USER_UPDATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {...state, loading:true};
        case USER_DELETE_SUCCESS:
            return {...state, loading:false, success:true};
        case USER_DELETE_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}
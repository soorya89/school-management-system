import { STUDENT_CREATE_FAIL,STUDENT_CREATE_REQUEST,STUDENT_CREATE_SUCCESS,
         STUDENT_LIST_FAIL,STUDENT_LIST_REQUEST,STUDENT_LIST_SUCCESS,
         STUDENT_DELETE_FAIL,STUDENT_DELETE_REQUEST,STUDENT_DELETE_SUCCESS,
         STUDENT_UPDATE_FAIL,STUDENT_UPDATE_REQUEST,STUDENT_UPDATE_SUCCESS,
 } from "../constants/constant";



 const initialState={
    loading:false,
    students:[],
    error:null
 }
export const studentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_CREATE_REQUEST:
            return {...state, loading:true};
        case STUDENT_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case STUDENT_CREATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}
export const studentListReducer=(state={initialState},action)=>{
    switch(action.type){
        case STUDENT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case STUDENT_LIST_SUCCESS:
            return { ...state, loading: false, students: action.payload }; 
        case STUDENT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };       
        default:
            return state
    }
 }

 export const studentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_UPDATE_REQUEST:
            return {...state, loading:true};
        case STUDENT_UPDATE_SUCCESS:
            return {...state, loading:false, success:true};
        case STUDENT_UPDATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const studentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_DELETE_REQUEST:
            return {...state, loading:true};
        case STUDENT_DELETE_SUCCESS:
            return {...state, loading:false, success:true};
        case STUDENT_DELETE_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}
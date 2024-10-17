import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducer/authReducer";
import { thunk } from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer,userUpdateReducer,userDeleteReducer,userCreateReducer } from "../reducer/userReducer";
import { studentCreateReducer,studentDeleteReducer,studentListReducer,studentUpdateReducer } from "../reducer/studentReducer";
import { libraryHistoryCreateReducer,libraryHistoryDeleteReducer,libraryHistoryListReducer,libraryHistoryUpdateReducer } from "../reducer/libraryReducer";
import { feeHistoryCreateReducer,feeHistoryDeleteReducer,feeHistoryListReducer,feeHistoryUpdateReducer } from "../reducer/feeReducer";

const reducer={
    auth:authReducer,
    userList:userListReducer,
    userCreate:userCreateReducer,
    userUpdate:userUpdateReducer,
    userDelete:userDeleteReducer,
    studentList:studentListReducer,
    studentCreate:studentCreateReducer,
    studentUpdate:studentUpdateReducer,
    studentDelete:studentDeleteReducer,
    historyList:libraryHistoryListReducer,
    historyCreate:libraryHistoryCreateReducer,
    historyUpdate:libraryHistoryUpdateReducer,
    historyDelete:libraryHistoryDeleteReducer,
    feeHistoryCreate:feeHistoryCreateReducer,
    feeHistoryUpdate:feeHistoryUpdateReducer,
    feeHistoryList:feeHistoryListReducer,
    feeHistoryDelete:feeHistoryDeleteReducer
}

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

  const initialState = {
    auth: {
        userInfo: userInfoFromStorage, 
        loading: false,
        error: null,
    },
    userList:{
        officeStaff:[],
        loading:false,
        error:null,
        librarian:[]
    },
    userCreate:{
        loading:false,
        error:null,
        success:false
    },
    userUpdate:{
        loading:false,
        error:null,
        success:false
    },
    userDelete:{
        loading:false,
        error:null,
        success:false
    },
    studentList:{
        student:[],
        loading:false,
        error:null,
       
    },
    studentCreate:{
        loading:false,
        error:null,
        success:false
    },
    studentUpdate:{
        loading:false,
        error:null,
        success:false
    },
    studentDelete:{
        loading:false,
        error:null,
        success:false
    },
    historyList:{
        history:[],
        loading:false,
        error:null,
       
    },
    historyCreate:{
        loading:false,
        error:null,
        success:false
    },
    historyUpdate:{
        loading:false,
        error:null,
        success:false
    },
    historyDelete:{
        loading:false,
        error:null,
        success:false
    },
}


const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: composeWithDevTools(),
});

export default store;
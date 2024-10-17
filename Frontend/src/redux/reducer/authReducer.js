import { USER_LOGIN_SUCCESS, USER_LOGOUT} from '../constants/constant'

const initialState = {
    userInfo:null,
}
export const authReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "USER_LOGIN_SUCCESS":
            console.log("Payload:", action.payload);
              return { ...state, loading: false, userInfo: action.payload };
        case "USER_LOGOUT":
          return { ...state, loading: false, error: action.payload };
          
          default:
          return state;
      }
}
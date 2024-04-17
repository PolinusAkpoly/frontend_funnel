import { removeItem, setItem } from "../../helpers/cookie.service";
import { deleteCookie, setCookie } from "../../helpers/utils";
import { CONNECTED, LOGOUT } from "../actions/actionTypes";
import { AuthAction } from "../actions/types"
import { getInitStore } from "../lib/initLib";



const initStore = getInitStore()

const initAction: AuthAction = {
    type: LOGOUT,
    payload: initStore
}

export const authReducers = (state = initStore, action: AuthAction = initAction) =>{
    switch (action.type) {
        case CONNECTED:
            setItem("auth", {
                isAuth: true,
                token: action.payload?.token,
                userId: action.payload?.userId,
                user: action.payload?.user
            })
            setCookie("userId",action.payload!.userId)
            setCookie("ouitube_token",action.payload!.token)
            return {
                isAuth: true,
                token: action.payload?.token,
                userId: action.payload?.userId,
                user: action.payload?.user
            }
            break;
        case LOGOUT:
            removeItem("auth")
            deleteCookie("ouitube_token")
            deleteCookie("userId")
            return {
                isAuth: false,
                token: "",
                userId: ""
            }
            break;
    
        default:
            return state
            break;
    }
}
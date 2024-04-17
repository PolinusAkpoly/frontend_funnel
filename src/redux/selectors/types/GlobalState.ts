import { CartGlobalState, NotificationData } from "../../actions/types"

interface AuthData {
    isAuth: boolean,
    token: string
    userId: string
    user: any
}

export interface GlobalState{
    auth: AuthData,
    cart: CartGlobalState
    datas: NotificationData
    storage: any
}
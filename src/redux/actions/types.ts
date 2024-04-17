import { Article } from '../../models/Article';
import { Product } from '../../models/Product';
import { User } from '../../models/User';
import { ADD_NOTIFICATION, ADD_TO_CART, ADD_TO_STORAGE, CLEAR_CART, CLEAR_NOTIFICATIONS, CONNECTED, LOGOUT, REMOVE_FROM_CART, REMOVE_FROM_STORAGE, REMOVE_NOTIFICATION_ITEM } from './actionTypes';

interface userConnectedData {
    token: string
    userId: string
    user?: User
}
interface CartData {
    product: Product
    quantity: number
}

export interface CartGlobalState {
    items: Article[]
    quantity: number
    sub_total: number
}

export interface AuthAction {
    type: typeof CONNECTED | typeof LOGOUT,
    payload: userConnectedData | null
}

export interface CartAction {
    type: typeof ADD_TO_CART | typeof REMOVE_FROM_CART| typeof CLEAR_CART | null,
    payload: CartData | null
}

export interface NotificationItem {
    _id: string
    message: string
    status: string
    timeout: number
}
export interface NotificationData {
    notifications: NotificationItem[]
}
export interface NotificationAction {
    type: typeof ADD_NOTIFICATION | typeof REMOVE_NOTIFICATION_ITEM 
    | typeof CLEAR_NOTIFICATIONS | null,
    payload: NotificationItem | null
}

export interface StockageAction{
    type: typeof ADD_TO_STORAGE | typeof REMOVE_FROM_STORAGE | null
    key: string | null
    unique?: boolean | null
    payload: any | null
}
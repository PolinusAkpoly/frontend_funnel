import { GlobalState } from "./types/GlobalState"



export const getAuthState = (state: GlobalState) => state.auth.isAuth

export const getUserRoles = (state: GlobalState) => state.auth.user.roles

export const isAdminSelector = (state: GlobalState) => state.auth?.user?.roles.includes('ROLE_ADMIN')


export const getCurrentUser = (state: GlobalState) => state.auth.user

export const getUserId = (state: GlobalState) => state.auth.userId

export const getAuthToken = (state: GlobalState) => state.auth.token

export const getCart = (state: GlobalState) => state.cart

export const getNotification = (state: GlobalState) => state.datas.notifications

export const getWishList = (state: GlobalState) => state.storage.wishlists 

export const getCurrentVideo = (state: GlobalState) => state.storage?.currentVideo 

export const getCompareList = (state: GlobalState) => state.storage.comparelists 

export const getSuscribed = (state: GlobalState) => state.storage?.isSuscribed 

export const getCarrier = (state: GlobalState) => state.storage?.carrier 

export const getCurrentStep = (state: GlobalState, tunnelId: string) => state.storage ? state.storage[tunnelId] : undefined;

export const getBlocks = (state: GlobalState) => state.storage?.blocks 
export const getCurrentBlock = (state: GlobalState) => state.storage?.currentBlock 
export const getCurrentTemplate = (state: GlobalState) => state.storage?.currentTemplate 

export const getCurrentAddress = (state: GlobalState) => state.storage?.currentAddress

export const getCartSubTotal = (state: GlobalState) => {

    const cartSubTotal = state.cart.sub_total + (state?.storage?.carrier?.price || 0)
    return cartSubTotal
}

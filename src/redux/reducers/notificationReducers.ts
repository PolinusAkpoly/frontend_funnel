import { sonoreEffet } from "../../helpers/utils";
import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS, REMOVE_NOTIFICATION_ITEM } from "../actions/actionTypes";
import { NotificationAction, NotificationData, NotificationItem } from "../actions/types"

const initState: NotificationData = {
    notifications: []
}


export const notificationReducers = (state = initState, action: NotificationAction= {type: null, payload: null}) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            sonoreEffet()
            return {
                notifications: [...state.notifications, action.payload]
            }
            break;
        case REMOVE_NOTIFICATION_ITEM:
            // sonoreEffet()
            state.notifications = state.notifications
            .filter((item: NotificationItem)=> item._id !== action.payload?._id)
            return {
                notifications: [...state.notifications]
            }
            break;
        case CLEAR_NOTIFICATIONS:
            return { ...initState }
            break;

        default:
            return state
            break;
    }
}
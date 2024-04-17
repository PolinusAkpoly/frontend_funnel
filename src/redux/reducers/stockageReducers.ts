import { getItem, setItem } from "../../helpers/localsorage.service";
import { ADD_TO_STORAGE, REMOVE_FROM_STORAGE } from "../actions/actionTypes";
import { StockageAction } from "../actions/types"

const storage = getItem("storage")

const initState: any = storage ? storage :{}

export const stockageReducers = (state= initState, 
    action: StockageAction = {type: null, key: null, payload: null}) => {

        switch (action.type) {
            case ADD_TO_STORAGE:
                if(action.key){
                    if(!action.unique){
                        if(!state[action.key]){
                            state[action.key] = []
                        }
                        const existing = state[action.key]
                        .find((exist: any)=> exist._id === action.payload?._id)
    
                        if(!existing){
                            state[action.key].push(action.payload)
                        }

                    }else{
                        //unique
                        state[action.key] = action.payload 
                    }

                }
                setItem("storage", state)
                return { ...state }
                break;
            case REMOVE_FROM_STORAGE:
                if(action.key){
                    if(!action.unique){
                        if(state[action.key]){
                            
                            const index = state[action.key]
                            .findIndex((existing: any)=> existing._id === action.payload?._id)
                            console.log({index});
                            
                            if(index != -1){
                                state[action.key] = state[action.key].filter((existing: any)=> existing._id !== action.payload?._id)
                            }
                        }

                    }else{
                        // unique
                        delete state[action.key]
                    }
                }
                setItem("storage", state)
                console.log(state);
                
                return {...state}
                break;
        
            default:
                return state
                break;
        }

}
import { combineReducers } from 'redux'
import {legacy_createStore as createStore} from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { authReducers } from './redux/reducers/authReducers'
import { notificationReducers } from './redux/reducers/notificationReducers'
import { stockageReducers } from './redux/reducers/stockageReducers'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  auth: authReducers,
  datas: notificationReducers,
  storage: stockageReducers
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ 
  devToolsEnhancer({}
    )
)

export default store
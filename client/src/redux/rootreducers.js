import { combineReducers } from "redux"
import userReducer from './reducers/user.reducers'

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer
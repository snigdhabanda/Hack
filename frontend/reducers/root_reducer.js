import { combineReducers } from "redux";
import UsersReducer from "./session/users_reducer";
import SessionReducer from './session/session_reducer'

const RootReducer = combineReducers ({
    users: UsersReducer,
    session: SessionReducer,
    errors: ErrorReducer
})

export default RootReducer
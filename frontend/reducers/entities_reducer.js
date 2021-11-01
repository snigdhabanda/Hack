import { combineReducers } from "redux";
import UsersReducer from "./session/users_reducer";
import MessagesReducer from "./messages_reducer"

const EntitiesReducer = combineReducers({
    users: UsersReducer,
    messages: MessagesReducer
})

export default EntitiesReducer
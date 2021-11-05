import { combineReducers } from "redux";
import SessionReducer from './session/session_reducer'
import ErrorsReducer from "./errors/errors_reducer";
import EntitiesReducer from "./entities_reducer";
import ViewReducer from "./view_reducer";

const RootReducer = combineReducers ({
    entities: EntitiesReducer,
    session: SessionReducer,
    currentView: ViewReducer,
    errors: ErrorsReducer
})

export default RootReducer
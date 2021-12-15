import { RECEIVE_USER_ERRORS} from "../../actions/user_actions"
import { RECEIVE_USER} from "../../actions/session/session_actions"

const UserErrorsReducer = (state= [], action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_USER_ERRORS:
            return action.errors 
        case RECEIVE_USER:
            return [];
        default:
            return state; 
    }
}

export default UserErrorsReducer; 
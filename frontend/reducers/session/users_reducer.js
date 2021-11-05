import { RECEIVE_USER, REMOVE_USER, RECEIVE_USERS} from "../../actions/session/session_actions";

const UsersReducer = (state= {}, action) => {
    Object.freeze(state)
    const nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users 
        case RECEIVE_USER:
            nextState[action.user.id] = action.user 
            return nextState; 
        case REMOVE_USER:
            delete nextState[action.user.id]
            return nextState
        default:
            return state; 
    }
}


export default UsersReducer; 
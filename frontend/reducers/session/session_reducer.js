import { RECEIVE_ERRORS, RECEIVE_USER, REMOVE_USER } from "../../actions/session/session_actions";

const _nullUser = {id: null}
const SessionReducer = (state=_nullUser, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER:
            return {id: action.user.id};
        case REMOVE_USER:
            return _nullUser; 
        case RECEIVE_ERRORS:
            return _nullUser; 
        default:
            return state;  
    }
}

export default SessionReducer; 
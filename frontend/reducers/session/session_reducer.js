import { RECEIVE_USER, REMOVE_USER } from "../../actions/session/session_actions";

const _nullUser = {id: null}
const SessionReducer = (state=_nullUser, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER:
            return action.user;
        case REMOVE_USER:
            return _nullUser; 
        default:
            return state;  
    }
}

export default SessionReducer; 
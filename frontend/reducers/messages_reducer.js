import { UPDATE_MESSAGE, DELETE_MESSAGE, RECEIVE_MESSAGE } from "../actions/messages_actions"
import { RECEIVE_CHANNEL } from "../actions/channel_actions"

const MessagesReducer = (state= {}, action) => {
    Object.freeze(state)
    const nextState = Object.assign({}, state)
    
    switch (action.type) {
        case RECEIVE_CHANNEL:
            if (action.messages) return action.messages 
            else return {}
        case UPDATE_MESSAGE:
            nextState[action.message.id] = action.message
            return nextState; 
        case DELETE_MESSAGE: 
            delete nextState[action.message.id]
            return nextState;
        case RECEIVE_MESSAGE: 
            nextState[action.message.id] = action.message
            return nextState; 
        default:
            return state; 
    }
}

export default MessagesReducer; 
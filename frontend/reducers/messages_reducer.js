import { RECEIVE_MESSAGES, UPDATE_MESSAGE, DELETE_MESSAGE, NEW_MESSAGE } from "../actions/messages_actions"

const MessagesReducer = (state= {}, action) => {
    Object.freeze(state)
    const nextState = Object.assign({}, state)
    
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return action.messages 
        case UPDATE_MESSAGE:
            nextState[action.message.id] = action.message
            return nextState; 
        case DELETE_MESSAGE:
            delete nextState[action.message.id]
            return nextState;
        case NEW_MESSAGE: 
            nextState[action.message.id] = action.message
            return nextState; 
        default:
            return state; 
    }
}

export default MessagesReducer; 
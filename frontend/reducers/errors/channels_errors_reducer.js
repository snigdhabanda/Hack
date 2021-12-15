import { RECEIVE_CHANNEL_ERRORS, UPDATE_CHANNEL, RECEIVE_CHANNEL } from "../../actions/channel_actions";

const ChannelsErrorsReducer = (state= [], action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_CHANNEL_ERRORS:
            return action.errors;
        case UPDATE_CHANNEL:
            return []
        case RECEIVE_CHANNEL:
            return []
        default:
            return state; 
    }
}

export default ChannelsErrorsReducer; 
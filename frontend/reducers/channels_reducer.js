import { UPDATE_CHANNEL, DELETE_CHANNEL, RECEIVE_CHANNEL, RECEIVE_CHANNELS } from "../actions/channel_actions"

const ChannelsReducer = (state= {}, action) => {
    Object.freeze(state)
    const nextState = Object.assign({}, state)
    
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return action.channels 
        case UPDATE_CHANNEL:
            nextState[action.channel.id] = action.channel
            return nextState; 
        case DELETE_CHANNEL:
            delete nextState[action.channel.id]
            return nextState;
        // case RECEIVE_CHANNEL: 
        //     nextState[action.channel.id] = action.channel
        //     return nextState; 
        default:
            return state; 
    }
}

export default ChannelsReducer; 
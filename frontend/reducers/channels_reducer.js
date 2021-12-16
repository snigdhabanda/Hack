import { UPDATE_CHANNEL, DELETE_CHANNEL, RECEIVE_CHANNEL, RECEIVE_CHANNELS } from "../actions/channel_actions"
import { RECEIVE_USER } from "../actions/session/session_actions"
import { REMOVE_CHANNEL_MEMBER } from "../actions/channel_member_actions"

const ChannelsReducer = (state= {}, action) => {
    Object.freeze(state)
    const nextState = Object.assign({}, state)
    
    switch (action.type) {
        
        case RECEIVE_USER:
            if (action.user.channels){
                return action.user.channels
            }
            else{
                return state; 
            }
        case UPDATE_CHANNEL:
            nextState[action.channel.id] = action.channel
            return nextState; 
        case DELETE_CHANNEL:
            delete nextState[action.channel.id]
            return nextState;
        case REMOVE_CHANNEL_MEMBER:
            delete nextState[action.channelMember.channelId]
            return nextState;
        case RECEIVE_CHANNEL: 
            nextState[action.channel.id] = action.channel
            return nextState; 
        default:
            return state; 
    }
}

export default ChannelsReducer; 
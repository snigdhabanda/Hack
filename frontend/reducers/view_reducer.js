import { RECEIVE_CHANNEL, DELETE_CHANNEL } from "../actions/channel_actions"
import { REMOVE_CHANNEL_MEMBER } from "../actions/channel_member_actions"
const defaultState = {dmId: null, channelId: 1}

const ViewReducer = (state=defaultState, action) =>{
    const nextState = Object.assign({}, state)
    switch (action.type) {
        // case RECEIVE_DM:
        //     nextState[dmId] = action.id
        //     nextState[channelId] = nil
        //     return nextState;
        case RECEIVE_CHANNEL:
            nextState.channelId = action.channel.id
            nextState.dmId = null
            return nextState;
        case DELETE_CHANNEL:
            return defaultState;
        case REMOVE_CHANNEL_MEMBER:
            return defaultState;  
        default:
            return state;
    }
}

export default ViewReducer
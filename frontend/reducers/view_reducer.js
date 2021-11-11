import { RECEIVE_CHANNEL } from "../actions/channel_actions"
const defaultState = {dmId: null, channelId: 2}

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
        default:
            return state;
    }
}

export default ViewReducer
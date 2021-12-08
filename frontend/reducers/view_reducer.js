import { RECEIVE_CHANNEL } from "../actions/channel_actions"
const defaultState = {channelId: 120}

const ViewReducer = (state=defaultState, action) =>{
    const nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_CHANNEL:
            nextState.channelId = action.channel.id
            return nextState; 
        default:
            return state;
    }
}

export default ViewReducer
import { RECEIVE_CHANNEL } from "../actions/channel_actions"
import { RECEIVE_CHANNEL_MEMBER } from "../actions/channel_member_actions"

const ChannelMembersReducer = (state= {}, action) => {
    const nextState = Object.assign({}, state)
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CHANNEL:
            if (action.channelMembers) return action.channelMembers 
            else return {}
        case RECEIVE_CHANNEL_MEMBER:
            if (Object.values(state).length === 0) {
                const newState = {}
                newState[action.channelMember.id] = action.channelMember
                return newState;
            }
            else{
                nextState[action.channelMember.id] = action.channelMember
                return nextState;
            }
            
        default:
            return state; 
    }
}

export default ChannelMembersReducer; 
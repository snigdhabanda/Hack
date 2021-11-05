import { RECEIVE_CHANNEL } from "../actions/channel_actions"
import { RECEIVE_CHANNEL_MEMBER } from "../actions/channel_member_actions"

const ChannelMembersReducer = (state= {}, action) => {
    const nextState = Object.assign(state, {})
    Object.freeze(state)
    switch (action.type) {
        // case RECEIVE_CHANNEL:
        //     return action.channelMembers 
        // case RECEIVE_CHANNEL_MEMBER:
        //     if (action.channelMember.channelId !== state.channelMember.channelId){
        //         const nextState = {}
        //         nextState[action.channelMember.id] = channelMember
        //     }
        //     else {
        //         nextState[action.channelMember.id] = channelMember
        //     } 
        //     return action.channelMembers
        default:
            return state; 
    }
}

export default ChannelMembersReducer; 
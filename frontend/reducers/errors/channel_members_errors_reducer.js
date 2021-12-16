import {RECEIVE_CHANNEL_MEMBER_ERRORS, RECEIVE_CHANNEL_MEMBER} from "../../actions/channel_member_actions"

const ChannelMembersErrorsReducer = (state= [], action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_CHANNEL_MEMBER_ERRORS:
            if (action.errors !== ["That channel has already been created"]) {
                return []
            }
            else{
                return action.errors; 
            }
        case RECEIVE_CHANNEL_MEMBER:
            return [];
        default:
            return state; 
    }
}

export default ChannelMembersErrorsReducer; 
import { combineReducers } from "redux";
import UsersReducer from "./session/users_reducer";
import MessagesReducer from "./messages_reducer"
import ChannelsReducer from "./channels_reducer"
import ChannelMembersReducer from "./channel_members_reducer";

const EntitiesReducer = combineReducers({
    users: UsersReducer,
    messages: MessagesReducer,
    channels: ChannelsReducer,
    channelMembers: ChannelMembersReducer 
})

export default EntitiesReducer
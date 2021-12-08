import { combineReducers } from "redux";
import MessagesReducer from "./messages_reducer"
import ChannelsReducer from "./channels_reducer"
import ChannelMembersReducer from "./channel_members_reducer";

const EntitiesReducer = combineReducers({
    messages: MessagesReducer,
    channels: ChannelsReducer,
    channelMembers: ChannelMembersReducer 
})

export default EntitiesReducer
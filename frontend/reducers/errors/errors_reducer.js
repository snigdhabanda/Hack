import SessionErrorsReducer from "./session_errors_reducer"
import { combineReducers } from "redux";
import ChannelsErrorsReducer from "./channels_errors_reducer";
import ChannelMembersErrorsReducer from "./channel_members_errors_reducer";
import UserErrorsReducer from "./user_errors_reducer";

const ErrorsReducer = combineReducers ({
    session: SessionErrorsReducer,
    channels: ChannelsErrorsReducer,
    channelMembers: ChannelMembersErrorsReducer,
    user: UserErrorsReducer

})

export default ErrorsReducer; 
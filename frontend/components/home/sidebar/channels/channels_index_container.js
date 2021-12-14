import { connect } from "react-redux"
import { createChannel, fetchChannels, fetchChannel, updateChannel, deleteChannel } from "../../../../actions/channel_actions"
import ChannelsIndex from "./channels_index"
import {createChannelMember, leaveChannel} from '../../../../actions/channel_member_actions'
import { createMessage, removeMessage } from "../../../../actions/messages_actions"
import { getTime } from "../../../../actions/messages_actions"
import { fetchCurrentUser } from "../../../../actions/session/session_actions"
import {fetchFilteredUsers} from "../../../../actions/user_actions"

const mapStateToProps = (state) => ({
    channels: state.entities.channels,
    currentUser: state.session.id,
    currentView: state.currentView.channelId,
    messages: state.entities.messages,
    users: state.entities.users,
    dynamicView: state.currentView,
    channelMembers: state.entities.channelMembers,
    errors: state.errors.channels
    
})

const mapDispatchToProps = (dispatch) => ({
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    fetchChannels: () => dispatch(fetchChannels()),
    fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
    updateChannel: (channelId) => dispatch(updateChannel(channelId)),
    createMessage: (message) => dispatch(createMessage(message)),
    getTime: (messageId) => dispatch(getTime(messageId)),
    removeMessage: (message) => dispatch(removeMessage(message)),
    leaveChannel: (channelId) => dispatch(leaveChannel(channelId)),
    createChannelMember: (channelMember) => dispatch(createChannelMember(channelMember))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex)
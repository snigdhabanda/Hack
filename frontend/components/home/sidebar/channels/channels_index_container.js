import { connect } from "react-redux"
import { createChannel, fetchChannels, fetchChannel } from "../../../../actions/channel_actions"
import ChannelsIndex from "./channels_index"
import {createChannelMember} from '../../../../actions/channel_member_actions'

const mapStateToProps = (state) => ({
    channels: state.entities.channels,
    currentUser: state.session.id,
    currentView: state.currentView.channelId,
    messages: state.entities.messages
    
})

const mapDispatchToProps = (dispatch) => ({
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    fetchChannels: () => dispatch(fetchChannels()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    createChannelMember: (channelMember) => dispatch(createChannelMember(channelMember))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex)
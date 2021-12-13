import {connect} from 'react-redux'
import ChannelForm from './channel_form'
import { fetchFilteredUsers } from '../../../../actions/user_actions'

const mapStateToProps = ({entities: {filters, channelMembers, users}}, ownProps) => ({
    // memberId: state.session.id,
    users: Object.values(users),
    currentView: ownProps.currentView,
    channels: ownProps.channels,
    memberIds: ownProps.memberIds,
    filteredUsers: Object.values(filters),
    channelMembers: Object.values(channelMembers)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createChannel: (channel) => dispatch(ownProps.createChannel(channel)),
    fetchChannel: (channel) => dispatch(ownProps.fetchChannel(channel)),
    createChannelMember: (channelMember) => dispatch(ownProps.createChannelMember(channelMember)),
    fetchFilteredUsers: (users) => dispatch(fetchFilteredUsers(users))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm)
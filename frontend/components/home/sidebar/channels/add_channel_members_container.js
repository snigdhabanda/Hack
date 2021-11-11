import { connect } from "react-redux"
import { createChannelMember } from "../../../../actions/channel_member_actions"
import AddChannelMembers from './add_channel_members'
const mapStateToProps = (state, ownProps) => ({
    members: ownProps.members,
    currentView: ownProps.currentView
})

const mapDispatchToProps = (dispatch) => ({
    createChannelMember: (channelMember) => dispatch(createChannelMember(channelMember))
    
})

// export default connect(mapStateToProps, mapDispatchToProps)(AddChannelMembers)
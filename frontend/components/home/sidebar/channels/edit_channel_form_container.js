import {connect} from 'react-redux'
import EditChannelForm from './edit_channel_form'
import { updateChannel, deleteChannel } from '../../../../actions/channel_actions'
import { fetchCurrentUser } from '../../../../actions/session/session_actions'


const mapStateToProps = ({entities: {channels}, errors, session}, ownProps) => ({
    channel: ownProps.channel,
    currentUser: session.id,
    errors: errors.channels,
    displayEditForm: ownProps.displayEditForm
    
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId)),
    rerenderParent: () => ownProps.rerenderParent()

    
})

export default connect(mapStateToProps, mapDispatchToProps)(EditChannelForm)
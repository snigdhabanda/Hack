import {connect} from 'react-redux'
import ChannelForm from './channel_form'

const mapStateToProps = ({session, currentView}) => ({
    memberId: [session.id],
    currentViewId: currentView.channelId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createChannel: (channel) => dispatch(ownProps.createChannel(channel))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm)
import {connect} from 'react-redux'
import { logoutUser } from '../../actions/session/session_actions'
import Home from './home'

const mapStateToProps = ({session, currentView, entities: {channels}}) => ({
    currentUserId: session.id,
    channelId: currentView.channelId,
    channels: channels
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
import {connect} from 'react-redux'
import { logoutUser } from '../../actions/session/session_actions'
import Home from './home'

const mapStateToProps = ({session, currentView}) => ({
    currentUser: session,
    channelId: currentView.channelId,
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
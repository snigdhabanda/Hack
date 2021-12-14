import {connect} from 'react-redux'
import { logoutUser } from '../../actions/session/session_actions'
import { updateUser } from '../../actions/user_actions'
import Home from './home'

const mapStateToProps = ({session, currentView, errors, entities: {users}}) => ({
    currentUserId: session.id,
    channelId: currentView.channelId,
    users: users,
    displayName: (Object.values(users).filter(user => user.id === session.id)[0]).displayName,
    email:(Object.values(users).filter(user => user.id === session.id)[0]).email,
    errors: errors.user
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
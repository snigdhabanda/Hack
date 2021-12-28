import {connect} from 'react-redux'
import { logoutUser } from '../../actions/session/session_actions'
import { updateUser, fetchFilteredUsers } from '../../actions/user_actions'
import { fetchCurrentUser } from '../../actions/session/session_actions'
import { fetchChannel } from '../../actions/channel_actions'
import Home from './home'

const mapStateToProps = ({session, currentView, errors, entities: {users, filters}}) => ({
    currentUserId: session.id,
    channelId: currentView.channelId,
    users: users,
    displayName: (Object.values(users).filter(user => user.id === session.id)[0]).displayName,
    email:(Object.values(users).filter(user => user.id === session.id)[0]).email,
    errors: errors.user,
    filteredUsers: Object.values(filters)
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    updateUser: (user) => dispatch(updateUser(user)),
    fetchCurrentUser: (user) => dispatch(fetchCurrentUser(user)),
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    fetchFilteredUsers: (users) => dispatch(fetchFilteredUsers(users))

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
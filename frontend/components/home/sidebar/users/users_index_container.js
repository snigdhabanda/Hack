import {connect} from 'react-redux'
import UsersIndex from './users_index'
import {fetchUsers} from '../../../../actions/session/session_actions'


const mapStateToProps = ({entities: {users}}) => ({
    users: users
})

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex)
import {connect} from 'react-redux'
import { logoutUser } from '../../actions/session/session_actions'
import Render from './render'

const mapStateToProps = ({session, entities: {users}}) => ({
    currentUser: users[session.id]
})

// const mapDispatchToProps = dispatch => ({
    
// })

export default connect(mapStateToProps)(Render)
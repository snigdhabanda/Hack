import {connect} from 'react-redux'
import { logoutUser } from '../../actions/session/session_actions'
import Render from './render'

const mapStateToProps = ({session}) => ({
    currentUser: session.id
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps)(Render)
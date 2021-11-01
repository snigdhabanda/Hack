import {connect} from 'react-redux'
import RenderMessages from '../../render/render'

const mapStateToProps = ({session, entities: {users}}) => ({
    currentUser: users[session.id]
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Render)
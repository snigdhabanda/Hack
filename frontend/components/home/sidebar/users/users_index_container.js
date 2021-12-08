import {connect} from 'react-redux'
import UsersIndex from './users_index'


const mapStateToProps = () => ({
    
})

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex)
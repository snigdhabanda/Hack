import {connect} from 'react'
import {Link} from 'react-router-dom'

mapStateToProps = (state) => ({
    user: {
        email: "",
        password: ""
    },
    formType: "Login",
    formInstructions: "Sign into Hack",
    link: <Link to="/starthere" />
})

mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(loginUser(user))
})

export default connect(mapStateToProps)(mapDispatchToProps)(SessionForm)
import {connect} from 'react'
import {Link} from 'react-router-dom'

mapStateToProps = (state) => ({
    user: {
        email: "",
        password: "",
        displayName: ""
    },
    formType: "Sign Up",
    formInstructions: "First, enter your email",
    link: <Link to="login" />
})

mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(signupUser(user))
})

export default connect(mapStateToProps)(mapDispatchToProps)(SessionForm)
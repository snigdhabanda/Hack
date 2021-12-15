import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SessionForm from './session_form'
import React from 'react'
import { signupUser, loginUser } from '../../actions/session/session_actions'
import { withRouter } from "react-router-dom";


const mapStateToProps = (state) => ({
    user: {
        email: "",
        password: "",
        displayName: "",
        imageUrl: "test"
    },
    formType: "Sign Up",
    formInstructions: "First, enter your email",
    link: <Link to="/login">Already using Hack? Login Instead</Link>,
    channelId: state.currentView.channelId,
    currentUser: state.session.id,
    errors: state.errors.session
})

const mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(signupUser(user)),
    loginUser: (user) => dispatch(loginUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm))
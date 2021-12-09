import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SessionForm from './session_form'
import React from 'react'
import { signupUser } from '../../actions/session/session_actions'

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
    currentUser: state.session.id 
})

const mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(signupUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
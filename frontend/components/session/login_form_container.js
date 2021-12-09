import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SessionForm from './session_form'
import React from 'react'
import { loginUser } from '../../actions/session/session_actions'
import { createChannelMember } from '../../actions/channel_member_actions'

const mapStateToProps = (state) => ({
    user: {
        email: "",
        password: ""
    },
    formType: "Login",
    formInstructions: "Sign in to Dinner Party",
    link: <Link to="/starthere">Sign Up Instead</Link>,
    channelId: state.currentView.channelId,
    currentUser: state.session.id 
})

const mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(loginUser(user)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React from 'react'
import { withRouter } from "react-router-dom";
import Welcome from './welcome';
import { loginUser } from '../actions/session/session_actions';


const mapStateToProps = (state) => ({
    signupLink: <Link className="get-started" to="/starthere">Get Started Today</Link>,
    demoLink: <Link to="/login">Try a Demo</Link>,
    currentUser: state.session.id
})

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user))
    
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome))
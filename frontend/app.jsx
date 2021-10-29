import React from 'React'
import {Link} from 'react-router-dom'
import {Route} from 'react-router'
import { Redirect } from 'react-router'

//direct to signup form with a link to login 
const App = () => (
    <div>
        <Route to="/starthere" component={SignUpFormContainer} />
        <Redirect to="/starthere" />
        
        <Route to="/login" component={LoginFormContainer} />
        <Route to="/demo" component={Home} />
        <Link to="/login" />
        <Link to="/demo" />
    </div> 
)
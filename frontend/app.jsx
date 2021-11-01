import {Link} from 'react-router-dom'
import {Route} from 'react-router'
import React from 'react'
import { Redirect } from 'react-router'
import SignUpFormContainer from './components/session/signup_form_container'
import LoginFormContainer from './components/session/login_form_container'
import {AuthRoute, ProtectedRoute} from './util/route_util'
import HomeContainer from './components/home/home_container'
import RenderContainer from './components/render/render_container'

//direct to signup form with a link to login 
class App extends React.Component{

    render(){
        return (
            <div>
                <ProtectedRoute exact path="/home" component={HomeContainer} />
                <AuthRoute exact path="/starthere" component={SignUpFormContainer} />
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                

                <RenderContainer />
                
                
                {/* <Route to="/demo" component={Home} /> */}
                {/* <Link to="/demo" /> */}
            </div> 
        )
    }
}


export default App
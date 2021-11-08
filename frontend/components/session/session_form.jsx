import React from 'react'
// import img from '../../../app/assets/images/slack-logo.png'



class SessionForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.user 

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        
        e.preventDefault()
        this.props.processForm(this.state)
            // if (loginType === 'newUser')

    }

    update(field){
        return (e) => (this.setState({[field]: e.currentTarget.value}))
    }

    render() {
        let signup; 
        if (this.props.formType === "Sign Up") signup = true; 
        else signup = false; 

        return (
            <form >
                <div className="header">
                    <div className="header-nav">
                        <img className="logo" src="https://github.com/snigdhabanda/Hack/blob/actioncables/app/assets/images/slack-logo.png?raw=true" />
                        <h1 className="session-form-title">hack</h1>
                    </div>
                </div>
                    <h2 className="session-form-instructions">{this.props.formInstructions}</h2>
                
                <div className="inputs"> 
                <label className="session-form-email">Email</label>
                    <input className="email-input" type="text" value={this.state.email} onChange={this.update('email')} />
    
                <label className="session-form-password">Password</label>
                    <input className="password-input" type="password" value={this.state.password} onChange={this.update('password')} />

                 
                {signup ? 
                    <div>
                        <label className="session-form-name">Name</label>
                        <input className="name-input" type="displayName" value={this.state.displayName} onChange={this.update('displayName')} />
                    </div>
                : "" }
                
                <button className="session-form-button" type="submit" onClick={this.handleSubmit}>Continue</button>
                {/* <button type="submit" onClick={this.handleSubmit('demo')}>Login As A Demo User</button> */}
                
                {this.props.link}
                </div>
            </form>
        )
    }
}

export default SessionForm



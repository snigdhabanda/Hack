import React from 'react'


class SessionForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.user 
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
        const signup; 
        if (this.props.formType === "Sign Up") signup = true; 
        else signup = false; 

        return (
            <form >
                <h1>Hack</h1>
                    <h2>{this.props.formInstructions}</h2>
    
                <label>Email</label>
                    <input type="text" value={this.state.email} onChange={this.update('email')} />
    
                <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.update('password')} />
                
                {signup ? 
                    <div>
                        <label>Name</label>
                        <input type="displayName" value={this.state.displayName} onChange={this.update('displayName')} />
                    </div>
                : nil }
                
                <button type="submit" onClick={this.handleSubmit('newUser')}>Continue</button>
                {/* <button type="submit" onClick={this.handleSubmit('demo')}>Login As A Demo User</button> */}

                {this.props.link}
            </form>
        )
    }
}

export default SessionForm



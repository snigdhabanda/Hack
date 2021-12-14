import React from 'react'
// import img from '../../../app/assets/images/slack-logo.png'



class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.user 
  
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.props.formType === "Sign Up" && this.state.displayName.length > 0){
            this.state.imageUrl = this.lettersHash[this.state.displayName[0].toLowerCase()]
        }
        this.props.processForm(this.state)
    }

    update(field){
        return (e) => (this.setState({[field]: e.currentTarget.value}))
    }

    loginDemo(e){
        e.preventDefault()
        this.props.loginUser({email: "demouser@yahoo.com", password: "password"}).then(this.props.history.push("/home"))
    }

    render() {
        let signup; 
        if (this.props.formType === "Sign Up") signup = true; 
        else signup = false; 

        return (
            <div>
                <div className="header-nav">
                            <img className="logo" src="https://github.com/snigdhabanda/Hack/blob/actioncables/app/assets/images/slack-logo-dark-purple.png?raw=true" />
                            <h1 className="session-form-title">hack</h1>
                            <div >
                                Get Started Today
                                {this.props.signupLink}
                            </div>
                </div>
                <div className="ad">
                    <h1>Hack is your Social Hub</h1>
                    <p>Personally connect with your favorite artists and icons in one space.</p>
                    <button onClick={this.loginDemo.bind(this)} type="button">Try a Demo</button>
                </div>
                <div className="endorsements">

                </div>
            </div>

        )
    }
}

export default Welcome



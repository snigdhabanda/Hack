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
        this.props.loginUser({email: "demouser@gmail.com", password: "password"}).then(() => this.props.history.push("/home"))
    }

    render() {
        let signup; 
        if (this.props.formType === "Sign Up") signup = true; 
        else signup = false; 

        return (
            <div className="welcome-page">
                <div className="header-nav-welcome">
                            <div className="header-and-logo">
                            <img className="logo-welcome" src="https://github.com/snigdhabanda/Hack/blob/actioncables/app/assets/images/slack-logo-dark-purple.png?raw=true" />
                            <h1 className="session-form-title-welcome">hack</h1>
                            </div>

                            <div className="signup-link">
                               
                                <a className="github-welcome" href="https://github.com/snigdhabanda/Hack" >
                                    <img className="github-img" width="48px" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/github.png?raw=true"></img>
                                </a>
                                <a className="linkedin-welcome" href="https://www.linkedin.com/in/snigdhabanda0/">
                                    <img className="linkedin-img" width="48px" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/linkedin-transparent.png?raw=true" ></img>
                                </a>
                                {this.props.signupLink}
                            
                            </div>
                </div>
                <div className="ad">
                    <h1>Hack is your News + Social Hub</h1>
                    <p>Hear news, announcements, and connect with your favorite icons and artists all in one space.</p>
                    <button className="demo-welcome" onClick={this.loginDemo.bind(this)} type="button">Try a Demo</button>
                </div>
                <img className="hack-screenshot" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/hack_screenshot.png?raw=true" />
                <h3 className="instructions">See who's already signed up today!</h3>
                <div className="endorsements">
                    <img width="160px" className="fauci" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/fauci.png?raw=true"></img>
                    <img width="120px" className="greta" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/greta.png?raw=true"></img>
                    <img width="250px" className="megan" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/meg-stallion.png?raw=true"></img>
                    <img width="120px" className="shonda" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/shonda.png?raw=true"></img>
                    <img width="120px" className="mark" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/mark.png?raw=true"></img>
                </div>
            </div>

        )
    }
}

export default Welcome



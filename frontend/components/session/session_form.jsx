import React from 'react'
// import img from '../../../app/assets/images/slack-logo.png'



class SessionForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.user 

        this.handleSubmit = this.handleSubmit.bind(this)

        this.lettersHash = {
            "a": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_a.png?raw=true",
            "b": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_b.png?raw=true",
            "c": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_c.png?raw=true",
            "d": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_d.png?raw=true",
            "e": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_e.png?raw=true",
            "f": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_f.png?raw=true",
            "g": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_g.png?raw=true",
            "h": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_h.png?raw=true",
            "i": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_i.png?raw=true",
            "j": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_j.png?raw=true",
            "k": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_k.png?raw=true",
            "l": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_l.png?raw=true",
            "m": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_m.png?raw=true",
            "n": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_n.png?raw=true",
            "o": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_o.png?raw=true",
            "p": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_p.png?raw=true",
            "q": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_q.png?raw=true",
            "r": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_r.png?raw=true",
            "s": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_s.png?raw=true",
            "t": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_t.png?raw=true",
            "u": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_u.png?raw=true",
            "v": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_v.png?raw=true",
            "w": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_w.png?raw=true",
            "x": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_x.png?raw=true",
            "y": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_y.png?raw=true",
            "z": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_z.png?raw=true"

        }
    }

    handleSubmit(e){
        
        e.preventDefault()
        this.state.imageUrl = this.lettersHash[this.state.displayName[0].toLowerCase()]
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
            <form className="session-form">
                <div className="header">
                    <div className="header-nav">
                        <img className="logo" src="https://github.com/snigdhabanda/Hack/blob/actioncables/app/assets/images/slack-logo-dark-purple.png?raw=true" />
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



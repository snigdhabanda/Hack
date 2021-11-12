import React from 'react'
// import img from '../../../app/assets/images/slack-logo.png'



class SessionForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.user 

        this.handleSubmit = this.handleSubmit.bind(this)

        this.lettersHash = {
            "a": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_a.png",
            "b": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_b.png",
            "c": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_c.png",
            "d": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_d.png",
            "e": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_e.png",
            "f": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_f.png",
            "g": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_g.png",
            "h": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_h.png",
            "i": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_i.png",
            "j": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_j.png",
            "k": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_k.png",
            "l": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_l.png",
            "m": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_m.png",
            "n": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_n.png",
            "o": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_o.png",
            "p": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_p.png",
            "q": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_q.png",
            "r": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_r.png",
            "s": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_s.png",
            "t": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_t.png",
            "u": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_u.png",
            "v": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_v.png",
            "w": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_w.png",
            "x": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_x.png",
            "y": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_y.png",
            "z": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_z.png"

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



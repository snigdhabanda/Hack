import React from 'react'
import ReactDOM from 'react-dom'
import AddChannelMembersContainer from './add_channel_members_container'


class ChannelForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            channelName: "",
            channelDescription: "",
            showUsers: false,
            submittedMessage: false,
            channelMembers: false}

        this.clickAddPeople = React.createRef();
        this.inputField = React.createRef();
        this.modalDisappear = React.createRef();
        // this.showUsers = this.showUsers.bind(this)
        // this.addPerson = this.addPerson.bind(this)
    }

    // displayMessage(message){
    //     return <RenderMessagesContainer message={message}  />
    // }

    handleSubmit(e){
        e.preventDefault()
        const channel = {
            name: this.state.channelName, 
            description: this.state.channelDescription,
            dm: false
        } 
        this.props.createChannel(channel)
        // this.state.memberIds.unshift(this.props.currentUser)
        // if (this.state.memberIds.length > 2) {
        //     
        this.setState({submittedMessage: true})
       
        // } 
    
    }

    componentDidUpdate(prevProps){
        // console.log("im updating")
        // if (prevProps.currentView !== this.props.currentView){
        //     console.log("view changed")
        // }
        // if (this.state.submittedMessage){
        //     const channel = {
        //         name: this.state.channelName, 
        //         description: this.state.channelDescription
        //     } 
        // this.props.createChannel(channel)
        // this.state.submittedMessage = false; 
        
        // if (this.props.memberIds.length > 1) this.setState({channelMembers: true}) 
        // }
        // console.log(this.state)
    }

    // componentDidUpdate(prevProps){
    //     console.log(Object.values(prevProps.channels)[Object.values(prevProps.channels).length - 1].id)
    //         this.state.memberIds.forEach((id, idx) => {
    //         console.log(this.props.dynamicView)
    //         let channelMember = {
    //             channelId: this.props.dynamicView.channelId,
    //             channelMemberId: id,
    //             creator: false 
    //         }
    //         if (id === this.props.currentUser) {channelMember.creator = true}
    //         this.props.createChannelMember(channelMember)
    //         this.state = {
    //             channelName: "",
    //             channelDescription: "",
    //             memberIds: [],
    //             showUsers: false
    //         }
    //     })
    // }

    

    

    update(field) {
        console.log(field)
        return e =>
          this.setState({ [field]: e.currentTarget.value });
    }

    // showUsers(){
    //     var peopleDiv = this.clickAddPeople.current
    //     console.log(peopleDiv.style)
    //     if (peopleDiv.style.display === "none") {
    //         console.log("working")
    //         peopleDiv.style.display = "block";
    //         this.setState({showUsers: true})
    //     } 

    // }

    addPerson(user){
        this.props.memberIds.push(user.id)
   
    }

    modalDisappears(){
        this.modalDisappear.current.style.display = "none"; 
    }
    
    render() {
        return (
            <form ref={this.modalDisappear} className="new-channel-form" onSubmit={this.handleSubmit.bind(this)} >
                <h2>Create a channel</h2>
                <p>Create a channel to communicate with anyone you're a fan of!</p>
                
                <div className="all-input-tags">
                <div className="name-box">
                <label>Name</label>
                    <input type="text" onChange={this.update('channelName')} />
                </div>
                
                <div className="description-box">
                <label>Description (optional)</label>
                    <input type="text" onChange={this.update('channelDescription')} />
                </div>

                {/* <label>Topic (optional)
                    <input type="text" onChange={this.handleInput('recipientName')} />
                </label> */}
                <div className="add-people-box">
                <label>Add people</label>
                    <div className="all-users">
                        <ul>
                        {Object.values(this.props.users).map((user) => 
                    
                            <li tabindex={`${user.id}`} className="li-tag" ref={this.clickAddPeople} onClick={this.addPerson.bind(this, user)}>{user.displayName}</li>)
                        }
                        </ul>
                    </div>
                </div>
                </div>
                
                
                    {/* <div className="all-users" ref={this.clickAddPeople}>
                        {this.state.showUsers ? Object.values(this.props.users).map((user) => (
                            
                        )) : ""} */}
                    {/* </div> */}
                    {/* <input type="text" className="new-channel-members" ref={this.inputField} onChange={this.showUsers.bind(this)}  /> */}
                    {/* value ={this.state.memberIds.map(id => this.props.users[id].displayName)} */}
                    
                            
                {/* <input className="create" type="submit" /> */}
                <div className="modal-disappear" onClick={this.modalDisappears.bind(this)} >X</div>
                <button className="create" type="submit" >Create</button>

            </form>
        )
    }
}

export default ChannelForm



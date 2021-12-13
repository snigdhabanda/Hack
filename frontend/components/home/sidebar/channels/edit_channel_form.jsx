import React from 'react'
import ReactDOM from 'react-dom'


class EditChannelForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.channel.name,
            topic: this.props.channel.topic,
            description: this.props.channel.description
            }

        this.clickAddPeople = React.createRef();
        this.inputField = React.createRef();
        this.modalDisappear = React.createRef();
        
    }


    handleSubmit(e){
        e.preventDefault()
        const channel = {
            id: this.props.channel.id,
            name: this.state.name, 
            description: this.state.description,
            topic: this.state.topic,
            dm: this.props.channel.dm,
        } 
        this.props.updateChannel(channel)
    
    }

    handleDelete(e){
        e.preventDefault()
        this.props.deleteChannel(this.props.channel.id).then(() => this.props.fetchCurrentUser(this.props.currentUser))
        //need to close modal
    }


    update(field) {
        console.log(field)
        return e =>
          this.setState({ [field]: e.currentTarget.value });
    }

    
    addPerson(user){
        this.props.memberIds.push(user.id)
   
    }

    modalDisappears(){
        this.modalDisappear.current.style.display = "none"; 
    }
    
    render() {
        const {channel, channelMembers, currentUser} = this.props
        return (
            <form ref={this.modalDisappear} className="edit-channel-form" onSubmit={this.handleSubmit.bind(this)} >
                <h2>{`#${channel.name.toLowerCase()} `}</h2>
                
                <div className="all-input-tags">
                <div className="name-box">
                <label>Rename this Channel</label>
                    <input className="name-input" type="text" value={this.state.name} onChange={this.update('name')} />
                </div>
                
                <div className="description-box">
                <label>Edit Description </label>
                    <input className="description-input" type="text" value={this.state.description} onChange={this.update('description')} />
                </div>

                <div className="topic-box">
                <label>Set a Topic </label>
                    <input className="topic-input" type="text" value={this.state.topic} onChange={this.update('topic')} />
                </div>
                
                <button className="delete" type="button" onClick={this.handleDelete.bind(this)}>Delete Channel</button>
                
                {/* {Object.values(channelMembers).filter(
                    channelMember => channelMember.channelId === channel.id 
                    && channelMember.memberId === currentUser)[0].creator ? 
                    <button className="leave" type="button" onClick={this.handleLeave.bind(this)}>Leave Channel</button> : 
                    <button className="delete" type="button" onClick={this.handleDelete.bind(this)}>Delete Channel</button>
                } */}
                
                </div>
                
              
                <div className="modal-disappear" onClick={this.modalDisappears.bind(this)} >X</div>

                <button className="edit" type="submit" >Submit</button>

            </form>
        )
    }
}

export default EditChannelForm



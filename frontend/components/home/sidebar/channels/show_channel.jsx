import React from 'react'
import ReactDOM from 'react-dom'


class ShowChannel extends React.Component {
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


    handleLeave(e){
        e.preventDefault()
        
        let channelMemberId = ((Object.values(this.props.channelMembers).filter(
            channelMember => channelMember.memberId === this.props.currentUser 
            && channelMember.channelId === this.props.currentView)[0]).id)
        
        this.props.leaveChannel(channelMemberId).then(() => this.props.fetchCurrentUser(this.props.currentUser))
    }


    modalDisappears(){
        this.modalDisappear.current.style.display = "none"; 
    }
    
    render() {
        const {channel, channelMembers, users} = this.props
        // console.log(channelMembers, users)
        return (
            <form ref={this.modalDisappear} className="edit-channel-form">
                <h2>{`#${channel.name.toLowerCase()} `}</h2>
                
                <div className="all-input-tags">
                
                <div className="description-box">
                <label className="description-show">Description </label>
                    <div className="description-div">{channel.description ? channel.description : "The moderator has not yet set a description."}</div>
                </div>

                <div className="topic-box">
                <label className="topic-show">Topic </label>
                    <div className="topic-div">{channel.topic ? channel.topic : "The moderator has not yet set a topic."}</div>
                </div>

               
                <label className="members-show">Members</label>
                <div className="all-members">
                   {users.length > 0 && channelMembers.length > 0 ? channelMembers.map((channelMember) => 
                     <div className="members-list-show">
                        <img width="40px" src={(users.filter(user => user.id === channelMember.memberId)[0]).imageUrl}></img>
                        <li className="show-user-name">{(users.filter(user => user.id === channelMember.memberId)[0]).displayName}</li>
                    </div>
                    ) : ""}
                </div>
                </div>
                    
               

                <button className="leave" type="button" onClick={this.handleLeave.bind(this)}>Leave Channel</button> 
        
          
                <div className="modal-disappear" onClick={this.modalDisappears.bind(this)} >X</div>

            </form>
        )
    }
}

export default ShowChannel



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
        this.props.leaveChannel(this.props.channel.id)
    }


    modalDisappears(){
        this.modalDisappear.current.style.display = "none"; 
    }
    
    render() {
        const {channel} = this.props
        return (
            <form ref={this.modalDisappear} className="edit-channel-form"  >
                <h2>{`#${channel.name.toLowerCase()} `}</h2>
                
                <div className="all-input-tags">
                
                <div className="description-box">
                <label>Description </label>
                    <div className="description-input">{channel.description ? channel.description : "The moderator has not yet set a description."}</div>
                </div>

                <div className="topic-box">
                <label>Topic </label>
                    <div className="topic-input">{channel.topic ? channel.topic : "The moderator has not yet set a topic."}</div>
                </div>

                <button className="leave" type="button" onClick={this.handleLeave.bind(this)}>Leave Channel</button> 
            
                </div>
          
                <div className="modal-disappear" onClick={this.modalDisappears.bind(this)} >X</div>

            </form>
        )
    }
}

export default ShowChannel



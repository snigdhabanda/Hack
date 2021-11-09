import React from 'react'
import ChannelsIndexItem from './channels_index_item'
import ChannelFormContainer from './channel_form_container'
import MessagesIndex from '../../messages/messages_index'
import ChatRoom from "../../../../actioncable_app/ChatRoom"


class ChannelsIndex extends React.Component{

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {displayForm: false }
    }
    
    componentDidMount(){
        //create new channel member associations (enrolling a user into existing channels)
        this.props.fetchChannels()
        // .then(() => {
        //     let i = 0; 
        //     while (i < Object.values(this.props.channels).length) {
        //         console.log(Object.values(this.props.channels)[i])
        //         let channelMember = {
        //             channelId: this.props.channels[i].id,
        //             memberId: this.props.currentUser,
        //             creator: false 
        //         }
        //         this.props.createChannelMember(channelMember)
        //         i++
                
        //     }
        // })
    }

    

    handleClick(){
        this.setState({displayForm: true})
    }

    render(){
        const {createMessage, channels, currentView, fetchChannel, getTime, currentUser, messages, users} = this.props
        console.log(currentView)

        return(
            <div className="chat-channels-and-messages">
                {Object.keys(channels).length > 0 ? 
                <div>
                    {currentView ?
                        <ChatRoom createMessage={createMessage} fetchChannel={fetchChannel} currentUser={currentUser} currentView={currentView} getTime={getTime} messages = {Object.values(messages)} users = {users} channels={channels}/>
                        : ""}      
                </div>
                
                : ""}

                {this.state.displayForm ? 
                    <ChannelFormContainer />
                    
                : null}
                {/* <button onClick={this.handleClick}>New Channel</button> */}
            </div>
        )
    }
}

export default ChannelsIndex 
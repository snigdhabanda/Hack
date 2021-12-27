import React from 'react'
import ChannelsIndexItem from './channels_index_item'
import MessagesIndex from '../../messages/messages_index'
import ChatRoom from "../../../../actioncable_app/ChatRoom"



class ChannelsIndex extends React.Component{

    constructor(props){
        super(props)
        this.state = {displayForm: false }
    }
    
    // componentDidMount(){
    //     this.props.fetchCurrentUser(this.props.currentUser).then(() => 
    //     this.props.fetchChannel(this.props.currentView))
       
    // }

    
    render(){

        const { errors, leaveChannel, updateChannel, deleteChannel, channelMembers, dynamicView, removeMessage, createChannel, createChannelMember, createMessage, channels, currentView, fetchChannel, getTime, currentUser, messages, users, fetchCurrentUser} = this.props

        return(
            <div className="chat-channels-and-messages">
                {Object.keys(channels).length > 0 ? 
                <div>
                    {currentView ?
                        <ChatRoom 
                        channelMembers={channelMembers} 
                        leaveChannel={leaveChannel}
                        fetchCurrentUser={fetchCurrentUser} 
                        dynamicView={dynamicView} 
                        createChannelMember={createChannelMember} 
                        deleteMessage = {removeMessage} 
                        createChannel={createChannel} 
                        createMessage={createMessage} 
                        fetchChannel={fetchChannel} 
                        currentUser={currentUser} 
                        currentView={currentView} 
                        deleteChannel={deleteChannel}
                        messages = {Object.values(messages)} users = {users} channels={channels}/>
                        : ""}      
                </div>
                
                : ""}
                
            </div>
        )
    }
}

export default ChannelsIndex 
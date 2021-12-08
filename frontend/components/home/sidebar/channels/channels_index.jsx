import React from 'react'
import ChannelsIndexItem from './channels_index_item'
import MessagesIndex from '../../messages/messages_index'
import ChatRoom from "../../../../actioncable_app/ChatRoom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag} from '@fortawesome/fontawesome-free-solid'


class ChannelsIndex extends React.Component{

    constructor(props){
        super(props)
        this.state = {displayForm: false }
    }
    
    componentDidMount(){
        this.props.fetchChannels()
        
    }

    unsubscribeFromChannel(){
        App.cable.disconnect()
    }

    changeChannel(channelId){
        //unsubscribe from previous channel 
        this.unsubscribeFromChannel()
        //calling RECEIVE_CHANNEL for viewreducer && loading messages
        this.props.fetchChannel(channelId)
    }

    
    render(){

        const {channelMembers, dynamicView, removeMessage, createChannel, createChannelMember, createMessage, channels, currentView, fetchChannel, getTime, currentUser, messages, users} = this.props

        return(

        <div className="chat-channels-and-messages">
                <ul className="channels-list">
            {Object.values(this.props.channels).filter(channel => !channel.dm).map((channel) =>(
              <li className="channel" tabIndex={`${channel.id}`} onClick={this.changeChannel.bind(this, channel.id)}>
                <FontAwesomeIcon className="hashtag" icon={faHashtag} />
                {channel.name}
              </li>
        ))}
        </ul>
        
        <ul className="dms-list">
        <div className="dm-title">Direct Messages</div>
        {Object.values(this.props.channels).filter(channel => channel.dm).map((channel) =>(
              <li className="dm" tabindex={`${channel.id}`} onClick={this.changeChannel.bind(this, channel.id)}>
                {channel.name}
              </li>
            
          ))}
        </ul>








                {/* {Object.keys(channels).length > 0 ? 
                <div>
                    {currentView ?
                        <ChatRoom channelMembers={channelMembers} dynamicView={dynamicView} createChannelMember={createChannelMember} deleteMessage = {removeMessage} createChannel={createChannel} createMessage={createMessage} fetchChannel={fetchChannel} currentUser={currentUser} currentView={currentView} messages = {Object.values(messages)} users = {users} channels={channels}/>
                        : ""}      
                </div>
                
                : ""} */}
                
            </div>
        )
    }
}

export default ChannelsIndex 
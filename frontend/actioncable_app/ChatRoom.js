import React from "react";
import MessageForm from "./MessageForm.js";


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.bottom = React.createRef();
    this.currentUser = this.props.currentUser
    this.channelQueue = []; 
  }
  
  subscribeToChannel() {
    App.cable.subscriptions.create(
      { channel: "ChatChannel",
        id: this.props.currentView
    },
      {
        received: data => {
          switch (data.type) {
            case "message":
              //createmessage: only action creator
              const message = {
                id: data.id,
                body: data.message,
                authorId: data.author_id,
                channelId: data.author_id
                }
                console.log(message)
              this.props.createMessage(message)
              .then(() => 
                this.setState({
                  messages: this.state.messages.concat([message])
                })
              )
               
              
            case "messages":
              this.setState({ messages: data.messages });
              break;
          }
        },
        speak: function(data) {return this.perform("speak", data)},
        load: function() {return this.perform("load")}
      }
    )
    
  }

  unsubscribeFromChannel(){
    App.cable.disconnect()
  }
  
  // loadChat(e) {
  //   e.preventDefault();
  //   App.cable.subscriptions.subscriptions[0].load();
  // }
  
  // componentDidUpdate() {
  //   console.log("componentchanged")
  //   // this.bottom ? this.bottom.current.scrollIntoView() : nil 
  // }

  loadMessages() {
    const messages = Object.values(this.props.messages)
    this.setState({ messages: messages });
  }

  changeChannel(channelId) {
    //unsubscribe from previous channel 
    this.unsubscribeFromChannel()
    //calling RECEIVE_CHANNEL for viewreducer && loading messages
    this.props.fetchChannel(channelId).then(() => this.loadMessages()) 
    // this.loadMessages()
    this.subscribeToChannel()
  }
  
  render() {
    const {users} = this.props.users 
    console.log("rendering")
    if (this.channelQueue.length === 0 || this.channelQueue[this.channelQueue.length - 1] !== this.props.currentView){
      this.channelQueue.push(this.props.currentView)
      this.changeChannel(this.props.currentView)
    }
    console.log(this.state.messages)
    // console.log(this.state.messages[0].authorId)
    const messageList = this.state.messages.map((message, idx) => {
      
      return (
        <li key={message.id}>
          {/* {users[message.authorId].displayName} */}
          {message.body} 
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="chatroom-container">
        <h4>Channels</h4>
        <ul>
          {this.props.channels.map((channel) =>
              <li onClick={this.props.fetchChannel.bind(this, channel.id)}>{channel.name}</li>
          )}
        </ul>

        {/* <button className="load-button" 
          onClick={this.loadChat.bind(this)}>
          Load Chat History
        </button> */}
        {/* <button className="unsubscribe-button" 
          onClick={this.unsubscribeFromChannel.bind(this)}>
          Leave
        </button> */}
        <div className="message-list">{messageList}</div>
        <MessageForm currentUser={this.currentUser} channelId={this.props.currentView}/>
      </div>
    );
  }
}

export default ChatRoom;
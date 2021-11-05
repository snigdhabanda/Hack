import React from "react";
import MessageForm from "./MessageForm.js";


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.bottom = React.createRef();
    this.currentUser = this.props.currentUser
    this.currentView = this.props.currentView
    this.channels = this.props.channels
  }
  
  componentDidMount() {
    console.log("cdm")
    App.cable.subscriptions.create(
      { channel: "ChatChannel",
        id: this.currentView
    },
      {
        received: data => {
          switch (data.type) {
            case "message":
              this.setState({
                messages: this.state.messages.concat(data.message)
              });
              break;
            case "messages":
              this.setState({ messages: data.messages });
              break;
          }
        },
        speak: function(data) {return this.perform("speak", data)},
        load: function() {return this.perform("load")},
        // unsubscribed: function() {return this.perform("unsubscribed")}
      }
    )
    
  }
  unsubscribeFromChannel(){
    App.cable.disconnect()
  }
  
  loadChat(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].load();
  }
  
  componentDidUpdate() {
    console.log("componentchanged")
    // this.bottom ? this.bottom.current.scrollIntoView() : nil 
  }

  changeChannel(channelId) {
    this.props.fetchChannel(channelId)
      
  }
  
  render() {
    // console.log(this.currentView)
    // console.log(this.state.messages)
    const messageList = this.state.messages.map((message, idx) => {
      console.log(message)
      return (
        <li key={message.id}>
          {message} 
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="chatroom-container">
        <h4>Channels</h4>
        <ul>
          {this.channels.map((channel) =>
              <li onClick={this.changeChannel.bind(this, channel.id)}>{channel.name}</li>
          )}
        </ul>

        <button className="load-button" 
          onClick={this.loadChat.bind(this)}>
          Load Chat History
        </button>
        <button className="unsubscribe-button" 
          onClick={this.unsubscribeFromChannel.bind(this)}>
          Leave
        </button>
        <div className="message-list">{messageList}</div>
        <MessageForm currentUser={this.currentUser} channelId={this.currentView}/>
      </div>
    );
  }
}

export default ChatRoom;
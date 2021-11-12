# README

## What is Hack?
Our favorite live events such as shows, interviews, and concerts have dwindled during the pandemic. Hack (a social rendition of Slack, the workplace messaging app) is now making connections with your favorite social figures possible. With Hack, you can chat with any social icons about their art and content. Log in now to the Dinner Party workspace to meet your favorites! 

## Technologies used 
 * Ruby on Rails back-end
 * PostgreSQL database
 * React/Redux front-end
 * HTML5/CSS/SCSS

## Features 
### Live Messaging 
* The client-server connection for live messaging was created using Websockets via Rails Action Cables
* When you click a channel or direct message, a connection is instantiated between you and the server and you are subscribed to the respective stream (a channel or a direct message). Another user subscribed on the same stream (the equivalent or a channel or direct message) can send messages your way, and they will be rendered in real time. 
* The code below unsubscribes you from a stream when you toggle between channels/dms and initiates a new connection. You can also reply to a message or delete a message through the web socket implementation.

Submitting a message will invoke the speak function with relevant message params in the channel subscription method.  

``` javascript
class MessageForm extends React.Component {

handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body, id: this.props.currentUser, channelId: this.props.channelId});
    this.setState({ body: "" });
  }
}
```
When the speak function is invoked from message submission, the speak function on the backend in the ChatChannel (which derives from Ruby's Application Cables) is invoked with relevant params. 
``` javascript
class ChatRoom extends React.Component{
subscribeToChannel() {
    App.cable.subscriptions.create(
      { channel: "ChatChannel",
        id: this.props.currentView
    },
      {
        received: data => {
          switch(data.type){
          case ("createMessage"):
            const message = {
              id: data.id,
              body: data.message,
              authorId: data.author_id,
              channelId: data.channel_id,
              createdAt: data.created_at  
              }
              this.props.createMessage(message) 
              this.setState({
                messages: this.props.messages
              });
          case ("deleteMessage"):
              this.props.deleteMessage(data.message)
              this.setState({
                messages: this.props.messages
              });
          }
    },
    speak: function(data) {return this.perform("speak", data)},
        update: function(data) {return this.perform("update", data)},
        delete: function(data) {return this.perform("delete", data)},
        reply: function(data) {return this.perform("reply", data)}
        }
    )
    
  }
```
When the speak function successfully saves a message, it broadcasts data to a socket within the subscribed stream. Data is received and subsequently maniupulated in the subscription method above. 

```ruby
class ChatChannel < ApplicationCable::Channel
  def subscribed
    # dynamically subscribing to a channel
    @channel = Channel.find(params[:id])
    stream_for @channel
  end

  def speak(data)
    #saving a message with params and broadcasting to a socket
    message = Message.new(body: data['message'], author_id: data['id'], channel_id: data['channelId'])
    if message.save
      socket = { message: message.body, type: 'createMessage', id: message.id, author_id: message.author_id, channel_id: message.channel_id, created_at: message.created_at}
      ChatChannel.broadcast_to(@channel, socket)
    end
  end

  def reply(data)
    message = Message.new(body: data['message'], author_id: data['id'], channel_id: data['channelId'], parent_message_id: data['parentMessageId'])
    if message.save
      socket = { message: message.body, type: 'replyMessage', id: message.id, author_id: message.author_id, channel_id: message.channel_id, created_at: message.created_at, parent_message_id: message.parent_message_id}
      ChatChannel.broadcast_to(@channel, socket)
    end
  end
```

### Threads
* Threads allow a user to reply to a message on the main chat channel. When the local state updates in the ChatRoom to “replying” upon a click, the Thread component is rendered. 
* The Thread component renders a ReplyMessageForm component that invokes the Action Cable “reply” function and saves the reply on the backend. When the ChatRoom’s message props update, the component rerenders with relevant messages.

```javascript
class ChatRoom extends React.Component{
{this.state.replying || this.state.threadMessages.length > 0 ? 
        <div className="thread">
            <Thread users={this.props.users} currentUser={this.props.currentUser} channels={this.props.channels} channelId={this.props.currentView} threadMessages={this.state.threadMessages} message={this.replyMessage} messages={this.props.messages}/>
            {this.state.threadMessages = []}
            {this.state.replying = false}
            
        </div> : ""
  }
}
```

```javascript 
class Thread extends React.Component {
render() {

        const messageList = this.state.messages.length > 0 ? this.state.messages.reverse().map((message, idx) => {
            let timeStampArray = new Date(`${message.createdAt}`).toLocaleString().split(" ")
            let timestamp = timeStampArray[1].slice(0,timeStampArray[1].length - 3) + " " + timeStampArray[2].toLowerCase()
        
        return (   
            <li className="message-box" key={message.id}>
                <div className="message-author">{this.props.users[message.authorId].displayName}
                        <p className="message-time">{timestamp}</p>
                </div>
                <p className="message-content">{message.body}</p>
            </li>)
        }) : ""
        return (
        <div ref={this.closeThread} className="thread-container">
            <div className="thread-name">{`Thread #${this.props.channels[this.props.channelId].name.toLowerCase()}`}</div>
            
            <div className="message-list" >{messageList}</div>
            <ReplyMessageForm currentUser={this.props.currentUser} parentMessageId={this.props.message.id} channelId={this.props.channelId}/>
            <button className="close-thread" onClick={this.modalDisappears.bind(this)}>X</button>
        </div>
        )
  }
}
}

```


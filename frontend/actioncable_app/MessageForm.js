import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
    this.currentUser = this.props.currentUser
    
  }
  
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body, id: this.currentUser, channelId: this.props.channelId});
    this.setState({ body: "" });
    console.log(this.state)
  }
  
  render() {
    return (
      <div className="send-message">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="message-form"
            type="text"
            value={this.state.body}
            onChange={this.update("body")}
            placeholder={`Send a message to #${this.props.channels[this.props.channelId].name.toLowerCase()}`}
          />
          <input class="message-buton" type="submit" />
          
        </form>
      </div>
    );
  }
}

export default MessageForm;
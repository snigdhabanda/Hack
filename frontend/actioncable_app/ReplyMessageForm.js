import React from "react";

class ReplyMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
    
  }
  
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({body: "" });
    App.cable.subscriptions.subscriptions[0].reply({ message: this.state.body, id: this.props.currentUser, channelId: this.props.channelId, parentMessageId: this.props.parentMessageId});
    
  }
  
  render() {
    return (
    <div className="reply-message">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="message-form"
            type="text"
            onChange={this.update("body")}
            placeholder="Reply..."
          />
          <input className="message-buton" type="submit" />
          
        </form>
    </div>
    );
  }
}

export default ReplyMessageForm;


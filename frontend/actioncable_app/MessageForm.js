import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
    this.currentUser = this.props.currentUser
    this.channelId = this.props.channelId

  }
  
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body, id: this.currentUser, channelId: this.channelId});
    this.setState({ body: "" });
    console.log(this.state)
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.body}
            onChange={this.update("body")}
            placeholder="Type message here"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default MessageForm;
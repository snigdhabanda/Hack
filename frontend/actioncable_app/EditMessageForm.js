import React from "react";

class EditMessageForm extends React.Component {
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
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body, id: this.props.currentUser, channelId: this.props.channelId});
    this.setState({ body: "" });
    console.log(this.state)
  }
  
  render() {
    return (
      <div className="edit-message">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="edit-message-form"
            type="text"
            value={this.props.message.body}
            onChange={this.update("body")}
          />
          <input className="edit-message-buton" type="submit" />
        </form>
      </div>
    );
  }
}

export default EditMessageForm;
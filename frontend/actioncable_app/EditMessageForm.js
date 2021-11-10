import React from "react";

class EditMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: `${this.props.message.body}` };
    
  }
  
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log("submitting")
    App.cable.subscriptions.subscriptions[0].update({ id: this.props.message.id, message: this.state.body, authorId: this.props.currentUser, channelId: this.props.channelId});
    this.setState({ body: "" });
  }
  
  render() {
      console.log("in editing form")
    return (
      <div className="edit-message">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="edit-message-form"
            type="text"
            value={this.state.body}
            onChange={this.update("body")}
          />
          <input className="edit-message-buton" type="submit" />
        </form>
      </div>
    );
  }
}

export default EditMessageForm;
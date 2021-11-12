import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/fontawesome-free-solid'

class MessageForm extends React.Component {
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
          <button className="message-button" type="submit">
          <FontAwesomeIcon className="paper-plane-icon" icon={faPaperPlane} />
          </button>
          
        </form>
      </div>
    );
  }
}

export default MessageForm;
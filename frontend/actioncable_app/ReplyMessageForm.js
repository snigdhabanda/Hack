import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/fontawesome-free-solid'

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
          <button className="reply-message-button" type="submit">
            <FontAwesomeIcon className="paper-plane-icon" icon={faPaperPlane} />
          </button>
          
        </form>
    </div>
    );
  }
}

export default ReplyMessageForm;


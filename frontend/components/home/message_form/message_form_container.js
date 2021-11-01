import {connect} from 'react-redux'
import MessageForm from './message_form'
import { writeMessage } from '../../../actions/messages_actions'

const mapStateToProps = (state) => ({
    message: {
        body: "",
        authorId: state.session.id,
        recipientId: undefined
    },
    users: state.users

})

const mapDispatchToProps = (dispatch) => ({
    submitMessage: (message) => dispatch(writeMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
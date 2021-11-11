import {connect} from 'react-redux'
import MessageForm from './message_form'
import { createMessage } from '../../../actions/messages_actions'

const mapStateToProps = (state) => ({
    message: {
        body: "",
        authorId: state.session.id,
        recipientId: undefined
    },
    users: state.entities.users

})

const mapDispatchToProps = (dispatch) => ({
    submitMessage: (message) => dispatch(createMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
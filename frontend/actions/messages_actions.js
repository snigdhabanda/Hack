import * as MessageApiUtil from './../util/message_api_util'

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES"
export const UPDATE_MESSAGE = "UPDATE_MESSAGE"
export const DELETE_MESSAGE = "DELETE_MESSAGE"
export const NEW_MESSAGE = "NEW_MESSAGE"

const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages
})

const changeMessage = (message) => ({
    type: UPDATE_MESSAGE,
    message 
})

const removeMessage = (message) => ({
    type: DELETE_MESSAGE,
    message
})

const newMessage = (message) => ({
    type: NEW_MESSAGE,
    message
})

export const fetchMessages = () => dispatch => (
    MessageApiUtil.fetchMessages().then(
        (messages) => dispatch(receiveMessages(messages)))
)

export const updateMessage = (message) => dispatch => (
    MessageApiUtil.updateMessage(message).then(
        (message) => dispatch(changeMessage(message)))
)

export const writeMessage = (message) => dispatch => (
    MessageApiUtil.createMessage(message).then(
        (message) => dispatch(newMessage(message)))
)

export const deleteMessage = (messageId) => dispatch => (
    MessageApiUtil.deleteMessage(messageId).then(
        (message) => dispatch(removeMessage(message)))
)
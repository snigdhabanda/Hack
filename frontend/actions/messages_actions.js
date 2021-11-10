import * as MessageApiUtil from './../util/message_api_util'
import { receiveErrors } from './session/session_actions'

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES"
export const UPDATE_MESSAGE = "UPDATE_MESSAGE"
export const DELETE_MESSAGE = "DELETE_MESSAGE"
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const RECEIVE_TIME = "RECEIVE_TIME"

const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages
})

const changeMessage = (message) => ({
    type: UPDATE_MESSAGE,
    message 
})

export const removeMessage = (message) => ({
    type: DELETE_MESSAGE,
    message
})

// const receiveMessage = (message) => ({
//     type: RECEIVE_MESSAGE,
//     message
// })

export const createMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message
})

// export const receiveTime = () => ({
//     type: RECEIVE_TIME
// })


export const fetchMessages = () => dispatch => (
    MessageApiUtil.fetchMessages().then(
        (messages) => dispatch(receiveMessages(messages)))
)

export const updateMessage = (message) => dispatch => (
    MessageApiUtil.updateMessage(message).then(
        (message) => dispatch(changeMessage(message)))
)

export const getTime = (messageId) => dispatch => (
    MessageApiUtil.getTime(messageId).then(
        () => dispatch(receiveTime()))
)


export const deleteMessage = (messageId) => dispatch => (
    MessageApiUtil.deleteMessage(messageId).then(
        (message) => dispatch(removeMessage(message)))
)


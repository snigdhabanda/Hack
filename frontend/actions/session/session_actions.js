import * as SessionApiUtil from '../../util/session_api_util'

export const RECEIVE_USERS = "RECEIVE_USERS"
export const RECEIVE_USER = "RECEIVE_USER"
export const REMOVE_USER = "REMOVE_USER"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user, 
    channels 
})

export const removeUser = (user) => ({
    type: REMOVE_USER,
    user
})

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const receiveErrors = (errs) => ({
    type: RECEIVE_ERRORS,
    errs 
})

export const signupUser = (user) => dispatch => (
    SessionApiUtil.signupUser(user).then(
        (user) => dispatch(receiveUser(user)),
        (errs) => dispatch(receiveErrors(errs.responseJSON))
    )
)


export const loginUser = (user) => dispatch => (
    SessionApiUtil.loginUser(user).then(
        (user) => dispatch(receiveUser(user)),
        (errs) => dispatch(receiveErrors(errs.responseJSON))
    )
)

export const logoutUser = () => dispatch => (
    SessionApiUtil.logoutUser().then(
        (user) => dispatch(removeUser(user))
    )
)

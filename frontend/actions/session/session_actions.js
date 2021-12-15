import * as SessionApiUtil from '../../util/session_api_util'
import * as UserApiUtil from "../../util/user_api_util"
export const RECEIVE_USERS = "RECEIVE_USERS"
export const RECEIVE_USER = "RECEIVE_USER"
export const REMOVE_USER = "REMOVE_USER"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const removeUser = (user) => ({
    type: REMOVE_USER,
    user
})

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const signupUser = (user) => dispatch => (
    SessionApiUtil.signupUser(user).then(
        (user) => dispatch(receiveUser(user)),
        (errs) => dispatch(receiveErrors(errs.responseJSON))
    )
)

export const fetchUsers = () => dispatch => (
    SessionApiUtil.fetchUsers().then(
        (users) => dispatch(receiveUsers(users)),
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

export const fetchCurrentUser = (userId) => dispatch => (
    UserApiUtil.fetchCurrentUser(userId).then (
        (user) => dispatch(receiveUser(user))
    )
)

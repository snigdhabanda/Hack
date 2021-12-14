
import * as UserApiUtil from "../util/user_api_util"
import * as Session from "../actions/session/session_actions"
export const RECEIVE_FILTERED_USERS = "RECEIVE_FILTERED_USERS"
export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER"
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS"

export const receiveFilteredUsers = (users) => ({
    type: RECEIVE_FILTERED_USERS,
    filters: users
})

export const receiveUpdatedUser = (user) => ({
    type: RECEIVE_UPDATED_USER,
    user
})

export const receiveUserErrors = (errors) => ({
    type: RECEIVE_USER_ERRORS,
    errors
})

export const fetchFilteredUsers = (search) => dispatch => (
    UserApiUtil.fetchFilteredUsers(search).then(
        (users) => dispatch(receiveFilteredUsers(users))
    )
)

export const updateUser = (user) => dispatch => (
    UserApiUtil.updateUser(user).then(
        (user) => dispatch(Session.receiveUser(user)),
        (errors) => dispatch(receiveUserErrors(errors))
    )
)
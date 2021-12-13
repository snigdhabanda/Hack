
import * as UserApiUtil from "../util/user_api_util"
export const RECEIVE_FILTERED_USERS = "RECEIVE_FILTERED_USERS"

export const receiveFilteredUsers = (users) => ({
    type: RECEIVE_FILTERED_USERS,
    filters: users
})

export const fetchFilteredUsers = (search) => dispatch => (
    UserApiUtil.fetchFilteredUsers(search).then(
        (users) => dispatch(receiveFilteredUsers(users))
    )
)
import * as UserApiUtil from '../../util/user_api_util'
import { receiveErrors, receiveUser } from "./session_actions"


export const fetchUser = (user) => dispatch => ({
    UserApiUtil.fetchUser(user).then(
        (user) => dispatch(receiveUser(user)),
        (err) => dispatch(receiveErrors(err.responseJSON))
    )

})
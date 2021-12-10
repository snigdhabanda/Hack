import * as ChannelMemberApiUtil from './../util/channel_member_api_util'
import { receiveErrors } from './session/session_actions'
export const RECEIVE_CHANNEL_MEMBER = "RECEIVE_CHANNEL_MEMBER"
export const RECEIVE_CHANNEL_MEMBER_ERRORS = "RECEIVE_CHANNEL_MEMBER_ERRORS"

const receiveChannelMember = (channelMember) => ({
    type: RECEIVE_CHANNEL_MEMBER,
    channelMember
})

const receiveChannelMemberErrors = (errors) => ({
    type: RECEIVE_CHANNEL_MEMBER_ERRORS,
    errors
})

export const createChannelMember = (channelMember) => dispatch => (
    ChannelMemberApiUtil.createChannelMember(channelMember).then(
        (channelMember) => dispatch(receiveChannelMember(channelMember)),
        (errs) => dispatch(receiveChannelMemberErrors(errs))
))
import * as ChannelMemberApiUtil from './../util/channel_member_api_util'
export const RECEIVE_CHANNEL_MEMBER = "RECEIVE_CHANNEL_MEMBER"



const receiveChannelMember = (channelMember) => ({
    type: RECEIVE_CHANNEL_MEMBER,
    channelMember
})

export const createChannelMember = (channelMember) => (
    ChannelMemberApiUtil.createChannelMember(channelMember)
)
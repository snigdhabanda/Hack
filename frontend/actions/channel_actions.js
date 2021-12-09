import * as ChannelApiUtil from './../util/channel_api_util'

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS"
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL"
export const UPDATE_CHANNEL = "UPDATE_CHANNEL"
export const DELETE_CHANNEL = "DELETE_CHANNEL"
export const NEW_CHANNEL = "NEW_CHANNEL"

// const receiveChannels = (channels) => ({
//     type: RECEIVE_CHANNELS,
//     channels: channels
// })

const receiveChannel = ({channel, channelMembers, messages}) => ({
    type: RECEIVE_CHANNEL,
    channel,
    channelMembers,
    messages 
})

const newChannel = ({channel, channelMembers, messages}) => ({
    type: NEW_CHANNEL,
    channel,
    channelMembers,
    messages 
})

const changeChannel = (channel) => ({
    type: UPDATE_CHANNEL,
    channel 
})

const removeChannel = (channel) => ({
    type: DELETE_CHANNEL,
    channel
})

export const fetchChannels = () => dispatch => (
    ChannelApiUtil.fetchChannels().then(
        (channels) => dispatch(receiveChannels(channels))
    )
)

export const fetchChannel = (channelId) => dispatch => (
    ChannelApiUtil.fetchChannel(channelId).then(
        (payload) => dispatch(receiveChannel(payload))
    )
)

export const updateChannel = (channel) => dispatch => (
    ChannelApiUtil.updateChannel(channel).then(
        (channel) => dispatch(changeChannel(channel)))
)

export const createChannel = (channel) => dispatch => (
    ChannelApiUtil.createChannel(channel).then(
        (channel) => dispatch(receiveChannel(channel)))
)

export const deleteChannel = (channelId) => dispatch => (
    ChannelApiUtil.deleteChannel(channelId).then(
        (channel) => dispatch(removeChannel(channel)))
)
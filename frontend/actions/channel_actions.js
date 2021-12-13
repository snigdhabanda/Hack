import * as ChannelApiUtil from './../util/channel_api_util'

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS"
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL"
export const UPDATE_CHANNEL = "UPDATE_CHANNEL"
export const DELETE_CHANNEL = "DELETE_CHANNEL"
export const NEW_CHANNEL = "NEW_CHANNEL"
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS"

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


const removeChannel = (channel) => ({
    type: DELETE_CHANNEL,
    channel
})

const receiveChannelErrors = (errors) => ({
    type: RECEIVE_CHANNEL_ERRORS,
    errors
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
        (channel) => dispatch(receiveChannel(channel)),
        (errs) => dispatch(receiveChannelErrors(errs.responseJSON)))
)

export const createChannel = (channel) => dispatch => (
    ChannelApiUtil.createChannel(channel).then(
        (channel) => dispatch(receiveChannel(channel)),
        (errs) => dispatch(receiveChannelErrors(errs.responseJSON)))
)

export const deleteChannel = (channelId) => dispatch => (
    ChannelApiUtil.deleteChannel(channelId).then(
        (channel) => dispatch(removeChannel(channel)))
)


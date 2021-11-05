import snakeize from "snakeize"


export const fetchChannels = () => (
    $.ajax({
        method: "GET",
        url: `/api/channels`
        
    })
)

export const fetchChannel = (channelId) => (
    $.ajax({
        method: "GET",
        url: `/api/channels/${channelId}`,
        
    })
)

export const updateChannel = (channel) => (
    $.ajax({
        method: "PATCH",
        url: `/api/channels/${channel.id}`,
        data: snakeize({channel})
        
    })
)

export const createChannel = (channel) => (
    $.ajax({
        method: "POST",
        url: `/api/channels`,
        data: snakeize({channel})
        
    })
)

export const deleteChannel = (channelId) => (
    $.ajax({
        method: "DELETE",
        url: `/api/channels/${channelId}`,
        
    })
)
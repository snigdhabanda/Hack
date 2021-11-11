import snakeize from 'snakeize'

export const createChannelMember = (channelMember) => (
    $.ajax({
        method: "POST",
        url: `/api/channel_members`,
        data: snakeize({channelMember})
        
    })
)
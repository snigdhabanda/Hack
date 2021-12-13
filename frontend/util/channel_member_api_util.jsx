import snakeize from 'snakeize'

export const createChannelMember = (channelMember) => (
    $.ajax({
        method: "POST",
        url: `/api/channel_members`,
        data: snakeize({channelMember})
        
    })
)

export const deleteChannelMember = (channelMemberId) => (
    $.ajax({
        method: "DELETE",
        url: `/api/channel_members/${channelMemberId}`
       
    })
)
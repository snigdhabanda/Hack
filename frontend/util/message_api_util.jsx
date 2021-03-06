import snakeize from "snakeize"

export const fetchMessages = () => (
    $.ajax({
        method: "GET",
        url: `/api/messages`
        
    })
)

export const updateMessage = (message) => (
    $.ajax({
        method: "PATCH",
        url: `/api/messages/${message.id}`,
        data: snakeize({message})
        
    })
)

export const createMessage = (message) => (
    $.ajax({
        method: "POST",
        url: `/api/messages`,
        data: snakeize({message})
        
    })
)

export const deleteMessage = (messageId) => (
    $.ajax({
        method: "DELETE",
        url: `/api/messages/${messageId}`,
        
    })
)

export const getTime = (messageId) => (
    $.ajax({
        method: "GET",
        url: `/messages/${messageId}`,
    })
)


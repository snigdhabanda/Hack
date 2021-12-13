import snakeize from 'snakeize'

export const fetchCurrentUser = (userId) => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}`,
    })
)

export const fetchFilteredUsers = (search) => (
    $.ajax({
        method: "GET",
        url: `/api/users`,
        data: snakeize({search})
    })
)
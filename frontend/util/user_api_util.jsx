import snakeize from 'snakeize'

export const fetchCurrentUser = (userId) => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}`,
    })
)

export const updateUser = (user) => (
    $.ajax({
        method: "PATCH",
        url: `/api/users/${user.id}`,
        data: snakeize({user})
    })
)

export const fetchFilteredUsers = (search) => (
    $.ajax({
        method: "GET",
        url: `/api/users`,
        data: snakeize({search})
    })
)

import snakeize from 'snakeize'

export const loginUser = (user) => (
    $.ajax({
        method: "POST",
        url: `/api/session`,
        data: snakeize({user})
    })
)

export const signupUser = (user) => (
    $.ajax({
        method: "POST",
        url: "/api/users",
        data: snakeize({user})
    })
)

export const logoutUser = () => (
    $.ajax({
        method: "DELETE",
        url: `/api/session`
    })
)

export const fetchUsers = () => (
    $.ajax({
        method: "GET",
        url: `/api/users`
    })
)
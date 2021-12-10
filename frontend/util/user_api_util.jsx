
export const fetchCurrentUser = (userId) => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}`,
    })
)
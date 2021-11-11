
export const fetchUser = (user) => (
    $.ajax({
        method: "DELETE",
        url: `/api/session`,
        data: `user`
    })
)
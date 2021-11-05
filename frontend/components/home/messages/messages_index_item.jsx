import React from 'react'

const MessagesIndexItem = ({message}) => (
    <div>
        {message.authorId}
        {message.body}
    </div>
    
)

export default MessagesIndexItem
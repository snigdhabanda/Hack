import React from 'react'
const ChannelsIndex = (props) => (
    <div>
        <h2>Channels</h2>
        <ul>
            {props.channels.map((channel) => (
                <ChannelIndexItem key={channel.id} name={channel}/>
            ))}
        </ul>
    </div>
)

export default ChannelsIndex 
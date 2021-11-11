import React from 'react'

class ChannelsIndexItem extends React.Component {
    constructor(props){
        super(props)
        this.changeChannel = this.changeChannel.bind(this)
        
    }
    
    changeChannel(){
        this.props.fetchChannel(this.props.channel.id)
        
    }

    render(){
        console.log("indexitem")
        const {channel} = this.props
        return(
            <div>
                {channel ?  
                    <li onClick={this.changeChannel}>{channel.name}</li> 
                : ""
                }
            </div>

        )
    }
    
}

export default ChannelsIndexItem
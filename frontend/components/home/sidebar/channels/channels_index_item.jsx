import React from 'react'

class ChannelsIndexItem extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        e.preventDefault()
        this.props.fetchMessages(this.props.channel.id)

    }

    render(){
        return (
            <li>
            <div onClick={this.handleClick}>{this.props.channel.name}</div>
            </li>
        )
    }
   
}

export default ChannelsIndexItem
import React from 'react'
import MessagesIndexItem from './messages_index_item.jsx'

class MessagesIndex extends React.Component {
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        this.props.fetchChannel(this.props.currentView.channelId)
        
    }

    // componentDidUpdate(){
    //     this.props.fetchChannel(this.props.currentView.channelId)
    // }

    render(){
        const {currentView, messages} = this.props
        return (
            <div> 
                {currentView && Object.values(messages).length > 0 ? 
                Object.values(messages).map((message) => 
                        <MessagesIndexItem message={message}/>)
                 : null}

            </div>
        )
    }
    
}

export default MessagesIndex



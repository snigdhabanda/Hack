import React from 'react'
import ReactDOM from 'react-dom'


class AddChannelMembers extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.memberIds.push(this.props.currentUser)
        let uniqueIds = [...new Set(this.props.memberIds)];
        console.log(uniqueIds)
        uniqueIds.forEach((id, idx) => {
            let channelMember = {
                channelId: this.props.currentView,
                memberId: id,
                creator: false 
            }
            uniqueIds.pop()
            if (id === this.props.currentUser) 
            {channelMember.creator = true}
            console.log("creating")
            this.props.createChannelMember(channelMember)
            
        })
    
        
}


    render(){
        return (
            <div className="adding-channel-members"></div>
        )
        
        // 
    }
}

export default AddChannelMembers

import React from 'react'
import ReactDOM from 'react-dom'


class AddChannelMembers extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.memberIds.push(this.props.currentUser)
        let uniqueIds = [...new Set(this.props.memberIds)];
        let channelMembers = [];
        uniqueIds.forEach((id, idx) => {
            let channelMember = {
                channelId: this.props.currentView,
                memberId: id,
                creator: false 
            }
            if (id === this.props.currentUser) 
            {channelMember.creator = true}
            // if ((this.props.channelMembers.filter(channelMember => 
            //     channelMember.channelId === this.props.currentView && channelMember.memberId === this.props.currentUser)).length === 0)
               {this.props.createChannelMember(channelMember)}
            }
            
            
        )}
    
        



    render(){
        return (
            <div className="adding-channel-members"></div>
        )
        
        // 
    }
}

export default AddChannelMembers

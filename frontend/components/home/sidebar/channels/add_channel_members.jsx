import React from 'react'
import ReactDOM from 'react-dom'


class AddChannelMembers extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){

        console.log(this.props.memberIds)
        if (this.props.memberIds.length > 0){
        this.props.memberIds.push(this.props.currentUser)
        let uniqueIds = [...new Set(this.props.memberIds)];
        uniqueIds.forEach((id, idx) => {
            let channelMember = {
                channelId: this.props.currentView,
                memberId: id,
                creator: false 
            }
            if (id === this.props.currentUser) {channelMember.creator = true}
            console.log(channelMember)
            this.props.createChannelMember(channelMember)
            
        })
    }
        
}


    render(){
        console.log(this.props)
        return (
            <div className="adding-channel-members"></div>
        )
        
        // 
    }
}

export default AddChannelMembers

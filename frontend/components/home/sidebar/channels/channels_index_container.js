import {connect} from 'react-redux'

mapStateToProps = (state) => ({
    channels: state.channels 
})

export default connect(mapStateToProps)(ChannelsIndex)
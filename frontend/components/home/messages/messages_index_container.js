import {connect} from 'react-redux'
import MessagesIndex from './messages_index'

const mapStateToProps = ({currentView}) => ({
    currentViewId: currentView.channelId ? currentView.channelId : currentView.dmId

})

const mapDispatchToProps = (dispatch) => ({
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId))
})

// export default connect(mapStateToProps, mapDispatchToProps)(MessagesIndex)
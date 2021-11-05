import React from 'react'


class UsersIndex extends React.Component {
   constructor(props){
      super(props)
   }

   componentDidMount(){
       this.props.fetchUsers()
   }

   render(){
    const {users} = this.props
      return (
         <div>
            <h4>Members</h4>
             {Object.keys(users).length > 0 ? 
             Object.values(users).map((user) => (
                <li>{user.displayName}</li> 
             ))
                :
             ""}
         </div>
      )
   }
} 

export default UsersIndex; 
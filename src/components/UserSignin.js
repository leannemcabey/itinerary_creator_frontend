// import React, { Component } from 'react'
// import { withRouter, Redirect } from "react-router-dom"
// import MasterContainer from '../containers/MasterContainer'
//
// class User extends Component {
//
//   state = {
//     name: '',
//     user: null,
//   }
//
//   findOrCreateUser = (event, name) => {
//     event.preventDefault()
//     fetch('http://localhost:3000/api/v1/users')
//     .then( r => r.json() )
//     .then( users => {
//       let user = users.find(user => user.name === name)
//       if (user) {
//         this.setState({user})
//       }
//       else {
//         fetch('http://localhost:3000/api/v1/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           },
//           body: JSON.stringify({
//             name: name
//           })
//         })
//         .then(r => r.json())
//         .then(user => this.setState({user}))
//       }
//     })
//   }
//
//   handleChange = (event) => {
//     this.setState({
//       name: event.target.value
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         {this.props.user ? <Redirect to="/home" render={() => <MasterContainer user={this.state.user}/>} /> :
//         <form onSubmit={(event) => this.findOrCreateUser(event, this.state.name)}>
//           <h1>Sign In</h1>
//           Name:<input onChange={this.handleChange} value={this.state.name}></input>
//           <button type='submit'>Submit</button>
//         </form>}
//       </div>
//     )
//   }
// }
//
// export default User

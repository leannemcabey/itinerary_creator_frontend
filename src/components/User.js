import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

class User extends Component {

  state = {
    name: ''
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div>
        {this.props.user ? <Redirect to="/create" /> :
        <form onSubmit={(event) => this.props.findOrCreateUser(event, this.state.name)}>
          <h1>Sign In</h1>
          Name:<input onChange={this.handleChange} value={this.state.name}></input>
          <button type='submit'>Submit</button>
        </form>}
      </div>
    )
  }
}

export default User

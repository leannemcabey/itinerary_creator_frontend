import React, { Component } from 'react'

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
        <h1>Sign In</h1>
        <form onSubmit={(event) => this.props.findOrCreateUser(event, this.state.name)}>
          Name:<input onChange={this.handleChange} value={this.state.name}></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default User

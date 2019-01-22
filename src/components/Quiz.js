import React, { Component } from 'react';

class Quiz extends Component {
  state = {
    user_id: null,
    title: null,
    start: null,
    end: null, 
    city: null, 
    state: null, 
    budget: '1'
  }

componentDidMount(){
  fetch('http://localhost:3000/api/v1/users/1')
  .then(r => r.json())
  .then(user => this.setState({user_id: user.id}))
}

handleChange = event => {
  const key =  event.target.name
  if(key === 'budget'){
    this.setState({ [key]: parseInt(event.target.value)})
  }else{
    this.setState({ [key]: event.target.value})
  }
  
}

handleSubmit = event => {
  event.preventDefault()
  fetch('http://localhost:3000/api/v1/itineraries',
  {
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    method: 'POST',
    body: JSON.stringify(this.state)
  })
  .then(r => r.json())
  .then(r => this.props.updateItineraries(r))

}
  render() {
    return (
      <div>
        <h1> Quiz</h1>
        <form onSubmit = {this.handleSubmit}>
          <div>
            <label>Title of itinerary</label>
            <div>
              <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/> 
            </div>
          </div>
          <div>
          <label>Start Date</label>
          <div>
            <input type='date' name='start' value={this.state.start} onChange={this.handleChange}/> 
          </div>
        </div>
        <div>
        <label>End Date</label>
          <div>
            <input type='date' name='end' value={this.state.end} onChange={this.handleChange}/> 
          </div>
        </div>
        <div>
        <label>City</label>
          <input type='text' name='city' value={this.state.city} onChange={this.handleChange}/> 
          <label>State</label>
          <input type='text' name='state' value={this.state.state} onChange={this.handleChange}/> 
        </div>

        <div> 
           <label>What is this itinerary for? </label>
            <div>
              <input 
                    type='radio'   
                    name='budget' 
                    value='1'
                    checked={this.state.budget === 1}
                    onChange={this.handleChange}/> Tinder Date
        </div>
            <div>
              <input 
                      type='radio'       
                      name='budget' 
                      value='2'
                      checked={this.state.budget === 2}
                      onChange={this.handleChange}/> Want to impress your date
            </div>
            <div>
              <input 
                type='radio' 
                name='budget' 
                value='3'
                checked={this.state.budget === 3}
                onChange={this.handleChange}/> Friends or Family came to visit
            </div>
            <div>         
              <input 
                type='radio' 
                name='budget' 
                value='4'
                checked={this.state.budget === 4}
                onChange={this.handleChange}/> Ballin!
            </div>
          </div>
          <button type= 'submit' value='submit'> Submit</button>
            
        </form>
      </div>
    );
  }
}

export default Quiz;
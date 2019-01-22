import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Itinerary from './containers/Itinerary';
import Quiz from './components/Quiz';
class App extends Component {

  state = {
    user: {},
    places: [],
    itinerary: {
      user_id: null,
      title: null,
      start: null,
      end: null,
      city: null,
      state: null,
      budget: null
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/places')
    .then(r => r.json())
    .then(places => this.setState({places}))

    //testing the itinerary added to the user
    fetch('http://localhost:3000/api/v1/users/1')
    .then(r => r.json())
    .then(user => this.setState({user}))
  }

  updateItineraries = (new_itinerary) =>{
    this.setState({itinerary: new_itinerary})
  }

  render() {
    return (
      <div>
        <div>
          <Quiz user = {this.state.user} updateItineraries = {this.updateItineraries}/>
        </div>

        <div>
          <Itinerary places = {this.state.places} itinerary = {this.state.itinerary} />
        </div>

      </div>
    );
  }
}

export default App;

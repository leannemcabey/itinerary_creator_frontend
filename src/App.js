import React, { Component } from 'react'
import './App.css'
import Itinerary from './containers/Itinerary'
import Quiz from './components/Quiz'

class App extends Component {

  state = {
    user: {},
    places: [],
    itinerary: {
      id: null,
      user_id: null,
      title: null,
      start: null,
      end: null,
      city: null,
      state: null,
      budget: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/places')
    .then(r => r.json())
    .then(places => this.setState({places}))

    //testing the itinerary added to the user
    fetch('http://localhost:3000/api/v1/users/1')
    .then(r => r.json())
    .then(user => this.setState({user}))
  }

  updateCurrentItinerary = (new_itinerary) => {
    this.setState({itinerary: new_itinerary}, () => this.postPlacesToAPI(this.generateItinerary()))
  }

  getAvailablePlaces = () => {
    const city = this.state.itinerary.city
    const state = this.state.itinerary.state
    const budget = this.state.itinerary.budget

    const availablePlaces = this.state.places.filter(place => place.city === city && place.state === state && place.price_level <= budget)

    return availablePlaces
  }

  generateItinerary = () => {
    let availablePlaces = this.getAvailablePlaces()
    const itineraryPlaces = []

    for (let i = 0; i < 5; i++) {
      let index = Math.floor(Math.random() * availablePlaces.length)
      itineraryPlaces.push(availablePlaces[index])
      availablePlaces = availablePlaces.filter(place => place !== availablePlaces[index])
    }
    return itineraryPlaces
  }

  postPlacesToAPI = (itineraryPlaces) => {
    for (let place of itineraryPlaces) {
      fetch(`http://localhost:3000/api/v1/itinerary_places`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({place_id: place.id,
                              itinerary_id: this.state.itinerary.id})
      })
      .then(r => r.json())
    }
  }

  render() {
    return (
      <div>
        <div>
          <Quiz user={this.state.user} updateCurrentItinerary={this.updateCurrentItinerary}/>
        </div>

        <div>
          {this.state.itinerary.id ? <Itinerary places={this.generateItinerary()} /> : null}
        </div>

      </div>
    );
  }
}

export default App

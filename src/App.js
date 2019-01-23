import React, { Component } from 'react'
import './App.css'
import User from './components/User'
import Itinerary from './containers/Itinerary'
import Quiz from './components/Quiz'
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends Component {

  state = {
    user: null,
    places: [],
    itinerary: {
      id: null,
      userId: null,
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
  }

  findOrCreateUser = (event, name) => {
    //debugger
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/users')
    .then( r => r.json() )
    .then( users => {
      let user = users.find(user => user.name === name)
      if (user) {
        this.setState({user})
      }
      else {
        fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name
          })
        })
        .then(r => r.json())
        .then(user => this.setState({user}))
      }
    })
  }

  getIteneraryId = () => {
    return this.state.itinerary.id
  }

  updateCurrentItinerary = (new_itinerary) => {
    console.log('updating itinerary')
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
      <Router>
        <div>

          <div>
            <Route path='/signin' render={() => <User findOrCreateUser={this.findOrCreateUser} user={this.state.user} />}/>
          </div>

          <div>
            <Route path='/create' render={() => <Quiz user={this.state.user} updateCurrentItinerary={this.updateCurrentItinerary} getIteneraryId={this.getIteneraryId}/>}/>
          </div>

          <div>
            <Route path='/itinerary' render={() => <Itinerary places={this.generateItinerary()} />}/>
            {/* {this.state.itinerary.id ? <Itinerary places={this.generateItinerary()} /> : null} */}
          </div>

        </div>
      </Router>
    );
  }
}

export default App

import React, { Component } from 'react';
import Place from '../components/Place'

class Itinerary extends Component {

  filteredPlaces = () => {
    const city = this.props.itinerary.city
    const state = this.props.itinerary.state
    const budget = this.props.itinerary.budget

    const availablePlaces = this.props.places.filter(place => place.city === city && place.state === state && place.price_level <= budget)

    return availablePlaces
  }

  generateItinerary = () => {
    if (this.props.itinerary.city !== null) {
      let availablePlaces = this.filteredPlaces()
      const itineraryPlaces = []

      for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * availablePlaces.length)
        itineraryPlaces.push(availablePlaces[index])
        availablePlaces = availablePlaces.filter(place => place !== availablePlaces[index])
      }
      return itineraryPlaces
    }
  }

  render() {
    console.log(this.generateItinerary())
    return (
      <div>
        <h1> Itinerary</h1>
        {this.generateItinerary() ? this.generateItinerary().map(place => <Place place={place}/>) : null}
      </div>
    );
  }
}

export default Itinerary;

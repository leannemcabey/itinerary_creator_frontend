import React, { Component } from 'react';
import Place from '../components/Place'

class Itinerary extends Component {

  state = {
    places: []
  }

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

  addPlaces = (places) => {
    if(places){
      for(let place of places){
        console.log('place_id', place.id)
        console.log('itinerary_id', this.props.itinerary.id)
        fetch(`http://localhost:3000/api/v1/itinerary_places`,
        {
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({place_id: place.id,
                                itinerary_id: this.props.itinerary.id})
        })
        .then(r => r.json())
      }
    }

  }

  render() {

    return (
      <div>
        <h1> Itinerary</h1>
      {this.addPlaces(this.generateItinerary())}
        {this.state.places.length === 0 ? null: this.state.places.map(p => <Place key ={p.id} place = {p}/>)}
      </div>
    );
  }
}

export default Itinerary;

import React, { Component } from 'react';
import Place from '../components/Place'

class Itinerary extends Component {

  filteredPlaces = () => {
    //need to make it random
    if (this.props.itinerary.city !== null){
      const randomStart
      const city = this.props.itinerary.city 
      const state = this.props.itinerary.state
      const budget = this.props.itinerary.budget

      return this.props.places.filter(place => place.city === city && place.state === state && place.price_level === budget)
    }

  }


  render() {
    console.log(this.filteredPlaces())
    return (
      <div>
        <h1> Itinerary</h1>
        
      </div>
    );
  }
}

export default Itinerary;

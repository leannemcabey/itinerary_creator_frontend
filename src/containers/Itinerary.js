import React, { Component } from 'react';
import Place from '../components/Place'

class Itinerary extends Component {

  filteredPlaces = () => {
    //need to make it random
    if (this.props.itinerary.city !== null){
      const city = this.props.itinerary.city 
      const state = this.props.itinerary.state
      
      this.props.places.filter(place => place.city === city && place.state === state)
    }

  }


  render() {
    return (
      <div>
        <h1> Itinerary</h1>
        
      </div>
    );
  }
}

export default Itinerary;

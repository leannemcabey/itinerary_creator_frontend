import React, { Component } from 'react';
import Place from '../components/Place'

class Itinerary extends Component {

  state = {
    places: []
  }

  filteredPlaces = () => {
    //need to make it random
    if (this.props.itinerary.city !== null){
      const city = this.props.itinerary.city 
      const state = this.props.itinerary.state
      const budget = this.props.itinerary.budget

      const places = this.props.places.filter(place => place.city === city && place.state === state && place.price_level <= budget).slice(0,3)

      return places
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
        {this.addPlaces(this.filteredPlaces())}
        {this.state.places.length === 0 ? null: this.state.places.map(p => <Place key ={p.id} place = {p}/>)}


      </div>
    );
  }
}

export default Itinerary;

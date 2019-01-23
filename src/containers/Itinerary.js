import React, { Component } from 'react'
import Place from '../components/Place'

class Itinerary extends Component {

  render() {
    return (
      <div>
        <h1> Itinerary</h1>
        {this.props.places.length === 0 ? null : this.props.places.map(p => <Place key={p.id} place={p}/>)}
      </div>
    )
  }
}

export default Itinerary

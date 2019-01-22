import React, { Component } from 'react';


class Place extends Component {
  render() {
    return (
      <div>
        <a href={this.props.place.website}>  <h1> {this.props.place.name}</h1></a>
        address: <p>{this.props.place.address}</p>
        description <p>{this.props.place.description}</p>
      </div>
    );
  }
}

export default Place;

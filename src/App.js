import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Itinerary from './containers/Itinerary';
import Quiz from './components/Quiz';
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Quiz />
        </div>

        <div>
          <Itinerary />
        </div>
        
      </div>
    );
  }
}

export default App;

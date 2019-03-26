import React, { Component } from 'react'
import './App.css'
import User from './components/User'
import Itinerary from './containers/Itinerary'
import Quiz from './components/Quiz'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => {
  return {
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -18,
      marginRight: 10,
    }
  }
}

class App extends Component {

  state = {
    user: null,
    allPlaces: [],
    itineraryPlaces: null,
    itinerary: {
      id: null,
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
      .then(allPlaces => this.setState({allPlaces}))
  }

  setActiveUser = (user) => {
    this.setState({user})
  }

  setItineraryPlaces = (itineraryPlaces) => {
    this.setState({itineraryPlaces})
  }

  setItinerary = (itinerary) => {
    this.setState({itinerary})
  }

  render() {
    const {classes} = this.props

    return (
      <Router>
        <div>
          {this.state.itineraryPlaces ? <Redirect to='/itinerary' /> : this.state.user ? <Redirect to="/create" /> : <Redirect to="/signin" />}
          <div className={classes.root}>
            <center><img src={require('./assets/images/Delish_Dream_Dish.png')} alt='logo'/></center>
          </div>
          <div>
            <Route path='/signin' render={() => <User setActiveUser={this.setActiveUser} />}/>
            <Route path='/create' render={() => <Quiz user={this.state.user} setItinerary={this.setItinerary} setItineraryPlaces={this.setItineraryPlaces} itineraryId={this.state.itinerary.id} allPlaces={this.state.allPlaces} itineraryPlaces={this.state.itineraryPlaces}/>}/>
            <Route path='/itinerary' render={() => <Itinerary places={this.state.itineraryPlaces}/>}/>
          </div>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App)

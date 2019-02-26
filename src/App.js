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
    places: [],
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

  setActiveUser = (user) => {
    this.setState({user})
  }

  setPlaces = (places) => {
    this.setState({places})
  }

  setItinerary = (itinerary) => {
    this.setState({itinerary})
  }

  render() {
    const {classes} = this.props;

    return (
      <Router>
        <div>
          {this.state.user ? <Redirect to="/create" /> : <Redirect to="/signin" />}
          <div className={classes.root}>
            <center><img src={require('./assets/images/Delish_Dream_Dish.png')} alt='logo'/></center>
          </div>
          <div>
            <Route path='/signin' render={() => <User setActiveUser={this.setActiveUser} />}/>
            <Route path='/create' render={() => <Quiz user={this.state.user} setItinerary={this.setItinerary} iteneraryId={this.state.itinerary.id}/>}/>
            <Route path='/itinerary' render={() => <Itinerary setPlaces={this.setPlaces} places={this.generateItinerary()} />}/>
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

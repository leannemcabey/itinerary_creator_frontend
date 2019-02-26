import React, { Component } from 'react'
import './App.css'
import User from './components/User'
import Itinerary from './containers/Itinerary'
import Quiz from './components/Quiz'
import { BrowserRouter as Router, Route, Link , Redirect} from "react-router-dom"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
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
});


class App extends Component {

  state = {
    user: null,
    places: [],
    itinerary: {
      id: null,
      userId: null,
      title: null,
      start: null,
      end: null,
      city: null,
      state: null,
      budget: null
    },
    clicked: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/places')
    .then(r => r.json())
    .then(places => this.setState({places}))
  }

  findOrCreateUser = (event, name) => {
    //debugger
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/users')
    .then( r => r.json() )
    .then( users => {
      let user = users.find(user => user.name === name)
      if (user) {
        this.setState({user})
      }
      else {
        fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name
          })
        })
        .then(r => r.json())
        .then(user => this.setState({user}))
      }
    })
  }

  getIteneraryId = () => {
    return this.state.itinerary.id
  }

  updateCurrentItinerary = (new_itinerary) => {
    console.log('updating itinerary')
    this.setState({itinerary: new_itinerary}, () => this.postPlacesToAPI(this.generateItinerary()))
  }

  getAvailablePlaces = () => {
    const city = this.state.itinerary.city
    const state = this.state.itinerary.state
    const budget = this.state.itinerary.budget

    const availablePlaces = this.state.places.filter(place => place.city === city && place.state === state && place.price_level <= budget)

    return availablePlaces
  }

  generateItinerary = () => {
    let availablePlaces = this.getAvailablePlaces()
    console.log(availablePlaces)
    const itineraryPlaces = []

    for (let i = 0; i < 5; i++) {
      let index = Math.floor(Math.random() * availablePlaces.length)
      itineraryPlaces.push(availablePlaces[index])
      availablePlaces = availablePlaces.filter(place => place !== availablePlaces[index])
    }
    return itineraryPlaces
  }

  postPlacesToAPI = (itineraryPlaces) => {
    for (let place of itineraryPlaces) {
      fetch(`http://localhost:3000/api/v1/itinerary_places`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({place_id: place.id,
                              itinerary_id: this.state.itinerary.id})
      })
      .then(r => r.json())
    }
  }

  handleClick = () => {
    this.setState({clicked: true})
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>


          {this.state.clicked ? <Redirect to="/signin" /> :
            <div className={classes.root}>
              <center><Link to ='/signin' onClick = {this.handleClick}><img src={require('./assets/images/Delish_Dream_Dish.png')}/></Link></center>

            </div>
          }

          <div>
            <Route path='/signin'  render={() => <User findOrCreateUser={this.findOrCreateUser} user={this.state.user} />}/>
          </div>

          <div>
            <Route path='/create' render={() => <Quiz user={this.state.user} updateCurrentItinerary={this.updateCurrentItinerary} getIteneraryId={this.getIteneraryId}/>}/>
          </div>

          <div>
            <Route path='/itinerary' render={() => <Itinerary places={this.generateItinerary()} />}/>
          </div>

        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

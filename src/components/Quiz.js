import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PropTypes from 'prop-types'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user.id,
      title: '',
      date: '',
      notes: '',
      city: '',
      state: '',
      budget: '1'
    }
  }

  budgets = () => {
    return [
      {
        value: '1',
        label: 'Tinder Date ($)',
      },
      {
        value: '2',
        label: 'Second Date ($$)',
      },
      {
        value: '3',
        label: "Fam ($$$)",
      },
      {
        value: '4',
        label: 'Ballin ($$$$)',
      },
    ]
  }

  renderQuestionaire = (classes) => {
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Itinerary
          </Typography>
          <form onSubmit = {this.handleSubmit} className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="outlined-name"
              label="Title"
              name='title'
              placeholder="Title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Notes"
              placeholder="Notes"
              multiline
              rowsMax="4"
              name= 'notes'
              value={this.state.notes}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              helperText="Write any notes you have"
              fullWidth
            />
            <TextField
              required
              id="outlined-name"
              name='date'
              className={classes.textField}
              value={this.state.date}
              onChange={this.handleChange}
              margin="normal"
              type='date'
              fullWidth
            />
            <TextField
              required
              id="outlined-name"
              label="City"
              name='city'
              placeholder="City"
              className={classes.textField}
              value={this.state.city}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="outlined-name"
              label="State"
              name='state'
              placeholder="State"
              className={classes.textField}
              value={this.state.state}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="outlined-select-budget"
              select
              label="Budget"
              className={classes.textField}
              value={this.state.budget}
              name='budget'
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                }
              }}
              helperText="What's your budget?"
              margin="normal"
              fullWidth>
                {this.budgets().map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </TextField>
            <br />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    )
  }

  handleChange = event => {
    if (event.target.name === 'budget') {
      this.setState({
        [event.target.name]: parseInt(event.target.value)
      })
    }
    else {
      this.setState(
        {[event.target.name]: event.target.value
      })
    }
  }

  getAvailablePlaces = () => {
    const city = this.state.city
    const state = this.state.state
    const budget = this.state.budget

    const availablePlaces = this.props.allPlaces.filter(place => place.city === city && place.state === state && place.price_level <= budget)

    return availablePlaces
  }

  generateItinerary = () => {
    let availablePlaces = this.getAvailablePlaces()
    const itineraryPlaces = []

    for (let i = 0; i < 5; i++) {
      let index = Math.floor(Math.random() * availablePlaces.length)
      itineraryPlaces.push(availablePlaces[index])
      availablePlaces = availablePlaces.filter(place => place !== availablePlaces[index])
    }

    this.props.setItineraryPlaces(itineraryPlaces)

    return itineraryPlaces
  }

  postPlacesToAPI = (itineraryPlaces) => {
    for (let place of itineraryPlaces) {
      fetch(`http://localhost:3000/api/v1/itinerary_places`, {
        method: 'POST',
        body: JSON.stringify({
          place_id: place.id,
          itinerary_id: this.props.itineraryId
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/itineraries', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.userId,
        title: this.state.title,
        date: this.state.date,
        notes: this.state.notes,
        city: this.state.city,
        state: this.state.state,
        budget: this.state.budget
      })
    })
    .then(r => r.json())
    .then(r => this.props.setItinerary(r))
    .then(() => this.postPlacesToAPI(this.generateItinerary()))
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        {this.renderQuestionaire(classes)}
      </div>
    )
  }

}

Quiz.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Quiz)

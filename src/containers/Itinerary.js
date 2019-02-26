import React, { Component } from 'react'
import Place from '../components/Place'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import PlaceIcon from '@material-ui/icons/Place'
import Grid from '@material-ui/core/Grid';

// Styling

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
  root: {
    flexGrow: 1,
  },
});




class Itinerary extends Component {

  fetchPlaces = () => {
    fetch('http://localhost:3000/api/v1/places')
    .then(r => r.json())
    .then(places => this.props.setPlaces(places))
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
      <CssBaseline />
        <br />
        <br />
        <Grid container spacing={24}>
        {this.props.places.length === 0 ? null : this.props.places.map(p => <Grid item xs={12} key={p.id}><Place place={p}/> </Grid>)}
        </Grid>
      </main>

    )
  }
}

Itinerary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Itinerary);

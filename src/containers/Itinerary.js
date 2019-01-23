import React, { Component } from 'react'
import Place from '../components/Place'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AssignmentIcon from '@material-ui/icons/Assignment';
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

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
      <CssBaseline />
        <Avatar className={classes.avatar}>
            <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
           Your Itinerary!
        </Typography>
        <Grid container spacing={24}>
        {this.props.places.length === 0 ? null : this.props.places.map(p => <Grid item xs={12}><Place key={p.id} place={p}/> </Grid>)}
        </Grid>
      </main>

    )
  }
}

Itinerary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Itinerary);


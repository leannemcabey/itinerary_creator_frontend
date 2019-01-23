import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

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
});

const budget = [
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
];


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

  handleChange = event => {
    const key =  event.target.name
    if(key === 'budget'){
      this.setState({ [key]: parseInt(event.target.value)})
    }else{
      this.setState({ [key]: event.target.value})
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
    .then(r => this.props.updateCurrentItinerary(r))
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      {this.props.getIteneraryId() ? <Redirect to="/itinerary" /> :
      <div>
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
            variant="outlined"
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
          helperText="hello"
          variant="outlined"
        />
        <TextField
        required
        id="outlined-name"
        label="Date"
        name='date'
        className={classes.textField}
        value={this.state.date}
        onChange={this.handleChange}
        margin="normal"
        variant="outlined"
        type='date'
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
        variant="outlined"
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
        variant="outlined"
      />
      <TextField
      id="outlined-select-budget"
      select
      label="Select"
      className={classes.textField}
      value={this.state.budget}
      name='budget'
      onChange={this.handleChange}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      helperText="What's your budget"
      margin="normal"
      variant="outlined"
      >
        {budget.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <Fab color="primary" aria-label="Add" className={classes.fab} type = 'submit' value='submit'>
        <AddIcon />
      </Fab>

        </form>
      </div>}
      </div>
    )
  }
}

Quiz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quiz);

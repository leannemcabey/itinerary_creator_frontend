import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
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
  }
})

class User extends Component {

  state = {
    name: ''
  }

  findOrCreateUser = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/users')
    .then(r => r.json())
    .then(users => {
      let user = users.find(user => user.name === this.state.name)
      if (user) {
        this.props.setActiveUser(user)
      }
      else {
        fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.name
          })
        })
        .then(r => r.json())
        .then(user => this.props.setActiveUser(user))
      }
    })
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    const {classes} = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.findOrCreateUser}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
            <Input onChange={this.handleChange} id="name" name="name" autoComplete="name" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth></FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    )
  }

}

User.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(User)

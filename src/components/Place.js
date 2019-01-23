import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

// styling
const styles  = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin: theme.spacing.unit,
  }
});


class Place extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {this.props.place.description.split(',')[0].split('_').join(' ')}
        </Typography>
        <Typography variant="h5" component="h2">
        {this.props.place.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {this.props.place.description.split(',').map(d => <Chip key={d} label={d.split('_').join(' ')} className={classes.chip} color='primary' variant="outlined"/>)}

        </Typography>
        <Typography component="p">
          {this.props.place.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary"  href={this.props.place.website} className={classes.button}>Learn More</Button>
      </CardActions>
    </Card>


    )
  }
}

Place.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Place);

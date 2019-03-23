import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import FormDialog from "./FormDialog";


const styles = {
  card: {   
    minWidth: 275,
    margin: 20,
    height: 500,
    
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

menu: {
  margin: 20,
  minWidth: 275,
},

stats: {
  margin: 20,
  minWidth: 275,
  height: 200,

},

number:{
  display: 'flex',
  margin: 20,
},

rows:{
  display: "flex",
},
};

class SimpleCard extends React.Component{

  render(){
    const { classes } = this.props;

    return(
      <Grid container spacing = {0} >
        <Grid item xs= {12} sm={6}>
        <Card className={classes.card}>
      <CardContent>
        <List>
          <ListItem>  
            <ListItemText>
              <h3>Tickets</h3>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton className="button"
              style = {{backgroundColor: 'transparent'}}
              >
                <FormDialog />
              </IconButton>
            </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          <ListItem button>
            <ListItemText primary="Ticket #32814" secondary="In Progress"></ListItemText>
          </ListItem>
        </List>
      </CardContent>
    </Card>
        </Grid>
        <Grid item xs = {12} sm = {6}>
        <Card className={classes.menu}>
            <CardContent>
              <Typography variant="h5">
              Welcome to Accenture's ticket system
              </Typography>
            </CardContent>
        </Card> 
        <Card className={classes.stats}>
          <CardContent>
            <Typography variant="h5"> 
                Live Chat
            </Typography>
            <Divider />
            </CardContent>
        </Card>
        

    
        
        </Grid>
        


      </Grid>

    )
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);

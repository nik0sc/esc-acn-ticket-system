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
import Add from '@material-ui/icons/AddCircle';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import FormDialog from "./FormDialog";


const styles = {
  card: {   
    minWidth: 275,
    margin: 20,
    
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
              <IconButton>
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
        <Card className={classes.card}>
            <CardContent>
                <h1> Hello</h1>

            </CardContent>


        </Card>

    
        
        </Grid>


      </Grid>

    )
  }
}

// function SimpleCard(props) {
//   const { classes } = props;

  

//   return (
    //   <Grid container spacing = {10 } >
    //     <Grid item xs= {12} sm={6}>
    //     <Card className={classes.card}>
    //   <CardContent>
    //     <List>
    //       <ListItem button>
    //         <ListItemText>hello</ListItemText>
    //       </ListItem>

    //     </List>
    //     <h3> Tickets </h3>
    //     <Typography variant="h5" component="h2">
    //       shjkfhs
    //     </Typography>
    //     <Typography className={classes.pos} color="textSecondary">
    //       adjective
    //     </Typography>
    //     <Typography component="p">
    //       well meaning and kindly.
    //       <br />
    //       {'"a benevolent smile"'}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>
    //     </Grid>
    //     <Grid item xs = {12} sm = {6}>
    //     <Card className={classes.card}>
    //         <CardContent>
    //             <h1> Hello</h1>

    //         </CardContent>


    //     </Card>

    
        
    //     </Grid>


    //   </Grid>

   
//   );
// }

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);

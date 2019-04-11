import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Card, CardContent, Grid, FormControl, Select, InputLabel, OutlinedInput, MenuItem } from '@material-ui/core';
import { CardActions, TextField, Paper } from 'material-ui';



class ReviewTicketAgain extends React.Component {
    render(){
        return(
            <div>
                <AppBar className="appbar">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                {"Review Ticket"}
              </Typography>
              <Button color="inherit" onClick={this.onClose} className="button2">
                save
              </Button>
            </Toolbar>
          </AppBar> 
            </div>
        )
    }

}


export default ReviewTicketAgain;
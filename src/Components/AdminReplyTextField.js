import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 25,
    marginRight: 20,
    marginTop: 30,
  }
});

class AdminReplyTextField extends React.Component {
  state={
    response: '',
  }
  

  componentDidMount(){
    console.log('admintextfield mounted: ' + this.props.ticketID);
    const AdminToken = cookies.get('AdminSessionToken');

    
  }

  render() {
    const { classes } = this.props;
    console.log('rendering:  ' + this.state.response);

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
        fullWidth
          id="adminReply"
          label="Admin's Reply"
          multiline
          rows="12"
          defaultValue = {this.props.ticketRes}
          onChange= {this.props.onChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: false,
          }}
        />

      
      </form>
    );
  }
}

AdminReplyTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminReplyTextField);

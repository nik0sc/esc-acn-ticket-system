import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      

        <TextField
        fullWidth
          id="adminReply"
          label="Admin's Reply"
          multiline
          rows="12"
          defaultValue="No admins have responded yet."
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

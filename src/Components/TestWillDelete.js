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


class TestWillDelete extends React.Component {
  state = {
    message: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
        
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        
    );
  }
}

TestWillDelete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestWillDelete);

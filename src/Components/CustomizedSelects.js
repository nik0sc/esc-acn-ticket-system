import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import MultipleSelect from './MultipleSelect';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';


const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      //marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = theme => ({
  root: {
    display: 'flex', 
  },
  margin: {
    margin: 20,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

class CustomizedSelects extends React.Component {
  state = {
    name: [],
    clearedDate: null,
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ clearedDate: date });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value,
    });
  };
  render() {
    const { classes } = this.props;
    const { clearedDate } = this.state;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.margin} >
          <h6>Ticket Number</h6>
          <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel} >
          </InputLabel>
          <BootstrapInput />
        </FormControl>
        <MultipleSelect/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl className={classes.margin}>
          <h6>Date Opened</h6>
        <DatePicker
            margin="normal"
            value={clearedDate}
            onChange={this.handleDateChange}
          />
          </FormControl>
          <FormControl className={classes.margin}>
            <h6>Time Opened</h6>
          <TimePicker
            margin="normal"
            value={clearedDate}
            onChange={this.handleDateChange}
          />
        </FormControl>
      </MuiPickersUtilsProvider> 
      <FormControl className={classes.margin} >
          <h6>Email</h6>
          <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel} >
          </InputLabel>
          <BootstrapInput />
        </FormControl>       
      </form>

    );
  }
}

CustomizedSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedSelects);

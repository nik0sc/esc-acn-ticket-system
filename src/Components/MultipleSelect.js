import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 20,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  
});


const names = [
  'API DevOps',
  'Chart as a Service',
  'Recruitment Platform',
  'Aesop',
  'Travel Marketplace',
  'Banking Lifestyle App',
  'AR Car Visualizer',
  'AR Car Manual',
  'AR Gamification',
  'AR Theatre',
];

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class MultipleSelect extends React.Component {
  state = {
    name: [],
  };
  

  handleChange = event => {
    this.setState({ name: event.target.value });     // push is 1 step slow
  };


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
        <h6> Topics</h6>
          <InputLabel htmlFor="select-multiple-checkbox"></InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            //MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

let openSnackbarFn;

class LoginRequired extends React.Component {
  state = {
    open: false,
    message: '',
  };

  
  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  openSnackbar = ({ message }) => {
    this.setState({
      open: true,
      message,
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

  render() {
    const message = (
      <span
        id="snackbar-message-id"
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    );

    return (
      <Snackbar
        anchororigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={message}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
        snackbarcontentprops={{
          'aria-describedby': 'snackbar-message-id',
        }}
      />
    );
  }
}

export function openSnackbar({ message }) {
  openSnackbarFn({ message });
}


export default LoginRequired;
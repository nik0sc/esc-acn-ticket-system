import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Add from '@material-ui/icons/AddCircle';
import { TextField } from '@material-ui/core';
import DropzoneDialogExample from './DropzoneWithPreview';
import DropzoneWithPreview from './DropzoneWithPreview';
import 'filepond/dist/filepond.min.css';
import * as FilePond from 'filepond';
import FileAttach from './FileAttach';


class FormDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Add className="icon" onClick={this.handleClickOpen('paper')}/>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Open a Ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Contact us and ask your questions.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="outlined-email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              id="outlined-name"
              label="Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              id="outlined-contact"
              label="Contact"
              type="contact"
              variant="outlined"
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              id="outlined-phone"
              label="Phone"
              type="phone"
              variant="outlined"
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              id="outlined-question"
              label="Question"
              type="question"
              variant="outlined"
              fullWidth
              multiline
            />
            <DialogContentText>
              Attachments
            </DialogContentText>
            <FileAttach />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;

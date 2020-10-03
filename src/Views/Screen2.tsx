import React from 'react';
import {
  Button, Dialog, DialogContent, DialogTitle,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Screen2() {
  const history = useHistory();
  const navigate = () => {
    history.push('/userList');
  };

  return (
    <Dialog aria-labelledby="user-dialog-title" open scroll="paper" maxWidth="lg" fullWidth>
      <DialogTitle id="user-dialog-title">Title</DialogTitle>
      <DialogContent className="person-dialog" style={{ padding: 30 }} dividers={true}>
        <h1>Screen 2</h1>
        <Button variant="contained" onClick={navigate}>
          Go to User List
        </Button>
      </DialogContent>
    </Dialog>
  );
}

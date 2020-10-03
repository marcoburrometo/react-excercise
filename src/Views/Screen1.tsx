import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Screen1() {
  const history = useHistory();
  return (
    <>
      <h1>Screen 1</h1>
      <Button
        variant="contained"
        onClick={() => {
          history.push('/screen2');
        }}
      >
        Go to screen 2
      </Button>
    </>
  );
}

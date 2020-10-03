import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Screen2() {
  const history = useHistory();
  const navigate = () => {
    history.push('/screen1');
  };

  return (
    <div>
      <h1>Screen 2</h1>
      <Button variant="contained" onClick={navigate}>Go to screen 1</Button>
    </div>
  );
}

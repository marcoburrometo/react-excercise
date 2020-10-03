import React, { useEffect, useState } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MatSwitch from '@material-ui/core/Switch';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import history from '../Services/history';
import { RootState } from '../Redux/store';
import { toggleTheme } from '../Redux/ui';

export default function AppRouter() {
  const [currLocation, setCurrLocation] = useState(history.location);
  const themeMode = useSelector((state: RootState) => state.ui.theme);
  const dispatch = useDispatch();
  const handleToggleTheme = () => dispatch(toggleTheme());
  useEffect(() => {
    history.listen((location) => {
      setCurrLocation(location);
    });
  }, []);
  return (
    <Router history={history}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">{(currLocation.pathname.replace('/', '') || 'Default View').toUpperCase()}</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <MatSwitch checked={themeMode === 'dark'} onChange={handleToggleTheme} />
            Dark mode
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Switch>
        {/* <Route path="/" component={Screen1} /> */}
        <Route path="/screen1" component={Screen1} />
        <Route path="/screen2" component={Screen2} />
        {/* redirect user to Screen1 page if route does not exist and user is not authenticated */}
        <Route component={Screen1} />
      </Switch>
    </Router>
  );
}

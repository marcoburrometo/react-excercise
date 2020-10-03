import React, { useCallback } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {
  AppBar, Button, Toolbar,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MatSwitch from '@material-ui/core/Switch';
import UserList from './UserList';
import UserModal from './UserModal';
import history from '../Services/history';
import { toggleTheme } from '../Redux/ui';
import { logout } from '../Redux/user';
import { loggedUserSelector } from '../Redux/Selectors/user';
import { themeSelector } from '../Redux/Selectors/ui';

export default function AppRouter() {
  const themeMode = useSelector(themeSelector);
  const user = useSelector(loggedUserSelector);
  const dispatch = useDispatch();
  const handleToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
  return (
    <Router history={history}>
      <AppBar position="fixed">
        <Toolbar>
          <p>{user?.email}</p>
          <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>
            <MatSwitch checked={themeMode === 'dark'} onChange={handleToggleTheme} />
            Dark mode
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Switch>
        <Route path="/user-list" component={UserList} />
        <Route path="/user-modal" component={UserModal} />
        {/* redirect user to UserList page if route does not exist */}
        <Route component={UserList} />
      </Switch>
    </Router>
  );
}

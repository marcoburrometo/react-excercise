import React from 'react';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { blue, lime } from '@material-ui/core/colors';
import AppRouter from './Views/Router';
import { themeSelector } from './Redux/Selectors/ui';
import { loggedUserSelector } from './Redux/Selectors/user';
import Login from './Views/Login';

function Wrapper() {
  const themeType = useSelector(themeSelector);
  const loggedUser = useSelector(loggedUserSelector);
  const theme = createMuiTheme({
    palette: {
      type: themeType,
      primary: {
        main: themeType === 'light' ? blue['500'] : lime['500'],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loggedUser ? <AppRouter /> : <Login />}
    </ThemeProvider>
  );
}

export default Wrapper;

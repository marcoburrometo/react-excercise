import React from 'react';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { purple, teal } from '@material-ui/core/colors';
import AppRouter from './Views/Router';
import { themeSelector } from './Redux/Selectors/ui';

function Wrapper() {
  const themeType = useSelector(themeSelector);
  const theme = createMuiTheme({
    palette: {
      type: themeType,
      primary: {
        main: themeType === 'light' ? teal['500'] : purple['500'],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default Wrapper;

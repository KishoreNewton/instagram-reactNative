import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Styles/GlobalStyles';
import { Theme } from './Styles/Theme';
import AppRouter from "./Router";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <AppRouter isLoggedIn={true} />
      </>
    </ThemeProvider>
  );
}

export default App;

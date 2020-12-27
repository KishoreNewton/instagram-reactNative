import React from 'react';
import { gql } from 'apollo-boost';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from "react-router-dom";
import GlobalStyles from './Styles/GlobalStyles';
import { Theme } from './Styles/Theme';
import AppRouter from './Router';
import { useQuery } from 'react-apollo-hooks';
import { ToastContainer, toast } from "react-toastify";
import styled from 'styled-components';
import FooterComponent from './Components/Footer';
import HeaderComponent from './Components/Header';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

function App() {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router>
        <>
          {isLoggedIn && <HeaderComponent />}
          <Wrapper>
            <AppRouter isLoggedIn={isLoggedIn} />
            <FooterComponent />
          </Wrapper>
        </>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  </ThemeProvider>
  );
}

export default App;

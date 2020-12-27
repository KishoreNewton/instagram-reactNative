import React from 'react';
import { PropTypes } from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AuthContainer from './Routes/Auth/index';
import Feed from './Routes/Feed';

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed} />
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={AuthContainer} />{' '}
  </>
);

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
    </Router>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;

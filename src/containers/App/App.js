import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';
import RegisterPage from '../register/RegisterPage';
import LoginPage from '../login/LoginPage';
import WelcomePage from '../welcome/WelcomePage';
import HomePage from '../home/HomePage';

import './App.scss';

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class App extends React.Component {
  componentDidMount() {
    
  }

  render() {
    const { authenticated } = this.props;

    return (
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        {authenticated && (
          <>
            <Route path="/home" component={HomePage} />
          </>
        )}
        <Route path="/" component={WelcomePage} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(App);

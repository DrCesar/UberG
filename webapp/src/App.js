import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';


import UserSignPage from './scenes/UserSignPage';
import UserRegisterPage from './scenes/UserRegisterPage';
import HomePage from './scenes/HomePage';
import UserProfilePage from './scenes/UserProfilePage';
import RidePage from  './scenes/RidePage';
import withAuthentication from './components/withAuthentication';
import Navigation from './components/Navigation';
import * as routes from './constants/routes';
import { firebase } from './firebase';

class App extends Component {

    state = {
        userInfo: {},
        authUser: null,
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }


    showUserProfilePage = (UserInfo) => {
        this.setState({ userInfo: UserInfo });
    }

    showRidePage = (rideInfo) => {
        this.setState({ rideInfo: rideInfo });
    }

    handleUser =(userId) => {
        this.setState({ userId: userId });
    }

    render() {

        const { userId } = this.state;

        return (
                <Router>
                    <Switch>
                        <Route exact path='/user' render={() => (
                            <UserProfilePage {...this.state.userInfo}/>
                        )}/>
                        <Route exact path='/home' render={() => (
                            <HomePage handleUserProfile={this.showUserProfilePage} />
                        )}/>
                        <Route exact path='/' render={() => (
                            <UserSignPage />
                        )}/>
                        <Route exact path='/register' render={() => (
                            <UserRegisterPage />
                        )}/>
                        <Route exact path='/ride' render={() => (
                            <RidePage userId={userId} />
                        )}/>
                    </Switch>
                </Router>
        );

    }
}

export default withAuthentication(App);

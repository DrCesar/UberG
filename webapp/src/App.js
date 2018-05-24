import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        authUser: null
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    // showHomePage = () => {
    //     this.setState({ page: 'home' });
    // }

    showUserProfilePage = (UserInfo) => {
        this.setState({ userInfo: UserInfo });
    }

    showRidePage = (rideInfo) => {
        this.setState({ rideInfo: rideInfo });
    }

    render() {

        const { page } = this.state;

        return (
            <div className='App'>
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
                            <RidePage />
                        )}/>
                    </Switch>
                </Router>
            </div>
        );

    }
}

export default withAuthentication(App);

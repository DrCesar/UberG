import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import UserSignPage from './scenes/UserSignPage';
import UserRegisterPage from './scenes/UserRegisterPage';
import HomePage from './scenes/HomePage';
import UserProfilePage from './scenes/UserProfilePage';
import RidePage from  './scenes/RidePage';


class App extends Component {

    state = {
        userInfo: {},
        userId: '',
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
                            <RidePage userId={userId} />
                        )}/>
                    </Switch>
                </Router>
            </div>
        );
        
    }
}

export default App;

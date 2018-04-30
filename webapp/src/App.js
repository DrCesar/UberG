import React, { Component } from 'react';

import './App.css';
import UserSignPage from './scenes/UserSignPage';
import HomePage from './scenes/HomePage';
import UserProfilePage from './scenes/UserProfilePage';


class App extends Component {

    state = {
        page: 'sigin',
    }

    showHomePage = () => {
        this.setState({ page: 'home' });
    }

    showUserProfilePage = (UserInfo) => {
        this.setState({ page: 'userProfile', userInfo: UserInfo });
    }

    showRidePage = (rideInfo) => {
        this.setState({ page: 'userProfile', rideInfo: rideInfo });
    }

    render() {

        const { page } = this.state;

        switch (page) {
            case 'userProfile':
                return (
                    <div className='App'>
                        <UserProfilePage {...this.state.userInfo}
                            handleReturnHome={this.showHomePage}
                        />
                    </div>
                ); 
            case 'home':
                return (
                    <div className="App">
                        <HomePage handleUserProfile={this.showUserProfilePage}/>
                    </div>
                );
            default:
                return (
                    <div className="App">
                        <UserSignPage  handleSignIn={this.showHomePage} />
                    </div>
                );
        }
    }
}

export default App;

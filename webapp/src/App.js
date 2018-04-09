import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserSignPage from './scenes/UserSignPage';
import HomePage from './scenes/HomePage';


class App extends Component {

    state = {
        isSignedIn: false,
    }

    signIn = () => {
        this.setState({ isSignedIn: true });
    }

    render() {

        if (this.state.isSignedIn) {
            return (
                <div className="App">
                    <HomePage />
                </div>
            );
        } else {
            return (
                <div className="App">
                    <UserSignPage  handleSignIn={this.signIn} />
                </div>
            );
        }
    }
}

export default App;

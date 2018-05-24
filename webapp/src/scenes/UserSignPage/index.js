import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Card, Button, Form, Label, Input, Item, Grid, Header, Icon } from 'semantic-ui-react';
import './index.css';
import { auth } from '../../firebase';


class UserSignPage extends Component {

	state = {
		email: '',
		password: '',
		error: null
	};

	handleSignIn = (event) => {
		const {
			email,
			password,
			error
		} = this.state;

		console.log(email, password);

		auth.doSignInWithEmailAndPassword(email, password)
		  .then(authUser => {
		    this.setState(() => ({
				fields: {
					email:  '',
					password: '',
					error: null
				} }));
			this.props.history.push('/home');
		  })
		  .catch(error => {
		    this.setState({error: error});
		  });

		event.preventDefault();
	};

	handleSignUp = () => {
		this.props.history.push('/register');
	};

	render() {
		const {
			email,
			password,
			error
		} = this.state;

		return (
			<Segment className='login-form'>
				<style>{`
			      	body > div,
			     	body > div > div,
			      	body > div > div > div.login-form {
        				height: 100%;
      				}
    			`}</style>
				<Grid style={{ height: '100%' }} inverted textAlign='center' verticalAlign='middle'>
					<Grid.Column  style={{ maxWidth: '40%' }}>
						<Form size='large'>
						<Segment stacked>
							<Header as='h1' className='signin-header'>
								<Icon color='green' name='car' />
								Login to UberG
							</Header>

							<Form.Input fluid size='big' icon='user' iconPosition='left' type='E-mail addres' focus placeholder='E-mail'
								value = {email}
								onChange={event => this.setState({email: event.target.value})}
							/>
							<Form.Input fluid size='big' icon='lock' iconPosition='left' type='password' focus placeholder='Password'
								value = {password}
								onChange={event => this.setState({password: event.target.value})}
							/>

							{ error && <p>{error.message}</p> }
							<Form.Button fluid inverted color='green' size='large' onClick={this.handleSignIn}>Login</Form.Button>
							<Form.Button fluid color='green' size='large' onClick={this.handleSignUp}>SignUp</Form.Button>
						</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</Segment>
		)
	}
}

export default withRouter(UserSignPage);


import React, { Component } from 'react';
import { Segment, Card, Button, Form, Label, Input, Item, Grid, Header, Icon } from 'semantic-ui-react';
import './index.css';


class UserSignPage extends Component {
	
	state = {};

	handleSignIn = () => {
		this.props.handleSignIn();
	}

	render() {

		return (
			<Segment className='login-form'>
				<style>{`
			      	body > div,
			     	body > div > div,
			      	body > div > div > div.login-form {
        				height: 100%;
      				}
    			`}</style>
				<Grid inverted textAlign='center' verticalAlign='middle'>
					<Grid.Column >
						<Form size='large'>
						<Segment stacked>
							<Header as='h2'>
								<Icon color='green' name='car' />
								Login to UberG
							</Header>

							<Form.Input fluid icon='user' iconPosition='left' type='E-mail addres' focus placeholder='User Name'/>
							<Form.Input fluid icon='lock' iconPosition='left' type='password' focus placeholder='Password' />
							<Button fluid inverted color='green' size='large' onClick={this.handleSignIn}>Login</Button>
						</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</Segment>
		)
	}
}

export default UserSignPage;
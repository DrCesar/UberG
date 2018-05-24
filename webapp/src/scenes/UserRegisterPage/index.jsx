
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Divider, Button, Input, Grid, Segment, Form, Header } from 'semantic-ui-react';
import './index.css';


class UserRegisterPage extends React.Component {
	
	state = {
		fields: {
			name: '',
			email:  '',
		}
	}

	onInputChange = (evt) => {
		const fields = this.state.fields;
		fields[evt.target.name] = evt.target.value
		this.setState({ fields })
	}
	goBack = () => {
		this.props.history.goBack();
	}

	render() {

		const { name, email } = this.state.fields;

		return (
			<Segment className='signup-form'>
				<style>{`
			      	body > div,
			     	body > div > div,
			      	body > div > div > div.signup-form {
        				height: 100%;
      				}
    			`}</style>
				<Grid style={{ height: '100%' }} textAlign='center' verticalAlign='middle' >
					<Grid.Row>
						<Grid.Column style={{ maxWidth: '40%'}}>
							<Form size='large' textAlign='left'>
								<Segment stacked textAlign='left'>
									<Header as='h1' style={{ marginBottom: '7%'}}>
										Sign Up Form
									</Header>
									<Form.Field>	
										<label>Name</label>
										<Input type='text' placeholder='Name' name='name' value={name} onChange={this.onInputChange} />
									</Form.Field>
									<Form.Field>
										<label>Email</label>
										<Input type='email' placeholder='Email' name='email' value={email} onChange={this.onInputChange} />
									</Form.Field>
									<Form.Field>
										<label>Password</label>
										<Input type='password' placeholder='Password' />
									</Form.Field>
									<Form.Field>
										<label>Confirm Password</label>
										<Input type='password' placeholder='Password' />
									</Form.Field>
									<Form.Group style={{ marginTop: '6%' }} widths='equal'>
										<Form.Button fluid color='green' inverted>
											Sign Up
										</Form.Button>
										<Form.Button fluid color='green' inverted onClick={this.goBack}>
											Cancel
										</Form.Button>
									</Form.Group>
								</Segment>
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default withRouter(UserRegisterPage);
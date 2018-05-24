
import React, { Component } from 'react';
import { Segment, Form, Button, Icon, Grid, Divider, Header, Message } from 'semantic-ui-react';
import faker from 'faker';
import './index.css'


import MapComp from '../../components/MapComponent';
import MainMenu from '../../components/MainMenu';


const typeOfDestination = [
	{
		text: 'UVG -> Place',
		value: 'Place'
	},
	{
		text: 'Place -> UVG',
		value: 'UVG'
	}
]


class RidePage extends Component {

	state = {
		fields: {
			userName: '',
			name: '',
			origin: '',
			destiny: '',
		},
		going: true,
		coming: true,
		error: false,
		ride: {
			user: this.props.userId,
			origin: '',
			destiny: '',
			routing: false,
		}
	};

	// componentDidMount() {
	// 	const fields = this.state.fields;
	// 	const user = searchUser(this.props.userId);

	// 	console.log(user);
	// 	fields.userName = user.name;
	// 	this.setState({ fields: fields });
	// }

	onDestChange = (e, {value}) => {
		const typeOfDest = value;
		const fields = this.state.fields;

		switch (typeOfDest) {
			case 'UVG': {
				fields['destiny'] = 'universidad del valle de guatemala 18 avenida guatemala city guatemala';
				fields['origin'] = '';
				this.setState({
					fields: fields,
					going: false,
					coming: true,
					error: false,
				});
				return;
			}
			case 'Place': {
				fields: fields,
				fields['destiny'] = '';
				fields['origin'] = 'universidad del valle de guatemala 18 avenida guatemala city guatemala';
				this.setState({
					fields: fields,
					going: true,
					coming: false,
					error: false,
				});
				return;
			}
		}
	};

	onChange = (e) => {
		const fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({ fields: fields });
	};

	onSubmit = () => {
		const ride = {
			origin: this.state.fields.origin,
			destiny: this.state.fields.destiny,
			routing: true,
		}

		this.setState({ ride: ride });
	};

	handleAddressError = () => {
		this.setState({ error: true })
	}
	
	render() {

		const { going, coming, fields, ride, error } = this.state;
		const { origin, destiny, name, userName } = fields;

		return (
			<Segment className='ride-form'>
				<style>{`
			      	body > div,
			     	body > div > div,
			      	body > div > div > div.ride-form {
        				height: 100%;
      				}
    			`}</style>
				<MainMenu />
				<Grid divided='vertically' columns={2} className='main-grid'>
					<Grid.Column width={6} style={{ marginTop: '10%' }}>
						<Segment textAlign='left'>
							<Form>
								<Header as='h1'>
									Post a Ride
								</Header>
								<Form.Input label='User' name='name' disabled value={userName}/>
								<Form.Input label='Ride Name' placeholder='Name' name='name' value={name} onChange={this.onChange}/>
								<Form.Dropdown placeholder='Type of Destination' onChange={this.onDestChange} selection options={typeOfDestination} />
								<Form.Input label='Origin' name='origin' disabled={going} value={origin} onChange={this.onChange} />
								<Form.Input label='Destination' name='destiny' disabled={coming} value={destiny} onChange={this.onChange} />
								{ error? <Message negative>Bad Address</Message>
									: ''}
								<Form.Button onClick={this.onSubmit} disabled={going && coming}>Submit</Form.Button>
							</Form>
						</Segment>	
					</Grid.Column>
					<Grid.Column width={10}>
						<MapComp 
							ride={ride}
							handleAddressError={this.handleAddressError}
						/>
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}

export default RidePage;
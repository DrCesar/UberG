
import React, { Component } from 'react';
import { Segment, Form, Button, Icon, Grid, Divider, Header, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import faker from 'faker';
import './index.css'


import MapComp from '../../components/MapComponent';
import MainMenu from '../../components/MainMenu';
import {firebase} from '../../firebase';
import { db } from '../../firebase';


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
			description: '',
			origin: '',
			destiny: '',
		},
		going: true,
		coming: true,
		error: false,
		ride: {
			description: '',
			origin: '',
			destiny: '',
			routing: false,
		}
	};


	getUserUid() {
		firebase.auth.onAuthStateChanged(authUser => {
			return authUser.uid;
		})
	}

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

	onSubmit = (event) => {
		const ride = {
			origin: this.state.fields.origin,
			destiny: this.state.fields.destiny,
			description: this.state.fields.description,
			routing: true,
		}

		this.setState({ ride: ride });

		var time = new Date();

		var timeObj = {
			year: time.getFullYear(),
			month: time.getMonth(),
			day: time.getDate(),
			hour: time.getHours(),
			minute: time.getMinutes()
		}

		firebase.auth.onAuthStateChanged(authUser => {
			db.createRide(ride.description, ride.destiny, authUser.uid, ride.origin, timeObj)
				.then(ride => {
					this.setState({
						fields: {
							origin: '',
							destiny: '',
						}});
				})
		});
		this.props.history.push('/home');
		event.preventDefault();
	}

	render() {
		const { going, coming, fields, ride } = this.state;
		const { origin, destiny, description } = fields;

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
								<Form.Input label='User' name='name' disabled value={this.props.userName}/>
								<Form.Input label='Descripción' placeholder='Descripción' name = 'description' value={description} onChange={this.onChange} />
								<Form.Dropdown placeholder='Type of Destination' onChange={this.onDestChange} selection options={typeOfDestination} />
								<Form.Input label='Origen' name='origin' disabled={going} value={origin} onChange={this.onChange} />
								<Form.Input label='Destino' name='destiny' disabled={coming} value={destiny} onChange={this.onChange} />
								
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

export default withRouter(RidePage);

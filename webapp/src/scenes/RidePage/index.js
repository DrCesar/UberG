
import React, { Component } from 'react';
import { Segment, Form, Button, Icon, Grid, Divider, Header } from 'semantic-ui-react';
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
			name: '',
			origin: '',
			destiny: '',
		},
		going: true,
		coming: true,
		ride: {
			origin: '',
			destiny: '',
			routing: false,
		}
	};

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
	}
	
	render() {

		const { going, coming, fields, ride } = this.state;
		const { origin, destiny, name } = fields;

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
								<Form.Input label='Name' placeholder='Name' value={name} />
								<Form.Dropdown placeholder='Type of Destination' onChange={this.onDestChange} selection options={typeOfDestination} />
								<Form.Input label='Origin' name='origin' disabled={going} value={origin} onChange={this.onChange} />
								<Form.Input label='Destiny' name='destiny' disabled={coming} value={destiny} onChange={this.onChange} />
								<Form.Button onClick={this.onSubmit} disabled={going && coming}>Submit</Form.Button>
							</Form>
						</Segment>	
					</Grid.Column>
					<Grid.Column width={10}>
						<MapComp 
							ride={ride}
						/>
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}

export default RidePage;
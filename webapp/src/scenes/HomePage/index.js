
import React, { Component } from 'react';
import { Segment, Grid, Input, Button, Icon, Search, Image, Menu, Visibility } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';


import MainMenu from '../../components/MainMenu';


import SimpleRideCard from './components/SimpleRideCard';
import RideCard from './components/RideCard';
import MapComp from '../../components/MapComponent';


import './index.css'

const genUsers = (name) => _.times(5, (name) => ({

	name: name ? ((name) => { var guess = faker.name.findName(); while (guess.indexOf(name) === -1) guess = faker.name.findName(); return guess; })() : faker.name.findName(),
	rating: faker.finance.amount(0,5,1),
	avatar: faker.image.avatar(),
}));


class HomePage extends Component {

	state ={
		showCard: false,
	}

	componentWillMount() {
		this.resetComponent();

		this.setState({ rides: this.genRides() })
	}

	genRides = () => {
		return _.times(10, () => (
			<SimpleRideCard
				handleUserClick = {this.props.handleUserProfile}
				handleRideClick = {this.handleRideClick}
				key = {faker.random.uuid()}
				name = {faker.name.findName()}
				date = {faker.date.recent()}
				avatar = {faker.image.avatar()}
				location = {faker.address.streetAddress("###")}
			/>
		));	
	}
	
	resetComponent = () => {
		this.setState({ isLoading: false, results: [], value: '' });
	}

	handleResultSelect = (e, { result }) => {
		this.props.handleResultSelect();
	}

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value });

		setTimeout(() => {
			if (this.state.value.length < 1) return this.resetComponent();
		})
	}

	hideRidecard = () => {
		this.setState({ showCard: false });
	}

	handleRideClick = (rideInfo) => {
		const rideCard = (
			<div>
				<Button colo='red' onClick={this.hideRidecard}><Icon name='arrow left'/></Button>
				<RideCard {...rideInfo} />
			</div>
		);
		console.log('hola');
		this.setState({ rideCard: rideCard, showCard: true });
	}

	render() {
		const { isLoading, results, value, rides, rideCard, showCard } = this.state;
		var info;
		if (showCard) 
			info = rideCard;
		else
			info = rides;

		return (
			<Segment className='main-div-homepage'>
				<style>{`
			      	body > div,
			     	body > div > div,
			      	body > div > div > div.main-div-homepage {
        				height: 100%;
      				}
    			`}</style>
				<MainMenu />
				<Grid className='homepage-grid' divided='vertically'>
					<Grid.Column width={6} >
						<Segment style={{ overflow: 'scroll'}}>
							<Search fluid size='big'
								loading = {isLoading}
								onResultSelect = {this.handleResultSelect}
								onSearchChange = {this.handleSearchChange}
								results = {results}
								value = {value} />
							{info}
						</Segment>
					</Grid.Column>
					<Grid.Column width={10}>
						<MapComp />
					</Grid.Column> 
				</Grid>
			</Segment>
		);
	}
}


export default HomePage;
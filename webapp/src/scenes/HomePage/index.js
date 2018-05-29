
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Segment, Grid,  Button, Icon, Search, Image, Menu } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';


import MainMenu from '../../components/MainMenu';


import SimpleRideCard from './components/SimpleRideCard';
import RideCard from './components/RideCard';
import MapComp from '../../components/MapComponent';
import {firebase} from '../../firebase';
import { db } from '../../firebase';

import './index.css'

const genUsers = (name) => _.times(5, (name) => ({

	name: name ? ((name) => { var guess = faker.name.findName(); while (guess.indexOf(name) === -1) guess = faker.name.findName(); return guess; })() : faker.name.findName(),
	rating: faker.finance.amount(0,5,1),
	avatar: faker.image.avatar(),
}));


class HomePage extends Component {

	state ={
		showCard: false,
		value: '',
		data: null,
		rides: null
	}

	prettyString(str) {
		let newStr = "";
		for (var i = 0; i < str.length; i++) {
			if (i == 0) {
				if (str.charCodeAt(i) > 96 && str.charCodeAt(i) < 123)
					newStr += String.fromCharCode(str.charCodeAt(i)-32);
				else
					newStr += str.charAt(i)
			} else if (str.charAt(i-1) == " ") {
				if (str.charCodeAt(i) > 96 && str.charCodeAt(i) < 123)
					newStr += String.fromCharCode(str.charCodeAt(i)-32);
				else
					newStr += str.charAt(i)
			} else {
				newStr += str.charAt(i)
			}
		}

		return newStr;
	}

	showRides() {
		// console.log(this.newRides());
		// this.setState({ rides: this.newRides() })
		this.newRides();
	}

	newRides() {
		var data = this.state.data;
		var rides = [];
		let promisesArray = [];
		data.forEach(doc => {
			let rideData = doc.data();
			promisesArray.push(db.getNameByUserId(rideData.id_user).then(user => {
				let name;
				user.forEach(user => {
					name = user.data().name;
				})
				let obj = <SimpleRideCard
					handleUserClick = {this.handleUserClick}
					handleRideClick = {this.handleRideClick}
					key = {doc.id}
					name = {name}
					date = {new Date(rideData.time.year, rideData.time.month, rideData.time.day, rideData.time.hour, rideData.time.minute)}
					avatar = {faker.image.avatar()}
					origin = {this.prettyString(rideData.origin)}
					destiny = {this.prettyString(rideData.destiny)}
				/>
				rides.push(obj);
			}));
		})
		Promise.all(promisesArray).then(values => {
			this.setState({rides: rides, isLoading: false})
		})
	}

	searchByOrigin = () => {
		const origin = this.state.value;

		db.getRidesByOrigin(origin).then (data => {
			this.setState({data:data}, () => {this.showRides()});
		})
	}

	componentWillMount() {
		this.resetComponent();
		this.setState({ rides: this.genRides() })
	}

	handleUserClick = (info) => {
		this.props.handleUserProfile(info);
		this.props.history.push('/user')
	}

	genRides = () => {
		return _.times(10, () => (
			<SimpleRideCard
				handleUserClick = {this.handleUserClick}
				handleRideClick = {this.handleRideClick}
				key = {faker.random.uuid()}
				name = {faker.name.findName()}
				date = {faker.date.recent()}
				avatar = {faker.image.avatar()}
				origin = {faker.address.streetAddress("###")}
				destiny = {faker.address.streetAddress("###")}
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
		this.setState({ isLoading: true, value: value }, () => {
			if (this.state.value && this.state.value.length > 1) {
				console.log(this.state.value)
		    	this.searchByOrigin()
		    } else {
				this.setState({isLoading: false})
			}
		});
	}

	hideRidecard = () => {
		this.setState({ showCard: false });
	}

	handleRideClick = (rideInfo) => {
		const rideCard = (
			<div>
				<Button animated floated='left' style={{ marginTop: '3%', marginBottom: '2%' }} size='large' color='red' onClick={this.hideRidecard}><Button.Content visible>Back</Button.Content>
     				<Button.Content hidden>
        				<Icon name='left arrow' />
        			</Button.Content>
        		</Button>
				<RideCard {...rideInfo} />
			</div>
		);
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
					<Grid.Column className='rideColumn' width={6} >
							<Search fluid size='big'
								loading = {isLoading}
								onResultSelect = {this.handleResultSelect}
								onSearchChange = {this.handleSearchChange}
								results = {results}
								value = {value} />
							{info}
					</Grid.Column>
					<Grid.Column width={10}>
						<MapComp />
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}


export default withRouter(HomePage);

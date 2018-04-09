
import React, { Component } from 'react';
import { Segment, Grid, Input, Button, Icon, Search } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';
import RideCard from './components/RideCard';


const genUsers = (name) => _.times(5, (name) => ({

	name: name ? ((name) => { var guess = faker.name.findName(); while (guess.indexOf(name) == -1) guess = faker.name.findName(); return guess; })() : faker.name.findName(),
	rating: faker.finance.amount(0,5,1),
	avatar: faker.image.avatar(),
}));


class HomePage extends Component {

	componentWillMount() {
		this.resetComponent();

		this.setState({ rides: this.genRides() })
	}

	genRides = () => {
		return _.times(10, () => (
			<RideCard
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

	render() {
		const { isLoading, results, value } = this.state;

		return (
			<Segment inverted>
				<Grid container columns={2} divided='vertically'>
					<Grid.Column width={6}>
						<Search fluid size='huge'
							loading = {isLoading}
							onResultSelect = {this.handleResultSelect}
							onSearchChange = {this.handleSearchChange}
							results = {results}
							value = {value} />
						{this.state.rides}
					</Grid.Column>
					<Grid.Column width={10}>
					</Grid.Column> 
				</Grid>
			</Segment>
		);
	}
}


export default HomePage;
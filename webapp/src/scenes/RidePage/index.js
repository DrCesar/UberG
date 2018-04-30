
import React, { Component } from 'react';
import { Segment, Card, Image, Button, Icon, Grid } from 'semantic-ui-react';
import faker from 'faker';


import MapComponent from '../../components/MapComponent';




class RidePage extends Component {

	
	render() {

		if (this.props.rideType == 'getRide') {
			return (
				<Segment>

					<Card>
					</Card>
					<MapComponent />
				</Segment>
			);
		} else {
			return (
				<Segment>
				</Segment>
			);
		}
	}
}

export default RidePage;

import React, { Component } from 'react';
import { Card, Image, Feed } from 'semantic-ui-react';


class RideCard extends Component {
	

	handleRideClick = (evt) => {
		this.props.handleRideClick(this.props);
	}

	handleUserClick = (evt) => {
		this.props.handleUserClick(this.props);
	}

	render() {

		return (
			<Card fluid>
				<Card.Content onClick={this.handleUserClick}>
					<Image circular floated='left' size='mini' src={this.props.avatar} />
					<Card.Header>{this.props.name}</Card.Header>
				</Card.Content>
				<Card.Content onClick={this.handleRideClick} style={{ backgroundColor: '#59be1b'}}>
					<Feed>
				        <Feed.Event>
				          	<Feed.Content>
				           		<Feed.Summary>
				              		{this.props.date.toString()}
				            	</Feed.Summary>
				          	</Feed.Content>
				          	<Feed.Content>
				           		<Feed.Summary>
				              		{this.props.location}
				            	</Feed.Summary>
				          	</Feed.Content>
				        </Feed.Event>
				    </Feed>
				</Card.Content>
			</Card>
		);
	}

}



export default RideCard;
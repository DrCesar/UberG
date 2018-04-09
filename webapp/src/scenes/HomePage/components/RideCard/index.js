
import React, { Component } from 'react';
import { Card, Image, Feed } from 'semantic-ui-react';


class RideCard extends Component {
	
	render() {

		console.log(this.props.date.toString());
		return (
			<Card fluid>
				<Card.Content>
					<Image circular floated='left' size='mini' src={this.props.avatar} />
					<Card.Header>{this.props.name}</Card.Header>
				</Card.Content>
				<Card.Content>
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
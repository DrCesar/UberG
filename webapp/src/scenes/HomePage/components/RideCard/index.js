
import React, { Component, PropTypes } from 'react';
import { Card, Button, Image, Icon } from 'semantic-ui-react';
import faker from 'faker';



class RideCard extends Component {
	
	propTypes: {
		name: PropTypes.string.isRequired,
		address: PropTypes.string,
		time: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
	};

	render() {
		return (
			<Card  style={{ height: '100%' }}  fluid>							
				<Image style={{ marginLeft: '10%', marginRight: '10%'}} circular src={faker.image.imageUrl(400, 400, 'people')} />
				<Card.Content>
					<Card.Header>{this.props.name}</Card.Header>
					<Card.Meta>{this.props.address}</Card.Meta>
				</Card.Content>
				<Card.Content>
					<Card.Description><Icon name='star' />{this.props.time}</Card.Description>
				</Card.Content>
				<Card.Content>
					<Card.Description><Icon name='id card' />{this.props.location}</Card.Description>
					<Card.Description><Icon name='phone' />66513</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}

export default RideCard;
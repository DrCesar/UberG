
import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import faker from 'faker';

const info = () => ({
	image: faker.image.avatar(),
	title: faker.company.catchPhrase(),
	review: faker.hacker.phrase() + faker.lorem.paragraphs(),
});


class Review extends Component {
	
	componentWillMount() {
		this.setState(info());
	}

	render() {

		return (
			<Card fluid>
				<Card.Content>
					<Image circular size='tiny' src={this.state.image} />
					<Card.Header>{this.state.title}</Card.Header>
				</Card.Content>
				<Card.Content>
					<Card.Description>{this.state.review}</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}


export default Review;
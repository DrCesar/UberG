
import { Component } from 'react';
import { Segment, Grid, Card, Button, Icon, Image } from 'semantic-ui-react';
import faker from 'faker';


const userInfo = (props) => ({
	name: props && props.name ? props.name : faker.name.findName(),
	phone: props && props.phone ? props.phone : faker.phone.phoneNumber(1),
	rating: props && props.rating ? props.rating : faker.finance.amount(0,5,1),
	uCard: props && props.uCard ? props.uCard : String(faker.random.number({min: 10, max:20})) + String(faker.random.number({min:100, max: 999})),
	job: props && props.job ? props.job : faker.name.jobTitle(),
	avatar: props && props.avatar ? props.avatar : faker.image.avatar(),
});

class UserProfilePage extends Component {
	
	componentWillMount() {
		this.setState(userInfo(this.props));
	}

	render() {

		return (
			<Segment className='user-form'>
				<Grid container divided='vertically'>
					<Grid.Column width={4}>
						<Card fluid>							
							<Card.Image circular src={this.state.info} />
							<Card.Header>{this.state.name}</Card.Header>
							<Card.Meta>{this.state.job}</Card.Meta>
						</Card>
					</Grid.Column>
					<Grid.Column width={6}>
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}

export default UserProfilePage;

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Grid, Card,  Sticky, Image, Icon, Rail, Visibility, Button } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';


import MainMenu from '../../components/MainMenu';


import Review from './components/Review';


import './index.css';


const userInfo = (props) => ({
	name: props && props.name ? props.name : faker.name.findName(),
	phone: props && props.phone ? props.phone : faker.phone.phoneNumber(1),
	rating: props && props.rating ? props.rating : faker.finance.amount(0,5,1),
	uCard: props && props.uCard ? props.uCard : String(faker.random.number({min: 10, max:20})) + String(faker.random.number({min:100, max: 999})),
	job: props && props.job ? props.job : faker.name.jobTitle(),
	avatar: faker.image.imageUrl(400, 400, 'people'),
});

class UserProfilePage extends Component {
	
	componentWillMount() {
		this.setState(userInfo(this.props));
		this.setState({ reviews: this.genReviews() });
	}

	genReviews = () => {

		return	_.times(10, () => (
			<Review />
		));
	};

	handleContextRef = (contextRef) => {
		this.setState({ contextRef });
	};

	handleGoBack = () => {
		this.props.history.push('/home');
	}

	render() {

		return (
			<Segment className='user-form' >
				<style>{`
			      	body > div,
			     	body > div > div,
			      	body > div > div > div.user-form {
        				height: 100%;
      				}
    			`}</style>
    			<MainMenu />
    			<Button animated floated='left' onClic={this.back} className='backButton' onClick={this.handleGoBack}>
    				<Button.Content visible>Back</Button.Content>
    				<Button.Content hidden><Icon name='left arrow' /></Button.Content>
    			</Button>
				<Grid className='main-grid-user'  divided='vertically' >

					<Grid.Column width={4}>
						<Card  style={{ height: '100%' }}  fluid>							
							<Image circular src={this.state.avatar} />
							<Card.Content>
								<Card.Header>{this.state.name}</Card.Header>
								<Card.Meta>{this.state.job}</Card.Meta>
							</Card.Content>
							<Card.Content>
								<Card.Description><Icon name='star' />{this.state.rating}</Card.Description>
							</Card.Content>
							<Card.Content>
								<Card.Description><Icon name='id card' />{this.state.uCard}</Card.Description>
								<Card.Description><Icon name='phone' />{this.state.phone}</Card.Description>
							</Card.Content>
						</Card>
					</Grid.Column>
					<Grid.Column className='reviewsColumn' width={12}>
						{this.state.reviews}
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}

export default withRouter(UserProfilePage);
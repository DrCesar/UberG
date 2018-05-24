
import React, { Component } from 'react';
import { Menu, Visibility, Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


class MainMenu extends Component {

	state = {
		menuFixed: false
	};

	stickTopMenu = () => this.setState({ menuFixed: true });

	unStickTopMenu = () => this.setState({ menuFixed: false });

	handleSignOut = () => this.props.history.replace('/', null);

	handleHome = () => this.props.history.push('/home');

	handlePostRide = () => this.props.history.push('/ride');
	
	render() {
		const { menuFixed } = this.state;
		return (
			<Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}>
				<Menu
					borderless
					fixed={menuFixed && 'top'}
				>
					<Menu.Item>
						<Icon color='green' size='large' name='car' /> 
					</Menu.Item>
					<Menu.Item header>UberG</Menu.Item>
					<Menu.Item as='a' onClick={this.handleHome}>Home</Menu.Item>
					<Menu.Item as='a'>User Info</Menu.Item>
					<Menu.Item as='a'>Rides History</Menu.Item>
					<Menu.Menu position='right'>
						<Menu.Item as='a' position='right' >
							<Button primary color='blue'  onClick={this.handlePostRide}>Post a Ride <Icon color='blue' inverted name='add circle'/></Button>
						</Menu.Item>
						<Menu.Item as='a' position='right' color='red' active onClick={this.handleSignOut} style={{ marginLeft: '10%' }}>Sign Out</Menu.Item>
					</Menu.Menu>
				</Menu>
			</Visibility>
		);
	}
}

export default withRouter(MainMenu);
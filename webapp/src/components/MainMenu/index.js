
import React, { Component } from 'react';
import { Menu, Visibility, Icon } from 'semantic-ui-react';


class MainMenu extends Component {

	state = {
		menuFixed: false
	}

	stickTopMenu = () => this.setState({ menuFixed: true })

	unStickTopMenu = () => this.setState({ menuFixed: false });
	
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
					<Menu.Item as='a'>Home</Menu.Item>
					<Menu.Item as='a'>User Info</Menu.Item>
					<Menu.Item as='a'>Rides History</Menu.Item>
				</Menu>
			</Visibility>
		);
	}
}

export default MainMenu;
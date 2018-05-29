
import React, { Component } from 'react';
import { Card, Image, Feed, Header, Label } from 'semantic-ui-react';
import { withRouter, Redirect } from 'react-router-dom';


class RideCard extends Component {


    handleRideClick = (evt) => {
        this.props.handleRideClick(this.props);
    }

    handleUserClick = (evt) => {
        this.props.handleUserClick(this.props);
    }

    render() {

        return (
            <Card fluid onClick={this.handleRideClick}>
                <Card.Content >
                    <Image onClick={this.handleUserClick} circular floated='left' size='mini' src={this.props.avatar} />
                    <Card.Header><Header style={{ marginTop: '1%' }} >{this.props.name}</Header></Card.Header>
                </Card.Content>
                <Card.Content  >
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Label> Origin: </Label> {this.props.origin}
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Label> Destiny: </Label> {this.props.destiny}
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Label> Date: </Label> {this.props.date.toString()}
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

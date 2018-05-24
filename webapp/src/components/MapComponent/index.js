
 /* global google */
import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, DirectionsRenderer, TrafficLayer } from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';


const MapComponent = compose(
    withProps({
        googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidUpdate() {
            if (this.props.ride.routing) {
                const DirectionsService = new google.maps.DirectionsService();

                DirectionsService.route({
                    origin: this.props.ride.origin,
                    destination: this.props.ride.destiny,
                    travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === 'OK') {
                        this.setState({
                            directions: result,
                        });
                    } else {    
                        this.props.handleAddressError();
                    }
                });
            }
        }
    })
    )(props => (
    <GoogleMap defaultZoom={16} defaultCenter={{ lat: 14.604295, lng: -90.489208 }}>
        {/*<Marker position={{ lat: 14.604295, lng: -90.489208 }} />*/}
        <TrafficLayer autoUpdate />
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
));

class MapComp extends Component {
	
	
	render() {

		return (
			<MapComponent {...this.props}/>
		);
	}

}


export default MapComp;
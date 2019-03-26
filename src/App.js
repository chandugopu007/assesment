import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { getDrones } from './actions';
import { connect } from 'react-redux';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      droneData: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  componentDidMount() {
    setInterval(() => { this.props.dispatch(getDrones()); }, 4000)
  }
  componentWillReceiveProps(nextProps) {
    console.log("props", nextProps)
    this.setState({
      droneData: nextProps.drones[nextProps.drones.length - 1]
    })
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  render() {
    const lat = this.state.droneData.latitude || 29.7604;
    const lang = this.state.droneData.longitude || -95.3677;
    const latLang = new this.props.google.maps.LatLng(lat, lang);
    // const activeMarker = new this.props.google.maps.Marker()
    // const latLang = { lat: this.state.droneData.latitude, lng: this.state.droneData.longitude }
    return (
      <div style={{ width: 500, height: 500 }}>
        <Map
          google={this.props.google}
          zoom={6}
          style={mapStyles}
          initialCenter={{
            lat: 29.7604,
            lng: -95.3677
          }}>
          <Marker onClick={this.onMarkerClick}
            visible={true}
            position={latLang}
          />
          <InfoWindow visible={true} marker={this.state.activeMarker}>
            <div>
              <h4>Temperature: {this.state.droneData.metric}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drones: state.measurements
});
export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: 'AIzaSyDnZHCNVuYH8lZSMZtuHzJ4677eUi6AE8w'
})(MapContainer))

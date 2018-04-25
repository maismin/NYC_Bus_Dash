import React, { Component } from 'react';
import { Map, TileLayer, Marker, Circle, LayerGroup, onMouseOver} from 'react-leaflet';
import L from 'leaflet';
import BusRouteLayerContainer from './BusRouteLayerContainer';
import m4_0_Route from '../M4_0.json';
import m4_1_Route from '../M4_1.json';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [40.785091, -73.968285];
const zoomLevel = 13;
const circleRadius = 800;
const circleOpacity = 0.7;
// For simulating API cals to the backend
const busRouteResponse = [
//  ['m4_0_route', m4_0_Route],
  ['m4_1_route', m4_1_Route]
];

// const Markers = () => (
//   { this.isUserMarkerAvailable && <Marker position={userLatLng} /> }
// );

class BusMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLatLng: []
    }

    this.handleClickAtLocation = this.handleClickAtLocation.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
  }

  get isUserMarkerAvailable() {
    const userLatLng = this.state.userLatLng;
    return (Array.isArray(userLatLng) && 
            userLatLng.length &&
            false);
  }

  handleClickAtLocation( target ) {
    this.setState({
      userLatLng: [target.latlng.lat, target.latlng.lng],
      reset: false
    });
    console.log(this.state.userLatLng);
  }

  onEachFeature(feature, layer) {
//    console.log('feature: ', feature);
//    console.log('layer: ', layer);
    layer.on({
      mouseover: function(e) {
        console.log(e.target.feature.properties.stop_name)
      },
      click: function(e) {
        console.log("you've clicked on " + e.target.feature.properties.stop_name);
      }
//      mouseout: this.resetHighlight.bind(this)
//      click: this.clickToFeature.bind(this)
    });
  }

  pointToLayer(feature, latlng) {
    let options = {
      color: '#3388ff',
      fill: true,
      fillColor: '#3388ff',
      fillOpacity: 1
    };
    return L.circleMarker(latlng, options);
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('click', this.handleClickAtLocation);
  }

  render() {
    return (
      <div>
        <Map
          ref = { m => { this.leafletMap = m; } }
          center={mapCenter}
          zoom={zoomLevel}
        >
          <TileLayer
            attribution = { stamenTonerAttr }
            url = { stamenTonerTiles }
          />
          { this.isUserMarkerAvailable && 
            <Marker position={this.state.userLatLng} />
          }
          { this.isUserMarkerAvailable && 
            <Circle center={this.state.userLatLng} radius={circleRadius} opacity={circleOpacity} /> 
          }
          <LayerGroup>
            {busRouteResponse.map(busRoute => <BusRouteLayerContainer geojson={busRoute[1]} 
                                                                      keyValue={busRoute[0]} 
                                                                      onEachFeature={this.onEachFeature} 
                                                                      pointToLayer={this.pointToLayer} />)}
          </LayerGroup>
        </Map>
      </div>
    );
  }
}

export default BusMapContainer;
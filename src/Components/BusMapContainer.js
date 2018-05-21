import React, { Component } from 'react';
// import { Map, TileLayer, LayerGroup, LayersControl, Marker, Popup, FeatureGroup, Circle, Tooltip  } from 'react-leaflet';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import BusRouteLayer from './BusRouteLayer';
import ReactLeafletMarkerRadius from './ReactLeafletMarkerRadius';
import ReactLeafletNearestBusStops from './ReactLeafletNearestBusStops';
import { Panel } from 'react-bootstrap';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [40.785091, -73.968285];
const zoomLevel = 13;
const circleRadius = 200;
const circleOpacity = 0.7;
const URL_ROOT = 'https://group5host.ccnysd17.org/api/';
const zIndex = 400;

class BusMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLatLng: [],
      nearestBusStops: {},
    }

    this.handleClickAtLocation = this.handleClickAtLocation.bind(this);
    this.grabNearestBusStops = this.grabNearestBusStops.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
  }

  get isUserMarkerAvailable() {
    const userLatLng = this.state.userLatLng;
    return (Array.isArray(userLatLng) && userLatLng.length);
  }

  get isBusStopsAvailable() {
    let isEmpty = require('lodash/isEmpty');
    const busStops = this.state.nearestBusStops;
    // console.log(isEmpty(busStops));
    return !isEmpty(busStops);
  }

  get isBusRouteGeoAvailable() {
    let isEmpty = require('lodash/isEmpty');
    // const busRoute = this.props.busRoute;
    // const direction = this.props.direction.direction;
    // console.log(`BusMap:${!isEmpty(this.props.geo)}`);
    // console.log(`BusRoute:${this.props.busRoute}`);
    // console.log(`BusDirection:${JSON.stringify(this.props.direction)}`);
    return (!isEmpty(this.props.geo));
  }

  handleClickAtLocation( target ) {
    this.setState({
      userLatLng: [target.latlng.lat, target.latlng.lng],
      nearestBusStops: {}
    });
    this.grabNearestBusStops();
  }

  grabNearestBusStops() {
    const lat = this.state.userLatLng[0];
    const lng = this.state.userLatLng[1]    
    let url = URL_ROOT + `geo/nearest-points/lon/${lng}/lat/${lat}/dist/${0.0018}`;
    fetch(url)
      .then(response => response.json())
      .then(nearestBusStops => {
        this.setState({
          nearestBusStops: nearestBusStops
        });
      });
  }

  onEachFeature(feature, layer) {
//    console.log('feature: ', feature);
//    console.log('layer: ', layer);
    // console.log(feature);
    const stopName = feature.properties.stop_name;
    const stopSequence = feature.properties.stop_sequence;
    layer.bindTooltip(stopName);
    layer.on({
      // mouseover: function(e) {
      //   console.log(e.target.feature.properties.stop_name)
      //   const stopName = e.target.feature.properties.stop_name;
      //   layer.bindTooltip(stopName);
      // },
      click: function(e) {
        // console.log("you've clicked on " + e.target.feature.properties.stop_name);
        let station = {station: stopName, value: stopSequence};
        // console.log(station);
      }
//      mouseout: this.resetHighlight.bind(this)
//      click: this.clickToFeature.bind(this)
    });
  }

  pointToLayer(feature, latlng) {
    // console.log(feature);
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
    // leafletMap.on('click', this.handleClickAtLocation);
  }

  render() {
    return (
      <Panel>
        <Map
          ref = { m => { this.leafletMap = m; } }
          center={mapCenter}
          zoom={zoomLevel}
          zoomControl={false}
        >

          <TileLayer
            attribution = { stamenTonerAttr }
            url = { stamenTonerTiles }
            zIndex = { zIndex }
          />
          { this.isUserMarkerAvailable &&
            <ReactLeafletMarkerRadius latlng={this.state.userLatLng}
                                      radius={circleRadius}
                                      opacity={circleOpacity}
                                      />
          }

          { this.isBusStopsAvailable &&
            <ReactLeafletNearestBusStops busStops={this.state.nearestBusStops}
                                         onEachFeature={this.onEachFeature}
                                         pointToLayer={this.pointToLayer}
                                      />
          }

          {
            this.isBusRouteGeoAvailable &&
            <BusRouteLayer geojson={this.props.geo}
                           onEachFeature={this.onEachFeature}
                           pointToLayer={this.pointToLayer} />
          }

        </Map>
      </Panel>
    );
  }
}

export default BusMapContainer;
import React, { Component } from 'react';
import { Map, TileLayer, LayerGroup, LayersControl, Marker, Popup, FeatureGroup, Circle, Tooltip  } from 'react-leaflet';
import L from 'leaflet';
import BusRouteLayerContainer from './BusRouteLayerContainer';
import ReactLeafletMarkerRadius from './ReactLeafletMarkerRadius';
import ReactLeafletNearestBusStops from './ReactLeafletNearestBusStops';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [40.785091, -73.968285];
const zoomLevel = 13;
const circleRadius = 200;
const circleOpacity = 0.7;
const URL_ROOT = 'https://group5host.ccnysd17.org/api/';


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
    const stopName = feature.properties.stop_name;
    layer.bindTooltip(stopName);
//     layer.on({
//       mouseover: function(e) {
//         console.log(e.target.feature.properties.stop_name)
//         const stopName = e.target.feature.properties.stop_name;
//         layer.bindTooltip(stopName);
//       },
//       click: function(e) {
//         console.log("you've clicked on " + e.target.feature.properties.stop_name);
//       }
// //      mouseout: this.resetHighlight.bind(this)
// //      click: this.clickToFeature.bind(this)
//     });
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
    // leafletMap.on('click', this.handleClickAtLocation);
  }

  render() {
    return (
      <div>
        <Map
          ref = { m => { this.leafletMap = m; } }
          center={mapCenter}
          zoom={zoomLevel}
        >
        <LayersControl position="topright">
  <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
    <TileLayer
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
  <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
    <TileLayer
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
  <LayersControl.Overlay name="Marker with popup">
    <Marker position={[40.810821008436534, -73.93896102992586]}>
      <Popup>
        <span>
          A pretty CSS3 popup. <br /> Easily customizable.
        </span>
      </Popup>
      <Tooltip>
        <span>
          Hello
        </span>
      </Tooltip>
    </Marker>
  </LayersControl.Overlay>
  <LayersControl.Overlay name="Feature group">
    <FeatureGroup color="purple">
      <Popup>
        <span>Popup in FeatureGroup</span>
      </Popup>
      <Circle center={[40.810821008436534, -73.93896102992586]} radius={200} />
    </FeatureGroup>
  </LayersControl.Overlay>
</LayersControl>
          <TileLayer
            attribution = { stamenTonerAttr }
            url = { stamenTonerTiles }
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
            <BusRouteLayerContainer geojson={this.props.geo}
                                    onEachFeature={this.onEachFeature}
                                    pointToLayer={this.pointToLayer} />
          }

        </Map>
      </div>
    );
  }
}

export default BusMapContainer;
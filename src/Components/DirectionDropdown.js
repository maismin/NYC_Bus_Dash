import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

// Make sure to import default styles.
// This only needs to be done once; probably during bootstrapping process.
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const labelKey = "direction";
const valueKey = "value";

let isLoadingExternally = false;

class DirectionDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [],
      busRoute: "",
      value: {}
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const busRoute = nextProps.busRoute;
    const busRouteState = this.state.busRoute;
    // console.log("busRoute: " + busRoute);
    // console.log("busRouteState: " + busRouteState);
    // console.log(busRoute.length)
    // console.log("Received Props: " + busRoute);
    // console.log(this.state.busRoute);
    // console.log(nextProps);
    if (busRoute.length === 0) {
      console.log("Resetting");
      this.setState({
        directions: [],
        busRoute: "",
        value: {}
      });
    } else {
      if (busRouteState.length >= 0 && busRoute !== busRouteState) {
        console.log('Making Connection');
        isLoadingExternally = true;
        let directionsURL = `https://group5host.ccnysd17.org/api/bus-directions/bus-route/${busRoute}`;
        fetch(directionsURL)
          .then(response => response.json())
          .then(directions => {
            isLoadingExternally = false;
            this.setState({ directions, busRoute, value: {}});
          });
      } 
    }  
  }

  handleChange(target) {
    // console.log(target);
    this.setState({
      value: target
    })
    this.props.updateValue(target);
  }

  render() {
    // console.log(this.state.busRoutes);
    // console.log(labelKey);
    // console.log("Render: " + this.props.busRoute);
    return (
      <VirtualizedSelect
        options={this.state.directions}  
        value={this.state.value}
        onChange={this.handleChange}
        clearable
        searchable
        simpleValue={false}
        labelKey={labelKey}
        valueKey={valueKey}
        isLoading={isLoadingExternally}
      /> 
    );
  }
}

export default DirectionDropdown;
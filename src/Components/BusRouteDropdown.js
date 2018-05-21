import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

// Make sure to import default styles.
// This only needs to be done once; probably during bootstrapping process.
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const busRoutesURL = 'https://group5host.ccnysd17.org/api/bus-routes';
const labelKey = "busRoute";
const valueKey = labelKey;

let isLoadingExternally = true;

class BusRouteDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busRoutes: []
    }
  }

  componentDidMount() {
    fetch(busRoutesURL)
      .then(response => response.json())
      .then(busRoutes => {
        isLoadingExternally = false;
        this.setState({ busRoutes });
      })
    // this.setState({
    //   busRoutes: [{busRoute: "M35", labelKey: "M35"}]
    // });
  }

  render() {
    // console.log(this.state.busRoutes);
    // console.log(labelKey);
    return (
      <VirtualizedSelect
        options={this.state.busRoutes}  
        value={this.props.value}
        onChange={this.props.updateValue}
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

export default BusRouteDropdown;
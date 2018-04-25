import React, { Component } from 'react';
import BusRouteDropdown from './BusRouteDropdown';
import DirectionDropdown from './DirectionDropdown';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busRoute: "",
      startDate: null,
      endDate: null,
      direction: {direction: "", value: -1}
    }

    this.handleBusRouteChange = this.handleBusRouteChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }

  handleBusRouteChange(target) {
    // console.log(typeof target.busName)
    // console.log(target)
    if (target) {
      this.setState({
        busRoute: target.busRoute
      });
    } else {
      this.setState({
        busRoute: "",
        direction: ""
      });
    }
  }

  handleDirectionChange(target) {
    // console.log("Previous: ",this.state.direction, "| Current: ", target);
    console.log(target);
    this.setState({
      direction: target
    });
  }

  handleStartDate(date) {
    this.setState({
      startDate: date
    });
    //console.log(typeof this.state.startDate);
    console.log(typeof date._d);
    console.log(date._d);
  }

  handleEndDate(date) {
    this.setState({
      endDate: date
    });
    console.log(this.state.endDate);
  }

  handleSubmit() {
  }

  render() {
    return (
      <div>
        Bus Route
        <BusRouteDropdown
          value={this.state.busRoute}
          updateValue={this.handleBusRouteChange}
        />
        Directions
        <DirectionDropdown
          updateValue={this.handleDirectionChange}
          busRoute={this.state.busRoute}
        />
        Start Date
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleStartDate}
        />
        End Date
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleEndDate}
        />
      </div>
    );
  }
}

export default FilterContainer
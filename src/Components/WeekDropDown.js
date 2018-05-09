import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = ['Weekday', 'Weekend'];

const WeekDropDown = ({value, onChange}) => (
  <Dropdown options={options} onChange={onChange} value={value}/>
);

WeekDropDown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default WeekDropDown;
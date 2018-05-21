import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  {value:0, label:"All"},
  {value:1, label:"7am-10am"},
  {value:2, label:"10am-4pm"},
  {value:3, label:"4pm-7pm"},
  {value:4, label:"7pm-11pm"}
];

const TimeDropDown = ({value, onChange}) => (
  <Dropdown options={options} onChange={onChange} value={value}/>
);

TimeDropDown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default TimeDropDown;
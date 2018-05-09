import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  {value:"08-2014-11-2014", label:"Aug 2014 - Nov 2014"}
];

const DateRangeDropDown = ({value, onChange}) => (
  <Dropdown options={options} onChange={onChange}/>
);

DateRangeDropDown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default DateRangeDropDown;
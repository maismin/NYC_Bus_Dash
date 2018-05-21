import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  {value:"2014-08-01,2014-09-01,2014-10-01", label:"Aug 2014 - Nov 2014"}
];

const DateRangeDropDown = ({value, onChange}) => (
  <Dropdown options={options} onChange={onChange} value={value}/>
);

DateRangeDropDown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default DateRangeDropDown;
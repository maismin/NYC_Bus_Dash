import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  {value:"10am", label:"7am-10am"},
  {value:"4pm", label:"10am-4pm"},
  {value:"7pm", label:"4pm-7pm"},
  {value:"10pm", label:"7pm-10pm"}
];

const TimeDropDown = ({value, onChange}) => (
  <Dropdown options={options} onChange={onChange}/>
);

TimeDropDown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default TimeDropDown;
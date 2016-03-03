import React from 'react';
import Globe from './globe';
import Map from './map';

var Select = require('react-select');

var Slider = {
  getInitialState() {
    return {
      status: 'menu-open',
      globestatus: 'globe-move'
    }
  },

  handleGlobeClick() {
    if (this.state.status == '') {
      this.setState({
        status: 'menu-open',
        globestatus: 'globe-move'
      })  
    } else {
      this.setState({
        status: '',
        globestatus: ''
      })
    }
  },

  handleSliderMapClick(code){
    if (code == '') {
      this.setState({
        status: 'menu-open'
      })
    } else {
      this.props.onMapClick(code);
      this.setState({
        status: '',
        globestatus: ''
      })
    } 
  },

  logChange(obj) {
    this.props.onMapClick(obj.value);
    jQuery('#vmap').vectorMap('deselect', this.props.countryCode);
    jQuery('#vmap').vectorMap('select', obj.value);
    this.setState({
      status: '',
      globestatus: ''
    })
  },

  // componentDidUpdate() {
    // $('.Select-placeholder').text('Select a country...');
    // $('.Select-clear-zone').children('.Select-clear').css('margin-left', '2%');
  // },
    
  render() {
    //var countryList = JSON.parse(localStorage.getItem('countries'));
    var countryList = this.props.countryList;
    var allCountries = [];
    for (var i = 0; i < countryList.length; i++) {
      allCountries.push({value: countryList[i].code, label: countryList[i].name});
    };
    return (
      <div id="outerslider">
        <div className={this.state.globestatus} id="globe">
          <Globe 
            onGlobeClick={this.handleGlobeClick} />
        </div>
        <div className={this.state.status} id="slider">
          <h3 id="intro">Where would you like to go?</h3>
          <Map 
            countryCode={this.props.countryCode}
            onMapClick={this.handleSliderMapClick}
          />
          <Select
            // className="chosen-select"
            placeholder="Select a country..."
            name="form-field-name"
            // value="0"
            options={allCountries}
            onChange={this.logChange}
          />
        </div>
      </div>
    )
  }
}

export default React.createClass(Slider)
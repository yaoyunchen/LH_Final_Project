import React from 'react';
import Globe from './globe';
import Map from './map';

var Slider = {
  getInitialState() {
    return {
      status: '',
      globestatus: ''
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
    this.props.onMapClick(code);
  },

  render() {
    return (
      <div id="outerslider">
      <div className={this.state.globestatus} id="globe">
        <Globe 
          onGlobeClick={this.handleGlobeClick} />
      </div>
        <div className={this.state.status} id="slider">
          <Map 
            countryCode={this.props.countryCode}
            onMapClick={this.handleSliderMapClick}
          />
        </div>
      </div>
    )
  }
}

export default React.createClass(Slider)
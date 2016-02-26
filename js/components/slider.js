import React from 'react';
import Globe from './globe';
import Map from './map';

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
    this.props.onMapClick(code);
    this.setState({
      status: '',
      globestatus: ''
    })
  },

  render() {
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
        </div>
      </div>
    )
  }
}

export default React.createClass(Slider)
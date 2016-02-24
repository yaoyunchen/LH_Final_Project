import React from 'react';
import Globe from './globe';
import Map from './map';

var Slider = {
  getInitialState() {
    return {
      status: ''
    }
  },

  handleGlobeClick() {
    if (this.state.status == '') {
      this.setState({
        status: 'menu-open'
      })  
    } else {
      this.setState({
        status: ''
      })
    }
  },

  handleSliderMapClick(code){
    this.props.onMapClick(code);
  },

  render() {
    return (
      <div>
        <Globe 
          onGlobeClick={this.handleGlobeClick} />
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
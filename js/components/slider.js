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



  // set state to 'show' on handleGlobeClick;

  render() {
    return (
      <div>
        <Globe 
          onGlobeClick={this.handleGlobeClick} />
        <div className={this.state.status} id="slider">
          <Map 
            countryCode={this.props.countryCode}
            onMapClick={this.props.handleMapClick}
          />
        </div>
      </div>
    )
  }
}

export default React.createClass(Slider)
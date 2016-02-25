import React from 'react';
import Overlay from './overlay';

var Footer = {
  getInitialState() {
    return {
      top: ''
    }
  },

  onLogoClick() {
    if(this.state.top == '') {
      this.setState({
        top: 'overlay-move'
      })
      console.log('testing this thang');
    } else {
      this.setState({
        top: ''
      })
    }
  },

  render() {
    
    return (
      <div>
        <div id="overlay" className={this.state.top} >
          <Overlay />
        </div>
      <footer>
        <div id="logo" onClick={this.onLogoClick}>
          <img id="main-logo" src="/assets/logo/glimpse_logo1.gif" />
          <img id="splash" src="/assets/logo/logoback1.png" />
        </div>
      </footer>
      </div>
    )
  }
}

export default React.createClass(Footer)
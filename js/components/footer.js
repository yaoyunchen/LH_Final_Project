import React from 'react';
import Overlay from './overlay';

var Footer = {
  getInitialState() {
    return {
      mode: 'none'
    }
  },

  onLogoClick() {
    if(this.state.mode === 'none') {
      this.setState({
        mode: 'block'
      })
      console.log('testing this thang');
    } else {
      this.setState({
        mode: 'none'
      })
    }
  },

  render() {
    var overlayStyle = {
      display: this.state.mode
    }
    
    return (
      <div>
        <div id="overlay" style={overlayStyle}>
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
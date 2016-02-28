import React from 'react';
import Overlay from './overlay';

var Footer = {
  getInitialState() {
    return {
      top: '',
      opacity: '0',
      userUrl: '',
      status: 'Loading ... '
    }
  },

  onLogoClick() {
    if(this.state.top == '') {
      this.setState({
        top: 'overlay-move',
        opacity: '1'
      })
    } else {
      this.setState({
        top: '',
        opacity: '0'
      })
    }
  },


  render() {
    var overlayStyle = {opacity: this.state.opacity}
    return (
      <div>
        <div id="overlay" style={overlayStyle} className={this.state.top}>
          <Overlay onLogoClick={this.onLogoClick} />
        </div>
      <footer>
        <div id="logo" onClick={this.onLogoClick}>
          <img id="main-logo" src="/assets/logo/glimpse_logo1.gif" />
          <img id="splash" src="/assets/logo/logoback1.png" />
        </div>
        <div id="video-info">
          <p id="video-title"><i><a href={this.props.userUrl}>{this.props.videoTitle}</a></i></p><p id="country-title">{this.props.countryName}</p>
        </div>
      </footer>
      </div>
    )
  }
}

export default React.createClass(Footer)
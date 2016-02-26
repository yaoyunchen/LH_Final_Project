import React from 'react';
import Overlay from './overlay';

var Footer = {
  getInitialState() {
    return {
      top: '',
      userUrl: '',
      status: 'Loading ... '
    }
  },

  onLogoClick() {
    if(this.state.top == '') {
      this.setState({
        top: 'overlay-move'
      })
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
        <div id="video-info">
          <p><a href={this.props.userUrl} >{this.props.videoTitle}</a>      
          <i>{this.props.countryName}</i></p>
        </div>
      </footer>
      </div>
    )
  }
}

export default React.createClass(Footer)
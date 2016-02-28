import React from 'react';

var Overlay = {
  // getInitialState() {
  //   return {
  //     image: ''
  //   }
  // },

  // componentWillReceiveUpdates() {
  //   const {display} = this.props
  //   if (display === 'none') {
  //     this.setState({
  //       mode: 'overlay-show'
  //     })
  //   } else {
  //     this.setState({
  //       mode: ''
  //     })
  //   }
  // },

  render() {
    // const {display} = this.props
    return (
      <div id="parent-overlay">
        <div id="overlay-content">
          <h1>Glimpse</h1>
          <h3><b>Glimpse is a global exploration and social discovery app where users can get a "glimpse" of various cultures and everyday events around the world through the eyes of others. Our app aims to provide a tranquil but visually-stimulating experience.</b></h3>
          <img id="flying-plane" src="/assets/flyingplane.gif" /> 
          <img onClick={this.props.onLogoClick} id="plane-icon" src="/assets/paperplane.png" />
          <h4><b>Created by Kay Cheng, Elaya Sison, Kenny Wu, and Andy Yao. © 2016.</b></h4>
        </div>
      </div>
    )
  }
}

export default React.createClass(Overlay)
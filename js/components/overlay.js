import React from 'react';

const images = {
  animated: "/assets/flyingplane.gif",
  static: "/assets/paperplane.png"
}

const ids = {
  animated: 'flying-plane',
  static: 'plane-icon'
}

var Overlay = {
  getInitialState() {
    return {
      image: images.static,
      id: ids.static
    }
  },

  componentWillReceiveProps(nextProp) {
    if (nextProp.value === '' || nextProp.value === 'overlay-move-back') {
      this.setState({
        image: images.animated,
        id: ids.animated
      })
    }
    if (nextProp.value === 'overlay-move') {
      this.setState({
        image: images.static,
        id: ids.static
      })
    }
  },

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
    return (
      <div id="parent-overlay">
        <div id="overlay-content">
          <h1>Glimpse</h1>
          <h3><b>Glimpse is a global exploration and social discovery app where users can get a "glimpse" of various cultures and everyday events around the world through the eyes of others. Our app aims to provide a tranquil but visually-stimulating experience.</b></h3>
          <div id="space-div">
            <div id="blank-space" className="hide-display"></div>
            <img onClick={this.props.onLogoClick} id={this.state.id} src={this.state.image} />
          </div>
          <h4><b>Created by Kay Cheng, Elaya Sison, Kenny Wu, and Andy Yao. © 2016.</b></h4>
        </div>
      </div>
    )
  }
}

export default React.createClass(Overlay)
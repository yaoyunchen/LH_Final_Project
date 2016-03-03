var React = require('react');

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
      animated: true
    };
  },

  componentWillReceiveProps(nextProp) {
    
    if (nextProp.value === '' || nextProp.value === 'overlay-move-back') {
      this.setState({
        animated: true
      })
    }

    if (nextProp.value === 'overlay-move') {
      this.setState({
        animated: false
      })
    }
  },

  render() {
  
    const staticStyle = {
      display: this.state.animated ? 'none' : 'block'
    };

    const staticImage = (<img 
      onClick={this.props.onLogoClick} 
      id={ids.static} 
      style={staticStyle}
      src={images.static}
    />);

    const animatedStyle = {
      display: this.state.animated ? 'block' : 'none'
    };

    const animatedImage = (<img 
      onClick={this.props.onLogoClick} 
      id={ids.animated} 
      style={animatedStyle} 
      src={images.animated+"?a="+Math.random()}
    />);

    return (
      <div id="parent-overlay">
        <div id="overlay-content">
          <h1>Glimpse</h1>
          <h3><b>Glimpse is a global exploration and social discovery app where users can get a "glimpse" of various cultures and everyday events around the world through the eyes of others. Our app aims to provide a tranquil and visually-stimulating experience.</b></h3>
          <div id="space-div">
            <div id="blank-space" className="hide-display"></div>
            {staticImage}{animatedImage}
          </div>
          <h4><b>Presented by Kay Cheng, Kenny Wu, and Andy Yao. © 2016.</b></h4>
        </div>
      </div>
    )
  }
}

export default React.createClass(Overlay)
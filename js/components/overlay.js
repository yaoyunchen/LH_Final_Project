import React from 'react';

var Overlay = {
  // getInitialState() {
  //   return {
  //     mode: ''
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
      <div id="overlay-content">
        <h1>Glimpse</h1>
        <p>Glimpse is a thing that does a thing.</p>
      </div>
    )
  }
}

export default React.createClass(Overlay)
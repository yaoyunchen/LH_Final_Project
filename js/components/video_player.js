import React from 'react';
import Video from 'video.js';
var VideoPlayer = {

  componentDidMount() {
    Video(document.getElementById("player"), {"playbackRates": [1, 2, 4]});
  },

  render(){
    return (
      <div>
        <video id="player" className="video-js vjs-default-skin"
          controls
          preload="auto"
          autoPlay
          loop
          src={this.props.videoUrl} 
        > 
        </video>
      </div>
    )
  }
}

export default React.createClass(VideoPlayer)
import React from 'react';
import Video from 'video.js';

var VideoPlayer = {


  componentDidMount() {
    Video(document.getElementById("player"), {
      'playbackRates': [0.25, 1, 2, 4],
      'controls': true,
      'autoplay': true
    }).ready(function() {
      this.playbackRate(0.25);
      //console.log('did mount', this.getCache())
      //console.log('did mount', this.load())
      //console.log('did mount', this.toJSON())
    });
  },
  
  playNextVideo(){
    this.props.onEnded();
  },

  componentWillReceiveProps() {
    Video(document.getElementById("player")).ready(function(){
      // console.log(this.duration());
      // console.log('receive_props', this.getCache())
      //console.log('receive props', this.load())
    });
  },

  render(){
    return (
      <div>
        <video id="player" className="video-js vjs-default-skin"
          
          preload="auto"
          poster="https://media.giphy.com/media/3AMRa6DRUhMli/giphy.gif"
          onEnded={this.playNextVideo}
          src={this.props.videoUrl} 
        > 
        </video>
      </div>
    )
  }
}

export default React.createClass(VideoPlayer)
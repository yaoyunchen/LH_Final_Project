var React = require('react');
var videojs = require('video.js');
var ReactDOM = require('react-dom');


var vidOptions = {
  "preload": 'auto',
  "autoplay": true,
  "controls": true,
  "playbackRates": [0.25, 1, 2, 4]
};


var vidDefaultOptions = {
  "preload": 'auto',
  "autoplay": true,
  "controls": false,
  "loop": true
};

var vidDefault = {
  src: "https://www.flickr.com/photos/wvs/2414600425/play/hd/a901c4406d/",
  playbackRate: 0.25
};

class VideoPlayer extends React.Component{
  constructor() {
    super();
    this.state = {
      playDefault: false
    }
    this.playNextVideo = this.playNextVideo.bind(this);
  }

  componentDidMount() {
    var that = this;
    var player = videojs(document.getElementById("player"), vidDefaultOptions, function(){
        player.playbackRate(vidDefault.playbackRate);
    });

    player.on("error", (e) => {
      if (this.props.countryCode != "") {
        console.log("Video Error - Loading another video from the country.")
        this.props.onEnded();
      } else {
        console.log("Video Error - Loading default.")
        this.setState({playDefault: true})
        player.playbackRate(vidDefault.playbackRate);
      }
    });


    var videojsBtn = videojs.getComponent('Button');


    var skipBtn = videojs.extend(videojsBtn, {
      constructor: function() {
        videojsBtn.call(this, player);
      },
      handleClick: function() {
        that.props.onEnded();
      }
    });

    var skip = player.controlBar.addChild(new skipBtn());
    skip.addClass("material-icons");
  }

  componentWillReceiveProps() {
    var player = videojs(document.getElementById("player"), vidOptions);
    this.setState({
      playDefault: false
    })
  }

  playNextVideo() {
    this.props.onEnded();
  }

  render(){
    var src = this.props.videoUrl
    if (this.state.playDefault === true) {
      src = vidDefault.src
    }
    if (this.props.videoPlayerStatus == 'vjs-tech hide-display') {
      $('video').get(0).pause();
    }

    return (

        <video 
          id="player" 
          className={this.props.videoPlayerStatus}
          poster= "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_Afghanistan_%281880%E2%80%931901%29.svg/900px-Flag_of_Afghanistan_%281880%E2%80%931901%29.svg.png"
          onEnded= {this.playNextVideo}
          src={src}
        > 
        </video>
    )
  }

};


export default VideoPlayer
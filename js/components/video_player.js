var React = require('react');
var videojs = require('video.js');


var vidOptions = {
  "preload": 'auto',
  "autoplay": true,
  "controls": true,
  "playbackRates": [0.25, 1, 2, 4]
};

var vidDefault = {
  src: "https://www.flickr.com/photos/wvs/2414600425/play/hd/a901c4406d/",
  poster: "https://media.giphy.com/media/3AMRa6DRUhMli/giphy.gif",
  //poster: "https://media.giphy.com/media/iMMfCfD9TLuCY/giphy.gif",
  playbackRate: 0.25
};

class VideoPlayer extends React.Component{
  constructor() {
    super();
    this.state = {
      playDefault: false
    }
    this.playNextVideo = this.playNextVideo.bind(this);

    // var player = videojs(document.getElementById("player"), vidOptions);
  }

  componentDidMount() {
    var that = this;
    var player = videojs(document.getElementById("player"), vidOptions, function(){
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

    return (
        <video id="player" className="video-js vjs-default-skin"
          poster={vidDefault.poster}
          onEnded= {this.playNextVideo}
          src={src}
        > 
        </video>
    )
  }

};


export default VideoPlayer
var React = require('react');
var SoundCloudAudio = require('soundcloud-audio');

const key = 'fa2d3ee788a538551b4a812ccabaf9b9';

var UtilsMixin = {
  prettyTime: function (value) {
    var hours = Math.floor(value / 3600),
      mins = '0' + Math.floor((value % 3600) / 60),
      secs = '0' + Math.floor((value % 60));

    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);

    if (!isNaN(secs)) {
      if (hours) {
        return hours + ':' + mins + ':' + secs;
      } else {
        return mins + ':' + secs;
      }
    } else {
      return '00:00';
    }
  },

  jsonp: function (url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
      delete window[callbackName];
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }
};

var PlayerMixin = {

  pauseAction: function () {
    this.audio.pause();
    this.setState({ 
      playing:false 
    });
  },

  playPauseAction: function () {
    if (this.state.playing) {
      this.pauseAction();
    } else {
      this.playAction();
    }
  },

  seekAction: function (e) {
    if (this.audio.currentTime) {
      var xPos = (e.pageX - e.target.getBoundingClientRect().left) / e.target.offsetWidth;
      this.audio.currentTime = (xPos * this.audio.duration);
    }
  }
};

var MusicPlayer = React.createClass({
  displayName: 'SCPlaylist',
  mixins: [UtilsMixin, PlayerMixin],

  getInitialState: function() {
    return {
      playing: false,
      currentTrack: 0,
      currentTime: 0,
      title: '',
      duration: ''
    };
  },

  componentWillMount: function() {
    var self = this;

    this.audio = document.createElement('audio');

    this.audio.addEventListener('timeupdate', function() {
      self.setState({
        currentTime : this.currentTime
      });
    }, false);

    this.audio.addEventListener('ended', function() {
      self.nextTrack();
    }, false);
  },

  componentWillReceiveProps(nextProps) {
    // Determine if user started on music mode or changed from video view.
    if (this.props.playMode == 'music' && this.props.setInitialMusic === true && nextProps.tracks.length != 0) {
      this.getinfo();

      // Changes setInitialMusic to false.
      this.props.setSCObject();
    } else if (this.props.playMode == 'video' && nextProps.playMode == 'music' && nextProps.tracks.length != 0) {
      this.getinfo();
      // Start playing music.
      this.setState({
        playing: true
      });
      this.playAction();
    }

    // Determine if the loading screen has ended.  If it did, start playing music.
    if (nextProps.loading == '' && nextProps.playMode == 'music' && nextProps.tracks.length != 0) {
      this.setState({
        playing: true
      });
      this.playAction();
    }


    // Pauses music when changing from music to video mode.
    if ((this.props.playMode == 'music' && nextProps.playMode == 'video') || (nextProps.loading == 'show-loading')) {
      this.setState({
        playing: false
      });
      this.pauseAction();
    }
  },

  playAction: function (i) {
    var ind = i !== undefined ? i : this.state.currentTrack,
      currentTrack = this.props.tracks[ind],
      audioUrl = currentTrack.stream_url + '?client_id=' + key;

    if (this.audio.src !== audioUrl) {
      this.audio.src = audioUrl;
    }
    this.audio.play();
    this.setState({ playing:true });
  },


  nextTrack: function () {
    var that = this;
    if (this.state.currentTrack + 1 >= this.props.tracks.length) {
      return;
    }
    var val = this.state.currentTrack + 1;
    this.setState({
      currentTrack: val
    }, function () {
      that.getinfo();
    });
    
    this.playAction(val);
  },

  previousTrack: function () {
    var that = this;
    if (this.state.currentTrack - 1 < 0) {
      return;
    }
    var val = this.state.currentTrack - 1;
    var that = this;
    this.setState({
      currentTrack: val
    }, function () {
      that.getinfo();
    });
    this.getinfo();
    this.playAction(val);
  },

  changeTrack: function (i) {
    this.setState({
      currentTrack: i
    });
    this.playAction(i);
  },

  getinfo: function () {
    var currentTrack = this.props.tracks[this.state.currentTrack] || {}
    this.setState({
      title: currentTrack.title,
      duration: currentTrack.duration/1000
    });
  },

  render: function() {
    var isActive;
    // var tracks = this.props.tracks.map(function (track, i) {
    //   isActive = this.state.currentTrack === i ? true : undefined;

    //   return <Track 
    //     track={track} 
    //     changeTrack={this.changeTrack}
    //     ind={i}
    //     isActive={isActive} 
    //   />;
    // }, this);

    // var currentTrack = this.props.tracks[this.state.currentTrack] || {}
    
    // var title = currentTrack.title
    // var duration = currentTrack.duration/1000
    
    var btnClassName = this.state.playing ? 'react-soundcloud-pause' : 'react-soundcloud-play';

    return(
      <div>
        <div className={this.props.musicPlayerStatus}>
          <button className="react-soundcloud-previous"
            type="button"
            onClick={this.previousTrack}
          ></button>
          <button className={btnClassName}
            type="button"
            onClick={this.playPauseAction}
          ></button>
          <button className="react-soundcloud-next"
            type="button"
            onClick={this.nextTrack}
          ></button>
          <span>
            {this.state.title + " " + this.prettyTime(this.state.currentTime) + " - " + this.prettyTime(this.state.duration)}
          </span>
          <progress className="react-soundcloud-progress"
            onClick={this.seekAction}
            value={this.state.currentTime / this.state.duration || 0}
          >
            {this.state.currentTime / this.state.duration || 0}
          </progress>
        </div>
      </div>
    ) 
  }
});

// var Track = React.createClass({
//   displayName: 'Track',
  
//   clickHandler: function () {
//     this.props.changeTrack(this.props.ind);
//   },
  
//   render: function () {
//     var title = this.props.track && this.props.track.title;
//     var track_class = 'react-soundcloud-track' + (this.props.isActive ? ' active' : '');
//     return React.DOM.div( {onClick:this.clickHandler, className:track_class}, 
//         this.props.ind + 1 + '.', " ", title
//       );
//   }
// });


export default MusicPlayer

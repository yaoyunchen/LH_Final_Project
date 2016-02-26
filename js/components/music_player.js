import React from 'react';
import SoundCloudAudio from 'soundcloud-audio';

var clientId = 'fa2d3ee788a538551b4a812ccabaf9b9'; //put here your clientID

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
    this.setState({ playing:false });
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


var MusicPlayer = React.createClass({displayName: 'SCPlayer',
  mixins: [UtilsMixin, PlayerMixin],

  getInitialState: function() {
    return {
      track: {},
      playing: false,
      currentTime: 0
    };
  },

  componentWillMount: function() {
    var src = this.props.musicUrl,
      url = "http://api.soundcloud.com/resolve.json?url=" + "https://soundcloud.com/thrilljockey/future-islands-balance" + "&client_id=" + clientId,
      _this = this;

    this.audio = document.createElement('audio');

    this.jsonp(url, function(data) {
      _this.setState({
        track: data
      });
    });

    this.audio.addEventListener('timeupdate', function() {
      _this.setState({
        currentTime : this.currentTime
      });
    }, false);

    this.audio.addEventListener('ended', function() {
      _this.setState({
        playing: false
      });
    }, false);
  },

  playAction: function () {
    var audioUrl = this.state.track.stream_url + '?client_id=' + clientId;
    if (this.audio.src !== audioUrl) {
      this.audio.src = audioUrl;
    }
    this.audio.play();
    this.setState({ playing:true });
  },

  render: function() {
    var title = this.state.track && this.state.track.title,
     duration = this.state.track && this.state.track.duration/1000,
     btnClassName = this.state.playing ? 'react-soundcloud-pause' : 'react-soundcloud-play';

    return  React.DOM.div(null, 
      React.DOM.div( {className:"player"}, 
        React.DOM.button( {type:"button", onClick:this.playPauseAction, className:btnClassName} ),
        React.DOM.span(null, title, " ", this.prettyTime(this.state.currentTime), " - ", this.prettyTime(duration)),
        React.DOM.div(null, 
          React.DOM.progress( {className:"react-soundcloud-progress",
              onClick:this.seekAction, value:this.state.currentTime / duration || 0} , 
            this.state.currentTime / duration || 0
          )
        )
      )
    );
  }

});


//TODO: move it to other file, and move same logic to mixins
var SCPlaylist = React.createClass({displayName: 'SCPlaylist',
  mixins: [UtilsMixin, PlayerMixin],

  getInitialState: function() {
    return {
      tracks: this.props.tracks || [],
      playing: false,
      currentTrack: 0,
      currentTime: 0
    };
  },

  componentWillMount: function() {
    var _this = this;

    this.initTracks();
    this.audio = document.createElement('audio');

    this.audio.addEventListener('timeupdate', function() {
      _this.setState({
        currentTime : this.currentTime
      });
    }, false);

    this.audio.addEventListener('ended', function() {
      _this.nextTrack();
    }, false);
  },

  initTracks: function () {
    var _this = this,
      _url, _track, _counter = 0, _tmp = [];
    
    for (var i = 0; i < this.state.tracks.length; ++i) {
      (function (i) {
        _track = _this.state.tracks[i];
        _url ="http://api.soundcloud.com/resolve.json?url=" + _track + "&client_id=" + clientId;
 
        _this.jsonp(_url, function(data) {
          _counter++;
          _tmp.push(data);
          if (_counter === _this.state.tracks.length) {
            _this.setState({
              tracks: _sortTracks(_tmp)
            });
          }
        });
      })(i);
    }

    //this done becouse we have async load of track data, and our tracks can be in random order
    //TODO: may it by option
    var _sortTracks = function (_tmp) {
      return _this.state.tracks.map(function (item) {
        for (var i = 0; i < _tmp.length; ++i) {
          if (item.split('soundcloud.com/')[1] === _tmp[i].permalink_url.split('soundcloud.com/')[1]) {
            return _tmp[i];
          }
        }
      })
    }

  },

  playAction: function (i) {
    var ind = i !== undefined ? i : this.state.currentTrack,
      currentTrack = this.state.tracks[ind],
      audioUrl = currentTrack.stream_url + '?client_id=' + clientId;

    if (this.audio.src !== audioUrl) {
      this.audio.src = audioUrl;
    }
    this.audio.play();
    this.setState({ playing:true });
  },

  nextTrack: function () {
    if (this.state.currentTrack + 1 >= this.state.tracks.length) {
      return;
    }
    var val = this.state.currentTrack + 1;
    this.setState({
      currentTrack: val
    });
    this.playAction(val);
  },

  previousTrack: function () {
    if (this.state.currentTrack - 1 < 0) {
      return;
    }
    var val = this.state.currentTrack - 1;
    this.setState({
      currentTrack: val
    });
    this.playAction(val);
  },

  changeTrack: function (i) {
    this.setState({
      currentTrack: i
    });
    this.playAction(i);
  },

  render: function() {
    var isActive;
    var tracks = this.state.tracks.map(function (track, i) {
      isActive = this.state.currentTrack === i ? true : undefined;

      return Track( {track:track, changeTrack:this.changeTrack, ind:i, isActive:isActive} );
    }, this);

    var currentTrack = this.state.tracks[this.state.currentTrack] || {},
      title = currentTrack.title,
      duration = currentTrack.duration/1000,
      btnClassName = this.state.playing ? 'react-soundcloud-pause' : 'react-soundcloud-play';

    return  React.DOM.div(null, 
      React.DOM.div( {className:"player"}, 
        React.DOM.button( {type:"button", onClick:this.previousTrack, className:"react-soundcloud-previous"} ),
        React.DOM.button( {type:"button", onClick:this.playPauseAction, className:btnClassName} ),
        React.DOM.button( {type:"button", onClick:this.nextTrack, className:"react-soundcloud-next"} ),
        React.DOM.span(null, title, " ", this.prettyTime(this.state.currentTime), " - ", this.prettyTime(duration)),
        React.DOM.progress( {className:"react-soundcloud-progress",
            onClick:this.seekAction, value:this.state.currentTime / duration || 0} , 
          this.state.currentTime / duration || 0
        ),
        tracks
      )
    );
  }
});

var Track = React.createClass({displayName: 'Track',
  clickHandler: function () {
    this.props.changeTrack(this.props.ind);
  },

  render: function () {
    var title = this.props.musicUrl && this.props.musicUrl.title;
    var track_class = 'react-soundcloud-track' + (this.props.isActive ? ' active' : '');
    return React.DOM.div( {onClick:this.clickHandler, className:track_class}, 
        this.props.ind + 1 + '.', " ", title
      );
  }
});

// class MusicPlayer extends React.Component {
 
//     render() {
//         return (
//             <SoundPlayerContainer streamUrl={streamUrl} clientId={clientId}>
//               <TrackInfo />
//               <PlayPause />
              
//             </SoundPlayerContainer>
//         );
//     }
// }

export default MusicPlayer

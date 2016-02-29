var React = require('react');
var ReactDOM = require('react-dom');
``
var shuffle = require('shuffle-array');

import VideoPlayer from './components/video_player';
import MusicPlayer from './components/music_player';
import Slider from './components/slider';
import Footer from './components/footer';
import LoadingScreen from './components/loading_screen';
import ToggleButtons from './components/toggle_buttons';

const keys = {
  flickrKey: "c01e0fde2a3823f1e80eed24d5b80e63",
  soundCloudKey: "fa2d3ee788a538551b4a812ccabaf9b9"
}

var file = './db/countries.json';

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      videoUrl: "https://www.flickr.com/photos/wvs/2414600425/play/hd/a901c4406d/",
      imageUrl: '',
      userUrl: '',
      countryList: [],
      countryCode: '',
      countryName: '',
      woe_id: '',
      place_id: '',
      cityList: [],
      cityName: '',
      getCode: false,
      loading: '',
      playMode: 'video',
      videoTitle: '',
      tracks: [],
      tmpTrack: '',
      musicUsers: [],
      musicPlayerStatus: 'hide-display',
      videoPlayerStatus: 'video-js vjs-default-skin'
    };

    this.handleMapClick = this.handleMapClick.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.newList = this.newList.bind(this);
    this.handleNextVideo = this.handleNextVideo.bind(this);
    this.startLoadingScreen = this.startLoadingScreen.bind(this);
    this.endLoadingScreen = this.endLoadingScreen.bind(this);
    this.scUsersQueryByCountry = this.scUsersQueryByCountry.bind(this);
    this.handleEyeClick = this.handleEyeClick.bind(this);
    this.handleMusicClick = this.handleMusicClick.bind(this);
  }

  componentDidMount() {
    this.loadCountries();
    setInterval(this.loadCountries.bind(this), this.props.pollInterval);
  }
  
  loadCountries() {
    $.ajax({
      url: file,
      dataType: 'json',
      success: (data) => {
        localStorage.clear();
        localStorage.setItem('countries', JSON.stringify(data)), function() {
        }
      }
    });
  }

  //called from flickrfindplace function
  //uses current state's country NAME
  scUsersQueryByCountry(country){
    var that = this;
    if (country !== '') {
      //limited to first 5 users (usually most popular)
      var strUrl = "http://api.soundcloud.com/users.json?client_id=" + keys.soundCloudKey + "&q=" + country;
      // + "&limit=10"
      this.serverRequest = $.get(strUrl, function(results) {
        //clear old requests
        that.setState({
          musicUsers: [],
          tracks: []
        })

        //repopulate current state with soundcloud user id
        for (var i = 0; i < results.length; i++){
          that.setState({
            musicUsers: that.state.musicUsers.concat(results[i].id)
          })
        }
        //invoke function to populate current state's tracklist with newly populated users
        
        that.scCreateTracklist()   
      })
    }
  }

  scCreateTracklist(){
    var that = this;

    var tmpTracks = [];

    var build = this.state.musicUsers.forEach( function(user) {
      //create a unique api request for each user on state's music users list
      var strUrl = "http://api.soundcloud.com/tracks.json?duration[from]=120000&duration[to]=300000&client_id=" + keys.soundCloudKey + "&user_id=" + user

      that.serverRequest = $.get(strUrl, function(results) {
        //make api request for all tracks of the users
        results.forEach( function(track){
          // console.log(track)
          if (track.length !== 0) {
            tmpTracks.push(track);
          }
        })
      })
    }) 

    this.setState({
      tracks: tmpTracks,
      musicReady: true
    })  
  }

  handleMapClick(code) {
    if (code !== '') {
      var that = this;
      
      if (this.state.countryList.length == 0) { 
        this.searchCountry(code, JSON.parse(localStorage.getItem('countries')));
      } else {
        this.searchCountry(code, this.state.countryList)
      }
    }
  }

  searchCountry(code, list) {
    var that = this;
    var found = false;
    var index = -1;
    
    for(var i=0; i < list.length; i++) {
      if(list[i].code == code) {
        found = true;
        this.setState({
          countryList: list,
          countryCode: code,
          countryName: list[i].name,
          cityList: list[i].cities,
          woe_id: list[i].woe_id,
          place_id: list[i].place_id
        }, function() {
          that.flickrPhotoPage(that.state.place_id, that.state.woe_id);
          that.scUsersQueryByCountry(that.state.countryName);
        });
        break;
      }
    }

    if (found === false) {
      this.flickrFindPlace(code, list);
    }
  }

  // Search for and add the country to the json file if it doesn't exist.
  flickrFindPlace(code, list) {
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.places.find&api_key=" + keys.flickrKey + "&query=" + code + "&format=json&nojsoncallback=1"
    this.serverRequest = $.get(strUrl, function(results){
      for (var i=0; i < results.places.place.length; i ++) {
        if (results.places.place[i].place_type == 'country') {
          var country = results.places.place[i];
          
          var name = country.place_url.replace(/\//, '');
          name = name.replace(/\+/, ' ');
          name = name.toUpperCase();
          
          // Empty placeholder for cities, no data actually returned.
          var cities = []

          var data = {
            "code": code,
            "name": name,
            "woe_id": country.woeid,
            "place_id": country.place_id,
            "cities": cities
          };
          list.push(data);
          
          localStorage.setItem('countries', JSON.stringify(list));
          var newList = JSON.parse(localStorage.getItem('countries'));
          
          that.newList(newList);
          that.searchCountry(code, newList);
  
        }
      }
    })
  }

  newList(list) {
    this.setState({
      countryList: list
    });
  }

  flickrPhotoPage(place_id, woe_id) {
    var that = this;
    if (that.state.countryCode != '') {
      that.startLoadingScreen();

      var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=10&page=&format=json&nojsoncallback=1";

      this.serverRequest = $.get(strUrl, function(results){
        var pagesNumber = results.photos.pages;
        var totalVideos = 10;

        if (pagesNumber == 1) {
          totalVideos = results.photos.total;
        } else {
          if (pagesNumber > 200) {
            pagesNumber = 200;
          }
          pagesNumber = Math.floor(Math.random() * (pagesNumber - 0 + 1) + 0);  
        }

        var arrayLength = results.photos.photo.length;
        
        if (arrayLength == 0) {
          pagesNumber = 1;
        } 

        that.flickrPhotoSearch(place_id,woe_id, totalVideos, pagesNumber);
      })
    }
  }

  flickrPhotoSearch(place_id, woe_id, totalVideos, pagesNumber) {
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=" +totalVideos + "&page=" + pagesNumber + "&format=json&nojsoncallback=1"
    
    // Add &pages to randomize played videos
    this.serverRequest = $.get(strUrl, function(results){

      var randomVideo = Math.floor(Math.random() * (totalVideos));

      var photo = results.photos.photo[randomVideo];

      if (typeof photo === 'undefined') {
        that.flickrPhotoPage(that.state.place_id, that.state.woe_id);  
      } else {
        that.flickrGetSizes(photo.id, photo.owner, photo.title);
        that.setState({
          videoTitle: photo.title,
          userUrl: "https://www.flickr.com/photos/" + photo.owner
        })
      }
    })
  }


  flickrGetSizes(id, owner, title) {
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.getSizes&api_key=" + keys.flickrKey + "&photo_id=" + id + "&format=json&nojsoncallback=1";

    this.serverRequest = $.get(strUrl, function(results){
      
      var size = results.sizes.size[results.sizes.size.length - 1];

      that.flickrEmbedVideo(size.source)
    })
  }

  flickrEmbedVideo(url) {
    this.setState({
      videoUrl: url
    })
    this.endLoadingScreen();
  }

  handleNextVideo(){
    var that = this;
    if (this.state.playMode == 'video' && this.state.countryCode != '') {
      this.flickrPhotoPage(that.state.place_id, that.state.woe_id);  
    }
  }

  startLoadingScreen() {
    this.setState({
      loading:'show-loading'
    })
  }

  endLoadingScreen() {
    this.setState({
      loading: ''
    })
  }

  handleEyeClick() {
    this.setState({
      videoPlayerStatus: 'vjs-tech',
      musicPlayerStatus: 'hide-display',
      playMode: 'video'
    })
    
    $('video').get(0).play();
  }
  
  handleMusicClick() {
    this.setState({
      videoPlayerStatus: 'vjs-tech hide-display',
      musicPlayerStatus: 'music-player',
      playMode: 'music'
    });

    $('video').get(0).pause();
    
  }

  render(){
    return (
      <div id="container2">
        <ToggleButtons
          handleEyeClick={this.handleEyeClick}
          handleMusicClick={this.handleMusicClick}
        />
        <Slider 
          countryCode={this.state.countryCode}
          onMapClick={this.handleMapClick}
          countryList={this.state.countryList}
        />
        <LoadingScreen 
          loading={this.state.loading}
        />
        <VideoPlayer
          videoPlayerStatus={this.state.videoPlayerStatus}
          onEnded={this.handleNextVideo}
          countryCode={this.state.countryCode}
          videoUrl={this.state.videoUrl}
          loading={this.state.loading}
          endLoadingScreen={this.endLoadingScreen}
        />
        <Footer 
          videoTitle={this.state.videoTitle}
          countryName={this.state.countryName}
          userUrl={this.state.userUrl}
        />
        <MusicPlayer
          musicPlayerStatus={this.state.musicPlayerStatus}
          countryCode={this.state.countryCode}
          key={keys.soundCloudKey}
          tracks={this.state.tracks}
          playMode={this.state.playMode}
        />
      </div>
      )
  }

};

export default App




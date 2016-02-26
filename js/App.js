var React = require('react');
// import ReactDOM from 'react-dom';

import VideoPlayer from './components/video_player';
import MusicPlayer from './components/music_player';
import Slider from './components/slider';
import Footer from './components/footer';
import LoadingScreen from './components/loading_screen';


var keys = {
  flickrKey: "c01e0fde2a3823f1e80eed24d5b80e63",
  soundCloudKey: "fa2d3ee788a538551b4a812ccabaf9b9"
}

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      videoUrl: 'https://www.flickr.com/photos/wvs/2414600425/play/hd/a901c4406d/',
      imageUrl: '',
      musicUrl: 'https://soundcloud.com/thrilljockey/future-islands-balance',
      userUrl: '',
      countryCode: '',
      countryName: '',
      cityName: '',
      getCode: false,
      loading: '',
      playMode: 'videos',
      videoTitle: '',
      songTitle: ''
    };
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleNextVideo = this.handleNextVideo.bind(this);
    this.startLoadingScreen = this.startLoadingScreen.bind(this);
    this.endLoadingScreen = this.endLoadingScreen.bind(this);
  }


  handleMapClick(code) {
    this.setState({
      countryCode: code
    }, function() {
      this.flickrFindPlace(this.props.countryCode)
    });
  }


  flickrFindPlace(code) {

    var that = this

    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.places.find&api_key=" + keys.flickrKey + "&query=" + this.state.countryCode + "&format=json&nojsoncallback=1"

    this.serverRequest = $.get(strUrl, function(results){
      for (var i=0; i < results.places.place.length; i ++) {
          if (results.places.place[i].place_type == 'country') {
            var country = results.places.place[i];
            var countryName = country.place_url.replace(/\//, ' ');
            countryName = countryName.replace(/\+/, ' ');
            countryName = countryName.toUpperCase();

            that.setState({
              countryName: countryName
            })

            that.startLoadingScreen();
            that.flickrPhotoPage(country.place_id, country.woeid);
          }
      }
    })
  }


  flickrPhotoPage(place_id, woe_id) {
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=10&page=&format=json&nojsoncallback=1";

    this.serverRequest = $.get(strUrl, function(results){

      var pagesNumber = results.photos.pages;
      var totalVideos = 10

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

      that.flickrPhotoSearch(place_id,woe_id, totalVideos, pagesNumber)
    })

  }

  flickrPhotoSearch(place_id, woe_id, totalVideos, pagesNumber) {
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=" +totalVideos + "&page=" + pagesNumber + "&format=json&nojsoncallback=1"
    
    // Add &pages to randomize played videos
    this.serverRequest = $.get(strUrl, function(results){

      var randomVideo = Math.floor(Math.random() * (totalVideos));

      var photo = results.photos.photo[randomVideo];

      if (typeof photo === 'undefined') {
        that.flickrFindPlace(that.props.countryCode)
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
    this.flickrFindPlace(this.props.countryCode)
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


  render(){
    return (
      <div id="container2">
        <Slider 
          countryCode={this.state.countryCode}
          onMapClick={this.handleMapClick}
        />
        <LoadingScreen 
          loading={this.state.loading}
        />
        <VideoPlayer
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
          musicUrl={this.musicUrl}
          countryCode={this.state.countryCode}
          key={keys.soundCloudKey}
        />
      </div>
      )
  }

};

export default App


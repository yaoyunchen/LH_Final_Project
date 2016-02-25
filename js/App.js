import React from 'react';
import ReactDOM from 'react-dom'
import VideoPlayer from './components/video_player';
// import Map from './components/map';
import Slider from './components/slider';
// import Globe from './components/globe';
import Footer from './components/footer';
// import Overlay from './components/overlay';


var App = {
  getInitialState(){
    return {
      videoUrl: "https://www.flickr.com/photos/wvs/2414600425/play/hd/a901c4406d/",
      imageUrl: '',
      musicUrl: '',
      countryCode: '',
      countryName: '',
      getCode: false,
      countryCache: '',
      cityName: '',
      playMode: 'videos',
      videoTitle: '',
      userUrl: ''
    }
  },


  handleMapClick : function(code) {
    
    this.setState({
      countryCode: code
    }, function() {
      this.flickrFindPlace(this.props.countryCode)
    });
    
  },


  flickrFindPlace : function(code) {
    var that = this

    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.places.find&api_key=c01e0fde2a3823f1e80eed24d5b80e63&query=" + this.state.countryCode + "&format=json&nojsoncallback=1"
    console.log(strUrl)
    this.serverRequest = $.get(strUrl, function(results){
      for (var i=0; i < results.places.place.length; i ++) {
          if (results.places.place[i].place_type == 'country') {
            var country = results.places.place[i];
            var countryName = country.place_url.replace(/\//, '');

            that.setState({
              countryName: countryName
            })

            that.flickrPhotoPage(country.place_id, country.woeid);
          }
      }
    })
  },

  flickrPhotoPage : function(place_id, woe_id){
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=c01e0fde2a3823f1e80eed24d5b80e63&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=10&page=&format=json&nojsoncallback=1";

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

  },

  flickrPhotoSearch : function(place_id, woe_id, totalVideos, pagesNumber){
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=c01e0fde2a3823f1e80eed24d5b80e63&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=" +totalVideos + "&page=" + pagesNumber + "&format=json&nojsoncallback=1"
    
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
        console.log(that.state.userUrl);
      }
      
    })
  },


  flickrGetSizes : function(id, owner, title) {
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.getSizes&api_key=c01e0fde2a3823f1e80eed24d5b80e63&photo_id=" + id + "&format=json&nojsoncallback=1";

    this.serverRequest = $.get(strUrl, function(results){
      
      var size = results.sizes.size[results.sizes.size.length - 1];

      that.flickrEmbedVideo(size.source)
    })
  },


  flickrEmbedVideo(url) {
    this.setState({
      videoUrl: url
    })
  },

  handleNextVideo(){
    this.flickrFindPlace(this.props.countryCode)
  },  

  render(){

    return (
      <div id="container2">
        <Slider 
          countryCode={this.state.countryCode}
          onMapClick={this.handleMapClick}
        />
        <VideoPlayer
          onEnded={this.handleNextVideo}
          videoUrl={this.state.videoUrl}
          countryCode={this.state.countryCode}
          getCode={this.state.getCode}
          flickrFindPlace={this.flickrFindPlace}
          flickrPhotoSearch={this.flickrPhotoSearch}
          flickrGetSizes={this.flickrGetSizes}
          flickrEmbedVideo={this.flickrEmbedVideo}
        />
        <Footer 
          videoTitle={this.state.videoTitle}
          countryName={this.state.countryName}
          userUrl={this.state.userUrl}
        />
      </div>
      )
  }
};

export default React.createClass(App)

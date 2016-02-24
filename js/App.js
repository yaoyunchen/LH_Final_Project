import React from 'react';
import ReactDOM from 'react-dom'
import VideoPlayer from './components/video_player';
// import Map from './components/map';
import Slider from './components/slider';
// import Globe from './components/globe';


var App = {
  getInitialState(){
    return {
      videoUrl: "https://www.flickr.com/photos/132209807@N03/23853274680/play/hd/574c827b24/",
      imageUrl: '',
      musicUrl: '',
      countryCode: '',
      getCode: false,
      countryCache: '',
      cityName: '',
      playMode: 'videos',
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
    
    this.serverRequest = $.get(strUrl, function(results){
      for (var i=0; i < results.places.place.length; i ++) {
          if (results.places.place[i].place_type == 'country') {
            var country = results.places.place[i];
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
      console.log('photos', results.photos.photo)
       console.log('photos photo', results.photos.photo)
      console.log('array length', arrayLength)
      console.log('pages number', pagesNumber)
      console.log('PAY ATTN FUCKNI', place_id,woe_id, totalVideos, pagesNumber)

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

      if (typeof photo.id === 'undefined') {
        console.log("FIXING SHIT UP BRO");
        that.flickrFindPlace(this.props.countryCode)
      } else {
        that.flickrGetSizes(photo.id, photo.owner, photo.title);
      }
      
    })
  },


  flickrGetSizes : function(id, owner, title) {
    var that = this
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.getSizes&api_key=c01e0fde2a3823f1e80eed24d5b80e63&photo_id=" + id + "&format=json&nojsoncallback=1"
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
      </div>
      )
  }
};

export default React.createClass(App)

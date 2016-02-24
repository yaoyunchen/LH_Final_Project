import React from 'react';
import ReactDOM from 'react-dom'
import VideoPlayer from './components/video_player';
import Map from './components/map';


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
      playMode: 'videos'
    }
  },


  handleMapClick : function(code) {
    
    this.setState({
      countryCode: code
    }, function() {
      this.flickrFindPlace(this.props.countryCode)
    });
    console.log("HANDLING MAP CLICK");
    console.log('first', this);
    
  },


  flickrFindPlace : function(code) {
    var that = this
    console.log("FINDING PLACE")
    console.log('second', this)

    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.places.find&api_key=c01e0fde2a3823f1e80eed24d5b80e63&query=" + this.state.countryCode + "&format=json&nojsoncallback=1"
    
    this.serverRequest = $.get(strUrl, function(results){
      for (var i=0; i < results.places.place.length; i ++) {
          if (results.places.place[i].place_type == 'country') {
            var country = results.places.place[i];
            that.flickrPhotoSearch(country.place_id, country.woeid);
          }
      }
    })
  },

  flickrPhotoSearch : function(place_id, woe_id){
    var that = this;
    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=c01e0fde2a3823f1e80eed24d5b80e63&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=10&format=json&nojsoncallback=1"
    
    // Add &pages to randomize played videos

    this.serverRequest = $.get(strUrl, function(results){
      var photo = results.photos.photo[0];
      
      // for (var i=0; i < photos.length; i ++) {
      //     //console.log(results.photos.photos[i])
      // }
      that.flickrGetSizes(photo.id, photo.owner, photo.title);
      
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

  render(){

    return (
      <div>
        <Map 
          countryCode={this.state.countryCode}
          onMapClick={this.handleMapClick}
        />
        <VideoPlayer
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

// call and bind


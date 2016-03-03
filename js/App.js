var React = require('react');
var ReactDOM = require('react-dom');

var shuffle = require('shuffle-array');

import VideoPlayer from './components/video_player';
import MusicPlayer from './components/music_player';
import ImageSlideshow from './components/image_slideshow';
import Slider from './components/slider';
import Footer from './components/footer';
import LoadingScreen from './components/loading_screen';
import ToggleButtons from './components/toggle_buttons';

const keys = {
  flickrKey: "c01e0fde2a3823f1e80eed24d5b80e63",
  soundCloudKey: "fa2d3ee788a538551b4a812ccabaf9b9"
}

const file = './db/countries.json';

var App = React.createClass({
  getInitialState: function() {
    return {
      countryList: [],
      countryCode: '',
      countryName: '',
      woe_id: '',
      place_id: '',
      cityList: [],
      cityName: '',
      getCode: false,
      loading: '',
      videoList: [],
      videoUrl: "https://www.flickr.com/photos/wvs/2414600425/play/hd/a901c4406d/",
      videoPlayerStatus: 'video-js vjs-default-skin',
      imageList: [],
      imageUrl: 'https://static.pexels.com/photos/279/black-and-white-branches-tree-high.jpg',
      objTitle: '',
      userUrl: '',
      tracks: [],
      tmpTrack: '',
      musicUsers: [],
      musicPlayerStatus: 'hide-display',
      playMode: 'video',
      setInitialVideo: true,
      setInitialMusic: true,
      setInitialImage: true,
      slideshowStatus: '',
      footerStatus: 'video-info',
      reload: false
    };
  },

  componentDidMount() {
    // Loads the countries from the json file to local storage so doesn't have to search Flickr.
    $.ajax({
      url: file,
      dataType: 'json',
      success: (data) => {
        //localStorage.setItem('countries', JSON.stringify(data))
        this.setState({
          countryList: data
        })
      }
    });
  },
  
 
  scUsersQueryByCountry(country){
    var that = this;
    if (country !== '') {
      var strUrl = "http://api.soundcloud.com/users.json?client_id=" + keys.soundCloudKey + "&q=" + country;

      this.serverRequest = $.get(strUrl, function(results) {
        //clear old requests
        that.setState({
          musicUsers: [],
          tracks: [], 
          setInitialMusic: true
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
  },

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
  },

  handleMapClick(code) {
    if (code !== '') {
      var that = this;
      this.searchCountry(code, this.state.countryList)      
      // if (this.state.countryList.length == 0) { 
      //   this.searchCountry(code, JSON.parse(localStorage.getItem('countries')));

      // } else {
      //   this.searchCountry(code, this.state.countryList)
      // }
    }
  },

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
          that.startLoadingScreen();

          // Load video URLs.
          that.flickrPhotoPage(that.state.place_id, that.state.woe_id, "videos");
          // Load image URLs.
          that.flickrPhotoPage(that.state.place_id, that.state.woe_id, "images");
          // Load music URLs.
          that.scUsersQueryByCountry(that.state.countryName);
        });
        break;
      }
    }

    // if (found === false) {
    //   this.flickrFindPlace(code, list);
    // }
  },

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
  },

  newList(list) {
    this.setState({
      countryList: list
    });
  },

  flickrPhotoPage(place_id, woe_id, type) {
    if (this.state.countryCode != '') {
      var that = this;

      var strUrl = '';
      if (type == 'videos') {
        strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=5&format=json&nojsoncallback=1";
        this.setState({
          videoList: [],
          setInitialVideo: true
        });
      } else if (type == 'images') {
         strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&per_page=50&format=json&nojsoncallback=1";
        this.setState({
          imageList: []
        });
      }

      this.serverRequest = $.get(strUrl, function(results) {
        var pagesNumber = results.photos.pages;
        var totalObjectsOnPage = 5;
        
        // If there's only one page, set the total objects number to the total objects existing within the page.
        if (pagesNumber == 1) {
          totalObjectsOnPage = results.photos.total;
        } else {
          // Flickr breaks when searches go over 200 pages without limiting parameters.
          if (pagesNumber > 100) {
            pagesNumber = 100;
          }
          // Set the page number of objects to be loaded to be a random page 
          pagesNumber = Math.floor(Math.random() * (pagesNumber - 0 + 1) + 0);  
        }
     
       
        // If the page selected has no objects, set it to the first page since there will be videos there.
        var arrayLength = results.photos.photo.length;
        if (arrayLength != 5) {
          pagesNumber = 1;
        } 

        //Getting the actual URLs for objects based on page number.
        that.flickrPhotoSearch(place_id, woe_id, totalObjectsOnPage, pagesNumber, type);
      })
    }
  },

  flickrPhotoSearch(place_id, woe_id, totalObjectsOnPage, pagesNumber, type) {
    var that = this;

    var strUrl = '';
    if (type == 'videos') {
      strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&media=videos&per_page=5&page=" + pagesNumber + "&format=json&nojsoncallback=1";
    } else if (type == 'images') {
       strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + keys.flickrKey + "&woe_id=" + woe_id + "&place_id=" + place_id + "&per_page=50&page=1&format=json&nojsoncallback=1";
    }
    this.serverRequest = $.get(strUrl, function(results) {
      var objectArray = results.photos.photo;
      for (var i = 0; i < objectArray.length; i++ ){
        if (typeof objectArray[i] != 'undefined') {
          that.flickrGetSizes(objectArray[i], type);
        }
      } 
    })
  },


  flickrGetSizes(object, type) {
    var that = this;
    var id = object.id;
    var owner_url = "https://www.flickr.com/photos/" + object.owner;
    var objTitle = object.title;

    var strUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.getSizes&api_key=" + keys.flickrKey + "&photo_id=" + id + "&format=json&nojsoncallback=1";
    
    this.serverRequest = $.get(strUrl, function(results) {
      
      var size = results.sizes.size[results.sizes.size.length - 1];

      var obj = {
        objTitle: objTitle,
        url: size.source,
        userUrl: owner_url
      }

      that.insertIntoArray(obj, type);
    })
  },

  insertIntoArray(obj, type) {
    if (type == 'videos') {
      this.setState({
        videoList: this.state.videoList.concat(obj)
      });
    } else if (type == 'images') {
      this.setState({
        imageList: this.state.imageList.concat(obj)
      });
    }
  },

  setFlickrObject(objUrl, objTitle, objUser, type) {
    if (type == "video") {
      this.setState({
        videoUrl: objUrl,
        objTitle: objTitle,
        userUrl: objUser,
        setInitialVideo: false,
        reload: false
      }); 
      if (this.state.loading != '') {
        this.endLoadingScreen();
      }
    }
    if (type == "images") {
      this.setState({
        imageUrl: objUrl,
        objTitle: objTitle,
        userUrl: objUser,
        setInitialImage: false,
      });
    }
  },

  setSCObject() {
    this.setState({
      setInitialMusic: false
    })
  },

  handleNextObject(type){

    var that = this;
    
    var videoList = this.state.videoList;
    var currentVideo = this.state.videoUrl;
    var nextVideo = [];

    // Check if the video exists within the current array.
    var videoExists = this.videoExist(currentVideo);

    if (videoExists == true) {
      // If the video exists, find the next video.
      nextVideo = this.findNextVideo();

      // If the next video is the same as the last video in the array, load five new videos in the array.
      if (nextVideo[0] == this.state.videoList[videoList.length-1].url) {
        // Load new array.
        this.setState({
          reload: true
        });
        this.flickrPhotoPage(that.state.place_id, that.state.woe_id, "videos");
      }
      // Skip the video.
      return that.setFlickrObject(nextVideo[0], nextVideo[1], nextVideo[2], "video");
    } else {
      // If the video does not exist, load the first video in the current array.
      if (this.state.videoList.length != 0) {
        // Skip the video.
        return that.setFlickrObject(videoList[0].url, videoList[0].objTitle, videoList[0].userUrl, "video");
      } else {
        // If for some reason there's no array, load the array first.
        that.flickrPhotoPage(that.state.place_id, that.state.woe_id, "videos");
        that.setState({
          reload: true
        });

        // //Skip the video.
        // return that.setFlickrObject(videoList[0].url, videoList[0].objTitle, videoList[0].userUrl, "video");  
      }
    }

    // for(var i = 0; i < videoList.length - 1; i++) {
    //   if (videoList[i].url == this.state.videoUrl) {
    //     var nextVid = videoList[i + 1].url;
    //     var nextTitle = videoList[i + 1].objTitle;
    //     var nextUser = videoList[i + 1].userUrl;
        
    //     if (videoList[i + 1].url == videoList[videoList.length-1].url) {
    //       that.flickrPhotoPage(that.state.place_id, that.state.woe_id, "videos");
    //       that.setState({
    //         reload: true
    //       });
    //     }
    //     return that.setFlickrObject(nextVid, nextTitle, nextUser, "video");
    //   }
    // }
  },

  videoExist: function(currentVideo) {
    var videoList = this.state.videoList;
    var result = false;
    for(var i = 0; i < videoList.length - 1; i++) {
      if (videoList[i].url == currentVideo) {
        result = true;
      }
    }
    return result;
  },

  findNextVideo: function() {
    var videoList = this.state.videoList;
    for(var i = 0; i < videoList.length - 1; i++) {
      if (videoList[i].url == this.state.videoUrl) {
        var nextVid = videoList[i + 1].url;
        var nextTitle = videoList[i + 1].objTitle;
        var nextUser = videoList[i + 1].userUrl;
        return ([nextVid, nextTitle, nextUser]);
      }
    }
  },

  startLoadingScreen() {
    this.setState({
      loading:'show-loading'
    }, function() {
      ReactDOM.render(
        <LoadingScreen 
          loading={this.state.loading}
        />,
        document.getElementById('loading')
      )
    })
  },

  endLoadingScreen() {
    this.setState({
      loading: ''
    }, function() {
      ReactDOM.unmountComponentAtNode(document.getElementById('loading'))
    })
  },

  handleEyeClick() {
    this.setState({
      videoPlayerStatus: 'vjs-tech',
      musicPlayerStatus: 'hide-display',
      slideshowStatus: '',
      playMode: 'video',
      footerStatus: 'video-info'
    })
    
    $('video').get(0).play();
  },
  
  handleMusicClick() {
    this.setState({
      videoPlayerStatus: 'vjs-tech hide-display',
      musicPlayerStatus: 'music-player',
      playMode: 'music',
      slideshowStatus: 'slideshowStyle imageStyle',
      footerStatus: 'hide-display'
    });

    $('video').get(0).pause();
    
  },

  render: function() {
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
        <div id = 'loading'></div>
        <VideoPlayer
          videoPlayerStatus={this.state.videoPlayerStatus}
          onEnded={this.handleNextObject}
          countryCode={this.state.countryCode}
          videoList={this.state.videoList}
          videoUrl={this.state.videoUrl}
          loading={this.state.loading}
          setInitialVideo={this.state.setInitialVideo}
          setFlickrObject={this.setFlickrObject}
          reload={this.state.reload}
          playMode={this.state.playMode}
        />
        <ImageSlideshow
          countryCode={this.state.countryCode}
          playMode={this.state.playMode}
          imageUrl={this.state.imageUrl}
          slideshowStatus={this.state.slideshowStatus}
          setFlickrObject={this.setFlickrObject}
          imageList={this.state.imageList}
          setInitialImage={this.state.setInitialImage}
        />
        <MusicPlayer
          musicPlayerStatus={this.state.musicPlayerStatus}
          countryCode={this.state.countryCode}
          key={keys.soundCloudKey}
          tracks={this.state.tracks}
          playMode={this.state.playMode}
          setInitialMusic={this.state.setInitialMusic}
          setSCObject={this.setSCObject}
          loading={this.state.loading}
        />
        <Footer 
          objTitle={this.state.objTitle}
          footerStatus={this.state.footerStatus}
          countryName={this.state.countryName}
          userUrl={this.state.userUrl}
        />
      </div>
    )
  }
});

export default App




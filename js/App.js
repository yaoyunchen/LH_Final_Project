import React from 'react';
import ReactDOM from 'react-dom'
import VideoPlayer from './components/video_player';
import Map from './components/map';

export default React.createClass({
  //This is not used in ES6 classes!!!
  getInitialState(){
    return {
      videoUrl: "https://www.flickr.com/photos/132209807@N03/23853274680/play/hd/574c827b24/",
      imageUrl: '',
      musicUrl: '',
      countryCode: '',
      cityName: ''
    }
  },

  // constructor() {
  //   super();
  //   this.state = {
  //     videoUrl: "https://www.flickr.com/photos/132209807@N03/23853274680/play/hd/574c827b24/",
  //     imageUrl: '',
  //     musicUrl: '',
  //     countryCode: 'CA',
  //     cityName: ''
  //   }
  // }

  // // Functions go here.
  // buildMap(code){
  //   this.setState({

  //   })
  // }


  handleMapClick(code) {
    this.setState({
      countryCode: code
    });
    //console.log(this.state.countryCode)
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
        />

      </div>
      )
  }
})


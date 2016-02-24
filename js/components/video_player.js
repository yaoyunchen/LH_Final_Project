import React from 'react';


var VideoPlayer = {

  // componentWillReceiveProp() {
  //   this.props.flickrFindPlace(this.props.countryCode)
  //   // console.log('test',this);
  //   // console.log("TIME FOR SHIT TO CHANGE")
  //   // console.log(this.props.getCode)
  //   // if (this.props.getCode === true) {
  //   //   console.log("SHIT IS CHANGING")
  //   //   this.props.flickrFindPlace(this.props.countryCode)
  //   // } else {
  //   //   console.log("SHIT DOESNT NEED TO CHANGE")
  //   // }
  //   // console.log('test2',this);
  //   // return true;
  // },

  playNextVideo(){
    this.props.onEnded();
  },

  render(){
    return (
      <div>
        <video onEnded={this.playNextVideo} id="player" controls autoPlay src={this.props.videoUrl} type="video/mp4">
        </video>
      </div>
    )
  }
}

export default React.createClass(VideoPlayer)
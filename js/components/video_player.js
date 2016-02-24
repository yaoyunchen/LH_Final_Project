import React from 'react';


class VideoPlayer extends React.Component {

  shouldComponentUpdate() {
    console.log('test',this);
    console.log("TIME FOR SHIT TO CHANGE")
    console.log(this.props.getCode)
    if (this.props.getCode === true) {
      console.log("SHIT IS CHANGING")
      this.props.flickrFindPlace(this.props.countryCode)
    } else {
      console.log("SHIT DOESNT NEED TO CHANGE")
    }
    console.log('test2',this);
    return true;
  }


  render(){
    return (
      <div>
        <video width="100%" height="100%" controls autoPlay>
          <source src={this.props.videoUrl} type="video/mp4">
          </source>
        </video>
      </div>
    )
  }
}

export default VideoPlayer
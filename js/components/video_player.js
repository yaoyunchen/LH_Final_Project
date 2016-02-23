import React from 'react';


class VideoPlayer extends React.Component {
  // componentWillMount() {
  //   this.setState({
  //     video_url: "https://www.flickr.com/photos/132209807@N03/23853274680/play/hd/574c827b24/"
  //   })
  // }

  // componentDidMount() {
    
  // }

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
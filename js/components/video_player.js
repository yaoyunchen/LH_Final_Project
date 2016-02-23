import React from 'react';

class VideoPlayer extends React.Component {
render(){
  var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "15eb0376258be9a35a642a28973fa317",
      secret: "f2c7887a440ecaf4"
    };
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object,
  // but we can only call public methods and access public data
  
  });

  return (
    <div>
      <p>EAT SHIT</p>
    </div>
    )
  }
}

export default VideoPlayer
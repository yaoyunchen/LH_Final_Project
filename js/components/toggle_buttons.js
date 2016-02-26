import React from 'react';

var ToggleButtons = {
  render() {
    var eye_content = <i className="material-icons">visibility</i>
    var audio_content = <i className="material-icons">headset</i>
    return (
      <div id="mode-toggle">
        <button id="video-toggle">{eye_content}</button>
        <button id="slideshow-toggle">{audio_content}</button>
      </div>
    )
  }
}

export default React.createClass(ToggleButtons)
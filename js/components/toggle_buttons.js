import React from 'react';

var ToggleButtons = {
  getInitialState(){
    return {
      eyeStatus: 'focused',
      musicStatus: ''
    }
  },

  handleEyeClick(){
    this.setState({
      eyeStatus: 'focused',
      musicStatus: ''
    })
  },

  handleMusicClick(){
    this.setState({
      eyeStatus: '',
      musicStatus: 'focused'
    })  
  },

  render() {
    var eye_content = <i className="material-icons">visibility</i>
    var audio_content = <i className="material-icons">headset</i>
    return (
      <div id="mode-toggle">
        <button onClick={this.handleEyeClick} className={this.state.eyeStatus} id="video-toggle">{eye_content}</button>
        <button onClick={this.handleMusicClick} className={this.state.musicStatus} id="slideshow-toggle">{audio_content}</button>
      </div>
    )
  }
}

export default React.createClass(ToggleButtons)
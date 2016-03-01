var React = require('react');

var ImageSlideshow = {

  getInitialState() {
    return {
    status: 'slideshowStyle hide-display',
    imageList: []
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.playMode == 'video' && nextProps.playMode == 'music') {
      this.setState({
        status: 'slideshowStyle',
        imageList: this.props.imageList
      })
    } else if (this.props.playMode == 'music' && nextProps.playMode == 'video') {
      this.setState({
        status: 'slideshowStyle hide-display'
      });
    }
  },

  render() {
    return (
      <div className={this.state.status}>
        <img className="imageStyle" src="https://static.pexels.com/photos/279/black-and-white-branches-tree-high.jpg" />
      </div>
    )
  }

}

export default React.createClass(ImageSlideshow)
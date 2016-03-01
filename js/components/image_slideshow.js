var React = require('react');

var ImageSlideshow = {

  componentWillReceiveProps(nextProps) {
    if (this.props.setInitialImage == true && this.props.imageList.length != 0) {
      var object=this.props.imageList;
      var index=this.props.imageIndex;
      this.props.setFlickrObject(object[index].url, object[index].title, object[index].user_url, "images")
    }
  },

  render() {
    return (
      <div>
        <img className={this.props.slideshowStatus} src={this.props.imageUrl} />
      </div>
    )
  }

}

export default React.createClass(ImageSlideshow)
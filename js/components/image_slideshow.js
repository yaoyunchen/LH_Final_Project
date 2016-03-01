var React = require('react');

var ImageSlideshow = {

  componentWillReceiveProps(nextProps) {
    if (this.props.setInitialImage == true && this.props.imageList.length != 0) {
      var object=this.props.imageList;
      this.props.setFlickrObject(object[0].url, object[0].title, object[0].user_url, "images")
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
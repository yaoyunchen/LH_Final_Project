var React = require('react');
var ReactDOM = require('react-dom');

var Slider = require('react-slick')

const sliderOptions = {
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  centerMode: true,
  adaptiveHeight: false,
  draggable: false,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1
}

const defaultImages = {
  img1: 'https://static.pexels.com/photos/279/black-and-white-branches-tree-high.jpg',
  img2: '',
  img3: '',
  img4: '',
  img5: ''
}

var ImageSlideshow = React.createClass({

  getInitialState: function() {
    return {
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: ''
    }
  },

  componentWillReceiveProps(nextProps) {
    
    if (this.props.playMode == 'video' && nextProps.playMode == 'music') {
      
      //If there is no country selected.
      if (this.props.imageList.length == 5) {
        this.loadImages();
      } else {
        this.loadDefaultImages();
      }

    }

    if (this.props.setInitialImage == true && this.props.imageList.length != 0) {
      var object=this.props.imageList;
      this.props.setFlickrObject(object[0].url, object[0].title, object[0].user_url, "images")
    }
  },

  loadImages: function() {
    this.setState({
      img1: this.props.imageList[0].url,
      img2: this.props.imageList[1].url,
      img3: this.props.imageList[2].url,
      img4: this.props.imageList[3].url,
      img5: this.props.imageList[4].url
    });
  },

  loadDefaultImages: function() {
    this.setState({
      img1: defaultImages.img1,
      img2: defaultImages.img2,
      img3: defaultImages.img3,
      img4: defaultImages.img4,
      img5: defaultImages.img5
    });
  },

  changeImage() {

  },

  render: function() {    
    return (
      <Slider className={this.props.slideshowStatus}
        {...sliderOptions}
      >
        <div><img src={this.state.img1} /></div>
        <div><img src={this.state.img2} /></div>
        <div><img src={this.state.img3} /></div>
        <div><img src={this.state.img4} /></div>
        <div><img src={this.state.img5} /></div>
      </Slider>
    )
  }
})



export default ImageSlideshow;
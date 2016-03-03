var React = require('react');
var ReactDOM = require('react-dom');

var Slider = require('react-slick')

const sliderOptions = {
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  centerMode: false,
  adaptiveHeight: false,
  draggable: false,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1
}

const DEFAULT_IMG = 'https://static.pexels.com/photos/279/black-and-white-branches-tree-high.jpg';

var ImageSlideshow = React.createClass({

  getInitialState: function() {
    return {
      imgArray: []
    }
  },

  componentWillMount() {
    // Load the default image for the slideshow.
    this.setState({
      imgArray: [DEFAULT_IMG, DEFAULT_IMG, DEFAULT_IMG,  DEFAULT_IMG, DEFAULT_IMG]
    });
  },

  componentWillReceiveProps(nextProps) {
    
    if (this.props.imageList.length == 49 && nextProps.imageList.length == 50) {
   
      this.buildArray(nextProps);
    }
  },

  buildArray: function(nextProps) {
    var tmpArray = [];
    for(var i = 0; i < nextProps.imageList.length; i++) {
      tmpArray.push(nextProps.imageList[i].url);
    }
    this.loadImages(tmpArray)
  }, 

  loadImages: function(arr) {
    this.setState({
      imgArray: arr
    });
  },

  render: function() {    
    return (
      <Slider className={this.props.slideshowStatus}
        {...sliderOptions}
      >
        {this.state.imgArray.map(function(result, i) {
          return (
            <div key={i}>
              <ImageWrapper key={i} id={i} data={result} />
            </div>
          )
        })}
      </Slider>
    )
  }
})

var ImageWrapper = React.createClass ({  
  render: function() {
    return (
      <img key={this.props.id} src={this.props.data}></img>
    )
  }
});

export default ImageSlideshow;
var React = require('react');
var ReactDOM = require('react-dom');


var loadingGifs = [
  "http://3.bp.blogspot.com/-TwfMVDfEQZ0/VrDn3yXPDZI/AAAAAAAAG7g/3eplSpGOb9U/s1600/ocean.gif",
  "https://media.giphy.com/media/xnscj78AnbBm/giphy.gif",
  "https://lh6.googleusercontent.com/-LMaDJJ_oLBQ/U1doOzJzvII/AAAAAAABUGE/nhWeM9d058E/w506-h750/Ocean%2Bview%2Bsunset%2Btime-lapse.gif",
  "http://media4.giphy.com/media/12RyRAsnHqIQr6/giphy.gif"
]

class LoadingScreen extends React.Component{
  componentDidMount() {
    var ele = ReactDOM.findDOMNode(document.getElementById('loading-img'));
    ele.style.opacity = 0;
    window.requestAnimationFrame(function() {
      ele.style.transition = "opacity 0.5s linear";
      ele.style.opacity = 1;
    });
  }

  render() {
    return (
      <div className={this.props.loading} >
        <img id="loading-img" src={loadingGifs[0]}></img>
      </div>
    )
  }
  
  componentWillUnmount() {
    var ele = ReactDOM.findDOMNode(document.getElementById('loading-img'));
    ele.style.opacity = 1;
    window.requestAnimationFrame(function() {
      ele.style.transition = "opacity 0.5s linear";
      ele.style.opacity = 0;
    });
  }
};

export default LoadingScreen
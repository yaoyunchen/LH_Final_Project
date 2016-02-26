var React = require('react');

var loadingGifs = [
  "http://3.bp.blogspot.com/-TwfMVDfEQZ0/VrDn3yXPDZI/AAAAAAAAG7g/3eplSpGOb9U/s1600/ocean.gif",
  "https://media.giphy.com/media/xnscj78AnbBm/giphy.gif",
  "https://lh6.googleusercontent.com/-LMaDJJ_oLBQ/U1doOzJzvII/AAAAAAABUGE/nhWeM9d058E/w506-h750/Ocean%2Bview%2Bsunset%2Btime-lapse.gif",
  "http://media4.giphy.com/media/12RyRAsnHqIQr6/giphy.gif"
]

class LoadingScreen extends React.Component{
  render() {
    return (
      <div className={this.props.loading} >
        <img src={loadingGifs[0]}></img>
      </div>
    )
  }
};

export default LoadingScreen
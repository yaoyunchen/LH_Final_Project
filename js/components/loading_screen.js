var React = require('react');


class LoadingScreen extends React.Component{
  render() {
    return (
      <div className={this.props.loading} >
        <img src="http://media4.giphy.com/media/12RyRAsnHqIQr6/giphy.gif"></img>
      </div>
    )
  }
};

export default LoadingScreen
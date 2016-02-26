var React = require('react');


class LoadingScreen extends React.Component{
  render() {
    return (
      <div className={this.props.loading} >
        <img src="https://media.giphy.com/media/tL5HmgfZi0Qow/giphy.gif"></img>
      </div>
    )
  }
};

export default LoadingScreen
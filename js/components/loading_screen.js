var React = require('react');


class LoadingScreen extends React.Component{
  render() {
    return (
      <div className={this.props.loading} >
        <img src="http://38.media.tumblr.com/8476a3302e1c89b22ebccf565114b82d/tumblr_nyl2wglE3E1v0q87ao1_400.gif"></img>
      </div>
    )
  }
};

export default LoadingScreen
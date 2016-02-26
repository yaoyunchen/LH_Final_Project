var React = require('react');


class LoadingScreen extends React.Component{
  render() {
    return (
      <div className={this.props.loading} >
        <img src="http://3.bp.blogspot.com/-TwfMVDfEQZ0/VrDn3yXPDZI/AAAAAAAAG7g/3eplSpGOb9U/s1600/ocean.gif"></img>
      </div>
    )
  }
};

export default LoadingScreen
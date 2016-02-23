import React from 'react';

class Map extends React.Component {
  render(){
    var map_style = {
      width: "600px",
      height: "400px"
    };

    return (
      <div>
        <div id="vmap"
             style={map_style}>
        </div> 
      </div>     
    )
  }
}

export default Map
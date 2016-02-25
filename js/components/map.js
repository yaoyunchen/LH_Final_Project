import React from 'react';

var Map = {  

  componentDidMount() {
    jQuery('#vmap').bind('regionClick.jqvmap', function(event, code, region)
      {
        handleMapClick(event)
      }
    );
  },

  handleMapClick(code){
    this.props.onMapClick(code.target.id.slice(-2).toUpperCase());
  },

  render(){
    return (
      // <nav id="slider">
        <div id="vmap"
          // style={map_style}
          onClick={this.handleMapClick}
        >
        </div> 
      // </nav>  
    )
  }
}


export default React.createClass(Map)
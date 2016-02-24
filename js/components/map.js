import React from 'react';

export default React.createClass({  

  componentDidMount() {
    jQuery('#vmap').bind('regionClick.jqvmap', function(event, code, region)
      {
        handleMapClick(event)
      }
    );
  },

  handleMapClick(code){
    //jQuery('#vmap').vectorMap('set', 'backgroundColor', '#FFF');
    this.props.onMapClick(code.target.id.slice(-2).toUpperCase());
  },

  render(){
    var map_style = {
      width: "600px",
      height: "400px"
    };
    return (
      <div>
        <div id="vmap"
          style={map_style}
          onClick={this.handleMapClick}
        >
        </div> 
      </div>     
    )
  }
})

// // About to remove the element from the DOM.
// componentWillUnmount() {

// }
import React from 'react';

var Globe = {  

  componentDidMount() {
  //   // jQuery('#globe5').bind('regionClick.jqvmap', function(event, code, region)
  //   //   {
  //   //     handleMapClick(event)
  //   //   }
  //   );
  jQuery("#globe5").spinningGlobe({
        earthWidth: 284, 
        earthHeight: 75, 
        prefix: '/assets/spinning-globe/spinning-globe-jquery-plugin/img/globe5/', 
        logo: false, 
        resistance: 25 
      });
  },

  // handleMapClick(code){
  //   //jQuery('#vmap').vectorMap('set', 'backgroundColor', '#FFF');
  //   this.props.onMapClick(code.target.id.slice(-2).toUpperCase());
  // },

  render(){
    // var map_style = {
    //   width: "600px",
    //   height: "400px",
    // };
    return (
      // <nav id="slider">
        <div id="globe5"
          // style={map_style}
          // onClick={this.handleMapClick}
        >
        </div> 
      // </nav>     
    )
  }
}


export default React.createClass(Globe)
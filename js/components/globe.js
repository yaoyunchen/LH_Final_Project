import React from 'react';

var Globe = {  

  componentDidMount() {
  //   // jQuery('#globe5').bind('regionClick.jqvmap', function(event, code, region)
  //   //   {
  //   //     handleMapClick(event)
  //   //   }
  //   );
    jQuery("#globe5").spinningGlobe({
      earthWidth: 189, 
      earthHeight: 50,
      prefix: '/assets/spinning-globe/spinning-globe-jquery-plugin/img/globe5/', 
      logo: false, 
      resistance: 25 
    });
  },

  // handleMapClick(code){
  //   //jQuery('#vmap').vectorMap('set', 'backgroundColor', '#FFF');
  //   this.props.onMapClick(code.target.id.slice(-2).toUpperCase());
  // },

  onGlobeClick(e) {
    this.props.onGlobeClick(e);
  },

  render(){
    return (
      <div id="globe5"
        onClick={this.onGlobeClick}
      >
      </div>    
    )
  }
}


export default React.createClass(Globe)
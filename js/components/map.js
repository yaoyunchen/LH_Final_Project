import React from 'react';

export default React.createClass({
  getInitialState(){
    return {
      code: ''
    }
  },

  componentDisMount() {
    console.log('mounted')
    jQuery('#vmap').bind('regionClick.jqvmap', function(event, code, region)
      {
        // somehow link countryCode in App.js to the code

      }
    );
    this.setState({
      code: 'CA'
    });
    console.log(this.state.code)
  },


  handleMapClick(){
    //jQuery('#vmap').vectorMap('set', 'backgroundColor', '#FFF');
    console.log('clicked')
    this.props.onMapClick(this.state.code)
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
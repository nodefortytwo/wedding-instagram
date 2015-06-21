var React = require('react');
var joinClasses = require('./utils/joinClasses');

var Col = require('./Col.jsx');

var InstagramImage = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    };
  },
  
  componentDidMount: function() {

    // You may want to rename the component if the <Image> definition
    // overrides window.Image
    var scope = this;
    var img = new window.Image();
    img.onload = function(){
    	scope.state.loaded = true;
    };
    img.src = this.props.instagramId + 'media';
  },

  render: function () {

  	var url = this.props.instagramId + 'media';

  	if (this.state.loaded) {
	    return (
	    	<Col sm={2} className="instagramImage col fade-in">
	    		<img src="/images/mask.png" className="mask"/>
	    		<img src={url} width="100%"/>
	    	</Col>
	    );
	}else{
		return (
	    	<Col sm={2} className="instagramImage col hide">
	    		<img src="/images/mask.png" className="mask"/>
	    		
	    	</Col>
	    );
	}
  }
});

module.exports = InstagramImage;
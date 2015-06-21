var React = require('react');
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var $ = require('jquery');

var Row = require('./Row.jsx');
var InstagramImage = require('./InstagramImage.jsx');
var Col = require('./Col.jsx');

var client_id = '570aebea4a644601bc07d4d8374e1706';
var tag = 'DunneBurgess';
var access_token = '';
var max_id = 0;

var App = React.createClass({

  getInitialState: function() {
//    var data = DataStore.getAll();
//    console.log('test');
    return {
      images: []
    }
  },

  _onChange: function() {
    this.setState(DataStore.getAll());
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);



    if(window.location.hash.length > 1){
      access_token = window.location.hash.substring(14);
    }else{
      window.location = 'https://instagram.com/oauth/authorize/?client_id='+client_id+'&redirect_uri='
                            +window.location.origin+'&response_type=token'
    }

   this.loadData();

  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
  },

  handleClearListClick: function(e) {
    ActionCreator.clearList();
  },

  loadData: function(){
    var url = 'https://api.instagram.com/v1/tags/'+tag+'/media/recent?count=24&access_token='+access_token + '&max_tag_id=' + max_id ;
    var scope = this;
    $.ajax({
      url: url,
      dataType: "jsonp",

    }).done(function(data){
      scope.setState({images: data.data});
      max_id = data.data[0].id;
      window.setTimeout(scope.loadData, 2000);
    });
  },

  render: function() {

    var rows = [];
    rows.push(<Col sm={2} key="placeholder" className="placeholder"><div><img src="/images/logo.png"/><h2>#DunneBurgess</h2></div></Col>);

    for (var i=0; i < this.state.images.length; i++) {
        rows.push(<InstagramImage key={this.state.images[i].id} instagramId={this.state.images[i].link} />);
    }

    return (
      <div className="container-fluid">
        <Row>
          {rows}
        </Row>
        <div className="footer">
          <strong>Share your pictures at #DunneBurgess</strong>
        </div>
      </div>
    );
  },

  shuffle: function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

});

module.exports = App;

'use strict';

console.log('JSX here');

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'div',
      null,
      'Hello world!'
    );
  }
});
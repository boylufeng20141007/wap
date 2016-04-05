'use strict';

require('base/css/common.css');

var ReactDom = require('react-dom'),
	React = require('react');

var PageHeader = require('component/business/page-header/js/page-header');

var Index = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var state = this.state;
		return (
			<div>
				<PageHeader />
			</div>
		);
	}
});

ReactDom.render(
	<Index />,
	document.getElementById('container')
);	
/**
 * @author: lux.lu
 */
'use strict';

require('../css/page-header.css');

var React = require('react');

var pageHeader = React.createClass({
	render: function(){
		return (
			<header data-component="business/page-header" className="clearfix" id="J-page-header">
				<a href="javascript:void(0);" className="f-left icon-menu"></a>
				<a href="javascript:void(0);" className="f-right"></a>
				<div><h1 className="title">博客</h1></div>
			</header>
		);
	}
});

module.exports = pageHeader;
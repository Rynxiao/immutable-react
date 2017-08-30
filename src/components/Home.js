import React from 'react';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			    <h5 className="title">hello, yeoman app!</h5>
			    <div>React Router: </div>
			    <div><a href="#/list">list page</a></div>
			    <div><a href="#/detail">detail page</a></div>
			</div>
		);
	}
}
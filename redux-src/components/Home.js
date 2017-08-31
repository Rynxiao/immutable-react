import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			    <h5 className="title">React的列表渲染问题</h5>
			    <div>React Router: </div>
			    <div><a href="#/list">房间列表</a></div>
			</div>
		);
	}
}

export default connect()(Home);
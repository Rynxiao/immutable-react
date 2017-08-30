import React from 'react';

export default class Detail extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
                <h5 className="title">hello, yeoman app!</h5>
                <div><a href="#/">返回首页</a></div>
                <div>这是详情页</div>
            </div>
		);
	}
}
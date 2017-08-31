import React from 'react';
import { fromJS, is, Map } from 'immutable';
import { extendWidth, deepCopy, gObj, deepCopyObj } from '../utils/deepObjs';
import Equals from '../utils/equals';

export default class Compare extends React.Component {

	constructor(props) {
		super(props);
		this.jsonWay = this.jsonWay.bind(this);
		this.deepCopyWay = this.deepCopyWay.bind(this);
		this.immutableWay = this.immutableWay.bind(this);
		this.deepEquals = this.deepEquals.bind(this);
		this.state = {
			obj: gObj,
			immutableObj: fromJS(gObj),
			aIObj: fromJS(gObj) 
		};
	}

	jsonWay() {
		let obj = this.state.obj;
		let startTime = new Date().getTime();
		let newObj = JSON.parse(JSON.stringify(obj));
		let endTime = new Date().getTime();
		console.log(`speed time ${(endTime-startTime)*1000}μs`);
	}

	deepCopyWay() {
		let obj = this.state.obj;
		let startTime = new Date().getTime();
		let newObj = deepCopy(obj);
		let endTime = new Date().getTime();
		console.log(`speed time ${(endTime-startTime)*1000}μs`);
	}

	immutableWay() {
		let obj = this.state.immutableList;
		let startTime = new Date().getTime();
		let newObj = Map(obj);
		let endTime = new Date().getTime();
		console.log(`speed time ${(endTime-startTime)*1000}μs`);
	}

	deepEquals() {
		let startTime1 = new Date().getTime();
		let result1 = Equals.equalsObject(gObj, deepCopyObj);
		let endTime1 = new Date().getTime();
		console.log(result1);
		console.log(`deep equal time ${(endTime1-startTime1)*1000}μs`);

		let startTime2 = new Date().getTime();
		let result2 = is(this.state.immutableObj, this.state.aIObj);
		let endTime2 = new Date().getTime();
		console.log(result2);
		console.log(`immutable equal time ${(endTime2-startTime2)*1000}μs`);
	}

	render() {
		return (
			<div>
                <h2 className="title">copy效率比较</h2>
                <div><a className="back" href="#/">返回首页</a></div>
                <div className="btn-operator">
                	<button onClick={ this.jsonWay }>window.JSON</button>
                	<button onClick={ this.deepCopyWay }>deepCopy</button>
                	<button onClick={ this.immutableWay }>immutable</button>
                	<button onClick={ this.deepEquals }>deepEquals</button>
                </div>
            </div>
		);
	}
}
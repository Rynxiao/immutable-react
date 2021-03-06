import React from 'react';
import { fromJS, Map, is } from 'immutable';

class RoomDetail extends React.Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !is(fromJS(this.props), fromJS(nextProps)) ||
			   !is(fromJS(this.state), fromJS(nextState));
	}

	render() {
		let room = this.props.room;
		let backgroundColor = room.get('backgroundColor');
		let number = room.get('number');
		console.log(`.No${number}`);

		return (
			<li className="list-item" style={{ backgroundColor: backgroundColor }}>{ number }</li>
		);
	}

}

export default class Detail extends React.Component {

	randomNum(min, max) {
		return Math.random() * (max - min) + min;
	}

	generateColor() {
		let r = Math.floor(this.randomNum(70, 255));
		let g = Math.floor(this.randomNum(70, 255));
		let b = Math.floor(this.randomNum(70, 255));
		let a = this.randomNum(0.8, 1).toFixed(2);
		return `rgba(${r},${g},${b},${a})`;
	}

	generateRooms() {
		let roomList = [];
		for (let i = 0; i < 1000; i++) {
			let num = i < 10 ? `00${i}` : i < 100 ? `0${i}` : i;
			roomList.push({ number: `room${num}`, backgroundColor: this.generateColor() });
		}
		return roomList;
	}

	constructor(props) {
		super(props);
		this.addRoom = this.addRoom.bind(this);
		this.modifyRoom = this.modifyRoom.bind(this);
		this.state = {
			roomList: fromJS(this.generateRooms()),
			newRoom: 0
		};
	}

	addRoom() {
		let newRoom = Map({ number: `newRoom${++this.state.newRoom}`, backgroundColor: '#f00' });
		let newList = this.state.roomList.push(newRoom);
		this.setState({ roomList: newList });
	}

	modifyRoom() {
		let list = this.state.roomList;
		let newList = list.update(0, () => {
			return Map({ number: 'HAHA111', backgroundColor: '#0f0' });
		});
		this.setState({ roomList: newList });
	}

	render() {
		return (
			<div>
                <h2 className="title">React的列表渲染问题</h2>
                <div><a className="back" href="#/">返回首页</a></div>
                <div className="btn-operator">
                	<button onClick={ this.addRoom }>Add A Room</button>
                	<button onClick={ this.modifyRoom }>Modify A Room</button>
                </div>
                <ul className="list-wrapper">
                	{
                		this.state.roomList.map((room, index) => {
                			return <RoomDetail key={ `roomDetail${index}` } room={ room } />
                		})
                	}
                </ul>
            </div>
		);
	}
}
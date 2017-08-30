import React from 'react';

class RoomDetail extends React.Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.room.number === this.props.room.number) {
			return false;
		} 
		return true;
	}

	render() {
		let room = this.props.room;
		console.log(`.No${room.number}`);

		return (
			<li className="list-item" style={{ backgroundColor: room.backgroundColor }}>{ room.number }</li>
		);
	}

}

export default class List extends React.Component {

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
			roomList: this.generateRooms(),
			newRoom: 0
		};
	}

	addRoom() {
		let newRoom = { number: `newRoom${++this.state.newRoom}`, backgroundColor: '#f00' };
		let newList = this.state.roomList;
		newList.push(newRoom);
		this.setState({ roomList: newList });
	}

	modifyRoom() {
		let newList2 = [...this.state.roomList];
		newList2[0] = { number: 'HAHA111', backgroundColor: '#0f0' };
		this.setState({ roomList: newList2 });
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
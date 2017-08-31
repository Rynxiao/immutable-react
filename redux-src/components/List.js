import React from 'react';
import { connect } from 'react-redux';
import { addRoom, modifyRoom, modifyNewRoomNum } from '../redux/actions';
import { is, fromJS, Map } from 'immutable';

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

		return (
			<li className="list-item" style={{ backgroundColor: backgroundColor }}>{ number }</li>
		);
	}

}

class List extends React.Component {

	constructor(props) {
		super(props);
		this.addRoom = this.addRoom.bind(this);
		this.modifyRoom = this.modifyRoom.bind(this);
	}

	addRoom() {
		let { newRoom, onAddRoom, onModifyRoomNum } = this.props;
		let room = Map({ number: `newRoom${newRoom}`, backgroundColor: '#f00' });
		onAddRoom(room);
		onModifyRoomNum();
	}

	modifyRoom() {
		let { onModifyRoom } = this.props;
		let room = Map({ number: 'HAHA111', backgroundColor: '#0f0' });
		onModifyRoom(room);
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
                		this.props.roomList && this.props.roomList.map((room, index) => {
                			return <RoomDetail key={ `roomDetail${index}` } room={ room } />
                		})
                	}
                </ul>
            </div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roomList: state.rooms.get('roomList'),
		newRoom: state.rooms.get('newRoom')
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onAddRoom: room => {
			dispatch(addRoom(room));
		},
		onModifyRoom: room => {
			dispatch(modifyRoom(room));
		}, 
		onModifyRoomNum: () => dispatch(modifyNewRoomNum())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);








import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { ADD_ROOM, MODIFY_ROOM, MODIFY_NEWROOM_NUM } from '../const';
import { addRoom, modifyRoom, modifyNewRoomNum } from '../actions';

function randomNum(min, max) {
	return Math.random() * (max - min) + min;
}

function generateColor() {
	let r = Math.floor(randomNum(70, 255));
	let g = Math.floor(randomNum(70, 255));
	let b = Math.floor(randomNum(70, 255));
	let a = randomNum(0.8, 1).toFixed(2);
	return `rgba(${r},${g},${b},${a})`;
}

function generateRooms() {
	let roomList = [];
	for (let i = 0; i < 1000; i++) {
		let num = i < 10 ? `00${i}` : i < 100 ? `0${i}` : i;
		roomList.push({ number: `room${num}`, backgroundColor: generateColor() });
	}
	return roomList;
} 

const initialState = fromJS({
	roomList: generateRooms(),
	newRoom: 0
});

function rooms(state = initialState, action) {
	switch(action.type) {
		case ADD_ROOM: 
			return state.updateIn(['roomList'], list => list.push(action.room));
		case MODIFY_ROOM:
			return state.updateIn(['roomList', 0], room => action.room);
		case MODIFY_NEWROOM_NUM:
			return state.updateIn(['newRoom'], num => ++num);
		default:
			return state;
	}
}

export default combineReducers({
	rooms
});
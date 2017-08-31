import { ADD_ROOM, MODIFY_ROOM, MODIFY_NEWROOM_NUM } from '../const';

export function addRoom(room) {
	return {
		type: ADD_ROOM,
		room
	}
}

export function modifyRoom(room) {
	return {
		type: MODIFY_ROOM,
		room
	}
}

export function modifyNewRoomNum() {
	return {
		type: MODIFY_NEWROOM_NUM
	}
}


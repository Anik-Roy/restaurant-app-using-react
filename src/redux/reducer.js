import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

// let INITIAL_STATE = {
//     isLoading: false,
//     rooms: [],
//     isLoadingUser: false,
//     user: null
// }

const roomReducer = (roomState={isLoading: false, rooms: []}, action) => {
    switch(action.type) {
        case actionTypes.ROOMS_LOADING:
            return {
                ...roomState,
                isLoading: true,
                rooms: []
            }
        case actionTypes.LOAD_ROOMS:
            return {
                ...roomState,
                isLoading: false,
                rooms: action.payload
            }
        default:
            return roomState;
    }
}

const userReducer = (userState = {isLoadingUser: false, user: null}, action) => {
    switch(action.type) {
        case actionTypes.LOAD_USER:
            return {
                ...userState,
                user: action.payload,
                isLoadingUser: false
            }
        case actionTypes.USER_LOADING:
            return {
                ...userState,
                user: null,
                isLoadingUser: true
            }
        default:
            return userState;
    }
}

const roomBookedReducer = (roomBookedState={roomBookedLoading: false, roomBooked: null}, action) => {
    switch(action.type) {
        case actionTypes.ROOM_BOOKED_LOADING:
            return {
                ...roomBookedState,
                roomBookedLoading: true,
                roomBooked: null
            }
        case actionTypes.LOAD_ROOM_BOOKED:
            // console.log("from roomBookReducer: ", action.payload);
            return {
                ...roomBookedState,
                roomBookedLoading: false,
                roomBooked: action.payload
            }
        default:
            return roomBookedState;
    }
}

const roomDetailReducer = (roomDetailState={roomDetailLoading: false, roomDetail: null}, action) => {
    switch(action.type) {
        case actionTypes.ROOM_DETAIL_LOADING:
            return {
                ...roomDetailState,
                roomDetailLoading: true,
                roomDetail: null
            }
        case actionTypes.LOAD_ROOM_DETAIL:
            // console.log("from roomBookReducer: ", action.payload);
            return {
                ...roomDetailState,
                roomDetailLoading: false,
                roomDetail: action.payload
            }
        default:
            return roomDetailState;
    }
}

const Reducer = combineReducers({
    rooms: roomReducer,
    user: userReducer,
    isRoomBooked: roomBookedReducer,
    roomDetail: roomDetailReducer
});

export default Reducer;
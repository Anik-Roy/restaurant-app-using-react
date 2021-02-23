import * as actionTypes from './actionTypes';
import { auth, db } from '../firebase';

export const roomsLoading = () => {
    return {
        type: actionTypes.ROOMS_LOADING
    }    
}

export const loadRooms = rooms => {
    return {
        type: actionTypes.LOAD_ROOMS,
        payload: rooms
    }    
}

export const userLoading = () => {
    return {
        type: actionTypes.USER_LOADING
    }
}

export const loadUser = user => {
    return {
        type: actionTypes.LOAD_USER,
        payload: user
    }
}

export const roomBookedLoading = () => {
    return {
        type: actionTypes.ROOM_BOOKED_LOADING
    }
}

export const loadRoomBooked = data => {
    // console.log("from loadRoomBooked: ", data);
    return {
        type: actionTypes.LOAD_ROOM_BOOKED,
        payload: data
    }
}

export const roomDetailLoading = () => {
    return {
        type: actionTypes.ROOM_DETAIL_LOADING
    }
}

export const loadRoomDetail = roomDetail => {
    return {
        type: actionTypes.LOAD_ROOM_DETAIL,
        payload: roomDetail
    }
}

export const fetchRooms = (category="all") => {
    return dispatch => {
        dispatch(roomsLoading());

        if(category === "all") {
            db.collection("rooms").onSnapshot(snapshot => {
                let rooms = [];
                snapshot.forEach(room => {
                    const jsonData = room.data();
                    // console.log(room.data());
                    rooms.push({
                                    key: room.id,
                                    id: room.id,
                                    url: jsonData["url"],
                                    title: jsonData["title"],
                                    price: jsonData["price"],
                                    totalRoom: jsonData["totalRoom"],
                                    alreadyBookedCount: jsonData["alreadyBookedCount"],
                                    available: jsonData["available"],
                                    totalBed: jsonData["totalBed"],
                                    tv: jsonData["tv"],
                                    wifi: jsonData["wifi"]
                                })
                });
                dispatch(loadRooms(rooms));
            });
        } else {
            console.log(category);
            let key = null, value = false;
            switch(category) {
                case "Has Wifi":
                    key = "wifi";
                    value = true;
                    break;
                case "Has TV":
                    key = "tv";
                    value = true;
                    break;
                case "Single Bed":
                    key = "totalBed";
                    value=1;
                    break;
                case "Double Bed":
                    key = "totalBed";
                    value = 2;
                    break;
                case "Tripple Bed":
                    key = "totalBed";
                    value = 3;
                    break;
                case "Four Bed":
                    key = "totalBed";
                    value = 4;
                    break;
                default:
                    key = "wifi";
                    value = true;
                    break;
            }
            db.collection("rooms").where(key, "==", value).onSnapshot(snapshot => {
                let rooms = [];
                snapshot.forEach(room => {
                    const jsonData = room.data();
                    // console.log(room.data());
                    rooms.push({
                                    key: room.id,
                                    id: room.id,
                                    url: jsonData["url"],
                                    title: jsonData["title"],
                                    price: jsonData["price"],
                                    totalRoom: jsonData["totalRoom"],
                                    alreadyBookedCount: jsonData["alreadyBookedCount"],
                                    available: jsonData["available"],
                                    totalBed: jsonData["totalBed"],
                                    tv: jsonData["tv"],
                                    wifi: jsonData["wifi"]
                                })
                });
                dispatch(loadRooms(rooms));
            });
        }
    }    
}

export const fetchUser = () => {
    return dispatch => {
        dispatch(roomBookedLoading());
        auth.onAuthStateChanged(authUser => {
            if(authUser) {
                // console.log("fetchUser: ", authUser);
                dispatch(loadUser(authUser));
            } else {
                dispatch(loadUser(null));
            }
        });
    }
}

export const fetchIsRoomBooked = (uid, roomId) => {
    return dispatch => {
        dispatch(roomBookedLoading());
        if(!uid) {
            console.log("user is not logged in!");
        } else {
            db.collection("customers").doc(uid).collection("bookedRoom").doc(roomId).get()
                .then(doc => {
                    if(doc.exists) {
                        // console.log("from fetchIsRoomBooked -> dispatching: ", doc.data());
                        dispatch(loadRoomBooked(doc.data()));
                    } else {
                        // console.log("document not exist!");
                        dispatch(loadRoomBooked(null));
                    }
                });
        }
    }
}

export const fetchRoomDetail = roomId => {
    return dispatch => {
        dispatch(roomDetailLoading());
        db.collection("rooms").doc(roomId).get().then(doc => {
            if(doc.exists) {
                // console.log("fetchRoomDetail =>", doc.data());
                dispatch(loadRoomDetail(doc.data()))
            } else {
                // console.log("fetchRoomDetail => document not exist!");
                // dispatch(loadRoomDetail("document not exist!"));
            }
        }).catch(error => {
            // console.log("fetchRoomDetail => an error occured!");
            dispatch(loadRoomDetail("an error occured!"));
        })
    }
}
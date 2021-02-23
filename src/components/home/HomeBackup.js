import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Card from '../card/Card'
import {isEqual} from 'lodash';
import { db } from '../../firebase';
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router';

// ES7 snippets to do 'rfce'

const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Home = props => {
    const [rooms, setRooms] = useState([]);
    const prevRooms = usePrevious(rooms);
    
    const history = useHistory();

    useEffect(() => {
        console.log("Home: inside useEffect!");
        if(!isEqual(rooms, prevRooms)) {
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
                                    available: jsonData["available"],
                                    bookedFrom: jsonData["bookedFrom"],
                                    bookedTo: jsonData["bookedTo"],
                                    totalBed: jsonData["totalBed"],
                                    tv: jsonData["tv"],
                                    wifi: jsonData["wifi"]
                                })
                });
                setRooms(rooms);
            });
        }
    }, [rooms, prevRooms]);
    
    const handleRoom = room => {
        // console.log("Home > handleRoom:", room);
        // db.collection("rooms").doc(roomId).get().then(doc => {
        //     let roomInfo = doc.data();
        //     console.log("Home: ", roomInfo);
        // });
        // history.push("/detail", {...room});
        history.push({
            pathname: '/detail',
            roomInfo: {...room, user: props.user},
        });
    }

    return (
        <div className='home'>
            <div className='img-grid'>
                {
                    rooms.length ? rooms.map(room => (
                        <Card
                            key = {room["id"]}
                            id = {room["id"]}
                            url = {room["url"]}
                            title = {room["title"]}
                            price = {room["price"]}
                            totalRoom = {room["totalRoom"]}
                            available = {room["available"]}
                            bookedFrom = {room["bookedFrom"]}
                            bookedTo = {room["bookedTo"]}
                            totalBed = {room["totalBed"]}
                            tv = {room["tv"]}
                            wifi = {room["wifi"]}
                            
                            handleRoom = {handleRoom} />
                    )) : (<Loader
                        type="Oval"
                        color="#efb6b2"
                        height={100}
                        width={100}
                        timeout={3000} />
                    )
                }
                {/* {rooms.length ? rooms : (<Loader
                    type="Oval"
                    color="#efb6b2"
                    height={100}
                    width={100}
                    timeout={3000} />
                )} */}
            </div>
        </div>
    )
}

export default Home

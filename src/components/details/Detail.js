import React, { Component } from 'react';
import './Detail.css';
// import Loader from "react-loader-spinner";
import { db, timestamp } from '../../firebase';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchIsRoomBooked, fetchRoomDetail } from '../../redux/actionCreators';

const mapStateToProps = state => {
    // console.log("Detail: mapStateToProps", state);
    // {roomBookedLoading: false, roomBooked
    return {
        roomBooked: state.isRoomBooked.roomBooked,
        roomBookedLoading: state.isRoomBooked.roomBookedLoading,
        roomDetailLoading: state.roomDetail.roomDetailLoading,
        roomDetail: state.roomDetail.roomDetail
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchIsRoomBooked: (uid, roomId) => dispatch(fetchIsRoomBooked(uid, roomId)),
        fetchRoomDetail: roomId => dispatch(fetchRoomDetail(roomId))
    }
}

class Detail extends Component {
    /*
        key
        url
        title
        price
        description
        available
        bookedFrom
        bookedTo
        totalBed
        tv
        wifi
    */

    handleBooking = () => {
        const uid = this.props.user.uid;
        const roomId = this.props.roomId;

        db.collection("customers").doc(uid).collection("bookedRoom").doc(roomId).set({
            username: this.props.user.displayName,
            bookedAt: timestamp()
        }).then(() => {
            alert("This room is successfully booked by you!");
            this.props.fetchIsRoomBooked(this.props.user ? this.props.user.uid : null, this.props.roomId);
            let currentValue = this.props.roomDetail["alreadyBookedCount"];
            db.collection("rooms").doc(roomId).update({
                alreadyBookedCount: currentValue + 1
            }).then(() => {
                this.props.fetchIsRoomBooked(this.props.user ? this.props.user.uid : null, this.props.roomId);    
                this.props.fetchRoomDetail(this.props.roomId);
            }).catch(error => alert("An error occured!"));
        })
    }

    hadleCancelBooking = () => {
        const uid = this.props.user.uid;
        const roomId = this.props.roomId;

        db.collection("customers").doc(uid).collection("bookedRoom").doc(roomId).delete()
            .then(() => {
                alert("Room booking canceled!");
                this.props.fetchIsRoomBooked(this.props.user ? this.props.user.uid : null, this.props.roomId);
                
                let currentValue = this.props.roomDetail["alreadyBookedCount"];
                
                db.collection("rooms").doc(roomId).update({
                    alreadyBookedCount: currentValue - 1
                }).then(() => {
                    this.props.fetchIsRoomBooked(this.props.user ? this.props.user.uid : null, this.props.roomId);    
                    this.props.fetchRoomDetail(this.props.roomId);
                }).catch(error => alert("An error occured!"));
            });
    }

    
    componentDidMount() {
        this.props.fetchIsRoomBooked(this.props.user ? this.props.user.uid : null, this.props.roomId);
        this.props.fetchRoomDetail(this.props.roomId);
        console.log("Detail: componentDidMount", this.props);
    }

    componentDidUpdate() {
        console.log("Detail: componentDidUpdate", this.props.roomDetail);  
    }
    render() {
        if(this.props.roomDetail !== null) {
            let room = this.props.roomDetail;
            return (
                <div>
                    <Card className="m-5">
                        <CardImg top src={room.url} alt={room.title} />
                        <CardBody style={{textAlign: "left"}}>
                            { this.props.user && this.props.roomBooked === null &&
                                room.totalRoom > room.alreadyBookedCount && <button onClick={this.handleBooking} className="btn btn-success btn-lg mb-3">Book this room</button> }
                            { room.totalRoom === room.alreadyBookedCount && <h2 className="text-info">All room of this kind is booked!</h2>}
                            { this.props.user && this.props.roomBooked !== null && 
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <h3 className="text-success">Room booking is done by you!</h3>
                                        <button onClick={this.hadleCancelBooking} className="btn btn-warning btn-lg mb-3">Cancel Booking</button>
                                    </div>
                            }
                            { !this.props.user && <h3 className="text-danger">Please login to book this room!</h3> }
    
                            <CardTitle>
                                Title: {room.title}
                            </CardTitle>
                            <CardText>
                                Price: USD {room.price}
                            </CardText>
                            <CardText>
                                Status: {room.available ? "Room is available" : "All room is booked!"}
                            </CardText>
                            <CardText>
                                Total number of room of this type: {room.totalRoom}
                            </CardText>
                            <CardText>
                                Already booked by: {room.alreadyBookedCount} users
                            </CardText>
                            <CardText>
                                Total Bed: {room.totalBed}
                            </CardText>
                            <CardText>
                                TV: {room.tv ? "Available" : "Not available"}
                            </CardText>
                            <CardText>
                                Wifi: {room.wifi ? "Available" : "Not available"}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
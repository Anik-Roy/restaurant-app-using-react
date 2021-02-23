import React, { Component } from 'react';
import './Home.css';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import Card from '../card/MyCard'
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';
// import { useHistory } from 'react-router';
import { fetchRooms } from '../../redux/actionCreators';
import Detail from '../details/Detail';

const mapStateToProps = state => {
    // console.log("Home: mapStateToProps", state);
    return {
        rooms: state.rooms.rooms,
        isLoading: state.rooms.isLoading,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRooms: (category="all") => dispatch(fetchRooms(category))
    }
}

class Home extends Component {
    state = {
        selectedRoom: null,
        modalOpen: false
    }

    onRoomSelect = room => {
        this.setState({
            selectedRoom: room,
            modalOpen: !this.state.modalOpen
        });
    }

    onCategorySelect = event => {
        // "Has Wifi" "Has TV" "Single Bed" "Double Bed" Four Bed
        let text = event.target.innerText;
        if(text === "Has Wifi") {
            // console.log(text);
            this.props.fetchRooms("Has Wifi");
        } else if(text === "Has TV") {
            // console.log(text);
            this.props.fetchRooms("Has TV");
        } else if(text === "Single Bed") {
            // console.log(text);
            this.props.fetchRooms("Single Bed");
        } else if(text === "Double Bed") {
            // console.log(text);
            this.props.fetchRooms("Double Bed");
        } else if(text === "Tripple Bed") {
            this.props.fetchRooms("Tripple Bed");
        } else if(text === "Four Bed") {
            // console.log(text);
            this.props.fetchRooms("Four Bed");
        }
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    componentDidMount() {
        this.props.fetchRooms();
        // console.log("Home: componentDidMount", this.props);
    }

    componentDidUpdate() {
        // console.log("Home: componentDidUpdate", this.props.rooms);
    }

    render() {
        
        if(this.props.isLoading) {
            return (
                <Loader
                    type="Oval"
                    color="#efb6b2"
                    height={100}
                    width={100}
                    timeout={3000} />
            );
        } else {
            const rooms = this.props.rooms.map(room => (
                <Card
                    key = {room["id"]}
                    id = {room["id"]}
                    url = {room["url"]}
                    title = {room["title"]}
                    price = {room["price"]}
                    totalRoom = {room["totalRoom"]}
                    alreadyBookCount = {room["alreadyBookedCount"]}
                    available = {room["available"]}
                    totalBed = {room["totalBed"]}
                    tv = {room["tv"]}
                    wifi = {room["wifi"]}
                    handleRoom = {()=>this.onRoomSelect(room)} />
            ));

            let roomDetail = null;
            if(this.state.selectedRoom != null) {
                roomDetail = <Detail
                                roomId={this.state.selectedRoom.id}
                                user={this.props.user} />
            }

            return (
                <div className='home'>
                    <div className="row">
                        <div className="col-md-9">
                            <div className='img-grid'>
                                { rooms }
                            </div>
                        </div>
                        <div className="col-md-3">
                            <h3 style={{border: "1px solid #efb6b2", padding: "10px", textAlign: "center"}}>Categories</h3>
                            <ul className="list-group list-group-flush">
                                <li onClick={e=>this.onCategorySelect(e)} style={{cursor: "pointer"}} className="list-group-item">Has Wifi</li>
                                <li onClick={e=>this.onCategorySelect(e)} style={{cursor: "pointer"}} className="list-group-item">Has TV</li>
                                <li onClick={e=>this.onCategorySelect(e)} style={{cursor: "pointer"}} className="list-group-item">Single Bed</li>
                                <li onClick={e=>this.onCategorySelect(e)} style={{cursor: "pointer"}} className="list-group-item">Double Bed</li>
                                <li onClick={e=>this.onCategorySelect(e)} style={{cursor: "pointer"}} className="list-group-item">Tripple Bed</li>
                                <li onClick={e=>this.onCategorySelect(e)} style={{cursor: "pointer"}} className="list-group-item">Four Bed</li>
                            </ul>
                        </div>
                    </div>
                    
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalBody>
                            {roomDetail}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

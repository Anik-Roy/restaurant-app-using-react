import React from 'react';
import './MyCard.css'

const MyCard = props => {
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
    
    // console.log("Card:", props.user);
    return (
        <div className='my-card' onClick={()=>props.handleRoom(props)}>
            <img src={props.url} alt="" />
            <div className="card__info">
                <h2>{props.title}</h2>
                <h4>{props.description}</h4>
                <h3>USD {props.price}</h3>
            </div>
        </div>
    )
}

export default MyCard;

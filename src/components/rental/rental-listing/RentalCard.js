import React from 'react';
import { Link } from 'react-router-dom';

export default function RentalCard(props) {
    const {rental} = props;
    return (
        <div className={props.ColNum}>
            <Link to={`/rentals/${rental.id}`} className="rental-detail-link">
                <div className="card bwm-card">
                    <img src="http://via.placeholder.com/350x250" alt="Rental Main"></img>
                    <div className="card-block">
                        <h6 className={`card-subtitle ${rental.category}`}>{rental.shared ? "Shared" : "Whole"} {rental.category} &#183; {rental.city} </h6>
                        <h4 className="card-title">{rental.title}</h4>
                        <p className="card-text">${rental.dailyRate} per Night &#183; Free Cancelation</p>
                    </div>
                </div>
            </Link>
        </div>        
    )
}

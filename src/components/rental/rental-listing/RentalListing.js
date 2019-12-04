import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';

// import * as actions from '../../actions';
import {fetchRentals} from '../../../actions';

function RentalListing(props) {
  const {fetchRentals} = props;
  useEffect(() => {
    fetchRentals();
  },[fetchRentals]);

    return (
      <div>
        <section id="rentalListing">
          <h1 className="page-title">Your Home Around The World</h1>
          <RentalList rentals = {props.rentals}></RentalList>
        </section>
      </div>
    );
}
const  mapState = (state)  => { 
  return {
    rentals: state.data.rentals
  }
}
export default connect(mapState, {fetchRentals})(RentalListing)
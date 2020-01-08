import React, { useEffect } from "react";
import { connect } from "react-redux";

import RentalDetailInfo from './RentalDetailInfo';
// import RentalMap from './RentalMap';

import {fetchRentalById, cleanUp} from '../../../actions';
import Booking from "../../booking/Booking";

function RentalDetail(props) {
  const {rental, fetchRentalById, cleanUp } = props;
  let rentalId = props.match.params.id;
  // Fetch Rentals
  useEffect(() => {
    console.log('Fetch by id')
    fetchRentalById(rentalId);
// CleanUp by returning an empty rental, making it display loading
    return () => { 
      console.log('Component will Unmount');
      cleanUp()
    };
  }, [ rentalId, fetchRentalById, cleanUp]);

  if(rental._id)
  {return (
     <section id="rentalDetails">
       <div className="upper-section">
         <div className="row">
           <div className="col-md-6">
             <img src={rental.image} alt=""></img>
           </div>
           <div className="col-md-6">
             {/* <RentalMap location={`${rental.city}, ${rental.street}`}></RentalMap> */}
             <img src={rental.image} alt=""></img>
           </div>
         </div>
       </div>
       <div className="details-section">
         <div className="row">
           <div className="col-md-8">
             <RentalDetailInfo rental={rental}></RentalDetailInfo>
           </div>
           <div className="col-md-4"><Booking rental={rental}></Booking></div>
         </div>
       </div>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
     </section>
   );}
  else{
      return(<h1>Loading...</h1>)
  }
}
const mapState = state => {
  return {
    rental: state.data.rental
  };
};
export default connect(mapState, {fetchRentalById, cleanUp})(RentalDetail);

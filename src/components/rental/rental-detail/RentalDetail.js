import React, { useEffect } from "react";
import { connect } from "react-redux";
// import * as actions from "../../actions";
import {fetchRentalById, cleanUp} from '../../../actions'
function RentalDetail(props) {
  const {rental, fetchRentalById, cleanUp } = props;
  const rentalId = Number(props.match.params.id);
  useEffect(() => {
    fetchRentalById(rentalId);
  }, [ rentalId, fetchRentalById]);
  // CleanUp by dispatching an empty action
  useEffect(() => {
    return () => {
      console.log('Component will Unmount');
      cleanUp()
    };
  }, [cleanUp])
  if(rental.id)
  {return (
    <div>
      <h1>{rental.title}</h1>
      <h1>{rental.city}</h1>
      <h1>{rental.description}</h1>
      <h1>{rental.dailyRate}$</h1>
    </div>
  )}
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

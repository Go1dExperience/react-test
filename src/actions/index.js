import {FETCH_RENTALS, FETCH_BY_ID, CLEAN_UP} from './types';
import axios from 'axios';
// import {FETCH_BY_ID_SUCCESS} from './types';


export const fetchRentals = () => {
    return dispatch =>  {
      axios.get('/api/v1/rentals')
      .then((rentals) => {
        dispatch({
          type: FETCH_RENTALS,
          payload: rentals.data
        })
      })    
    }
}
// CleanUp by empty object
export const cleanUp = () => {
  return dispatch => {
    dispatch({
      type: CLEAN_UP,
      payload: {}
    })
  }
}
export const fetchRentalById = (rentalId) => {
  return dispatch => {  
    // Stimulate a server call
    axios.get(`/api/v1/rentals/${rentalId}`)
    .then((rental) => {
      dispatch({
      type: FETCH_BY_ID,
      payload: rental.data
    })})
    // setTimeout(() => {
    //   const rental = rentals.find(Rental => Rental.id === rentalId);
    //   // dispatch(fetchRentalByIdSuccess(rental))
    //   dispatch({
    //     type: FETCH_BY_ID,
    //     payload: rental
    //   })
    // }, 1000);
    }
}
// const fetchRentalByIdSuccess = (rental) => {
//   return {
//     type: FETCH_BY_ID_SUCCESS,
//     rental
//   }
// }


// const fetchByIdSuccess = (rental) => {
//   return {
//     type: FETCH_BY_ID_SUCCESS,
//     rental
//   }
// }
// const fetchByIdInit = () => {
//   return {
//     type: FETCH_BY_ID_INIT
//   }
// }


// export const fetchById = (rentalId) => {
//   return function(dispatch) {
//     dispatch(fetchByIdInit());
//     // Server Call
//     setTimeout(() => {
//       const rental = rentals.find((rental) => rental.id === rentalId);
//       dispatch(fetchByIdSuccess(rental));
//     }, 1000);

//   }

// }

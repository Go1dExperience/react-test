import {FETCH_RENTALS, FETCH_BY_ID, CLEAN_UP, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_ERRORS, CLEAN_UP_RENTALS} from './types';
import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';
// import {FETCH_BY_ID_SUCCESS} from './types';

const axiosInstance = axiosService.getInstance();

///////////////////////////Rental Actions///////////////////////////
export const fetchRentals = (city) => {
  // If no city is provided, search for all rentals
  const url = city ? `/rentals?city=${city}` : '/rentals';
    return dispatch =>  {
      axiosInstance.get(url)
      .then(rentals => {
        dispatch({
          type: FETCH_RENTALS,
          payload: rentals.data
        })
      })
      .catch(err => {
        debugger;
        dispatch({
          type: FETCH_ERRORS,
          payload: err.response.data.errors
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
export const cleanUpRentals = () => {
  return dispatch => {
    dispatch({
      type: CLEAN_UP_RENTALS,
      payload: {}
    })
  }
}
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
// Create Rental
export const createRental = (data) => {
  return axiosInstance.post('/rentals', data)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors))
}
/////////////////////////////////////////////////////////////////////
///////////////////////////Booking Actions///////////////////////////
export const createBooking = (booking) => {
  debugger;
  return axiosInstance.post('/bookings', {...booking})
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors))
    
}
/////////////////////////////////////////////////////////////////////
///////////////////////////Auth Actions///////////////////////////
// Register//
export const register = (data) => {
  return axios.post('/api/v1/users/register', data)
  .then(
    (res) => {
      return res.data
    })
  .catch((err) => {
    return Promise.reject(err.response.data.errors)
  })
}
// Check Auth State
// Dispatch is required because this is conditional dispatch, without it function will 
// return null which causes error when dispatching it in App
export const checkAuthState = () => dispatch => {
  if(authService.isAuthenticated()){
    const username = authService.getUsername();
    dispatch({
      type: LOGIN_SUCCESS,
      username
    })
  }
}
//Login//
export const login = (data) => dispatch => {

   return axios.post('/api/v1/users/auth', data)
   .then(res => res.data)
   .then(token => {
     authService.addToken(token);
     const username = authService.getUsername();
     dispatch({
       type: LOGIN_SUCCESS,
       username
     })
   })
   .catch(err => {
    dispatch({
      type: LOGIN_FAILURE,
      errors: err.response.data.errors
    })
   })
}
export const logOut = () => {
  authService.removeToken();
  return {
    type: LOGOUT
  }
}
/////////////////////////////////////////////////////////////////////
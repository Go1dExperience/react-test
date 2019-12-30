import {FETCH_RENTALS, FETCH_BY_ID, CLEAN_UP, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './types';
import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';
// import {FETCH_BY_ID_SUCCESS} from './types';

const axiosInstance = axiosService.getInstance();

///////////////////////////Rental Actions///////////////////////////
export const fetchRentals = () => {
    return dispatch =>  {
      axiosInstance.get('/rentals')
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
///////////////////////////Auth Actions///////////////////////////

// Register//
export const register = (data) => {
  return axios.post('/api/v1/users/register', {...data})
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
    dispatch({
      type: LOGIN_SUCCESS
    })
  }
}

//Login//
export const login = (data) => dispatch => {
   return axios.post('/api/v1/users/auth', {...data})
   .then(res => res.data)
   .then(token => {
     authService.addToken(token);
     dispatch({
       type: LOGIN_SUCCESS
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
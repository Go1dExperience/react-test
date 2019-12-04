import {FETCH_RENTALS, FETCH_BY_ID, CLEAN_UP} from './types';
// import {FETCH_BY_ID_SUCCESS} from './types';
const rentals = [
  {
    id: 1,
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: 3,
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: 4,
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: true,
    createdAt: "24/12/2017"
  }
]


export const fetchRentals = () => {
    return dispatch =>  {
          dispatch({
          type: FETCH_RENTALS,
          payload: rentals
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
    setTimeout(() => {
      const rental = rentals.find(Rental => Rental.id === rentalId);
      // dispatch(fetchRentalByIdSuccess(rental))
      dispatch({
        type: FETCH_BY_ID,
        payload: rental
      })
    }, 1000);
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

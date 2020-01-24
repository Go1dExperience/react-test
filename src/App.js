import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {checkAuthState, logOut} from './actions'

import Header from './components/shared/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';

import ProtectedRoute from './components/shared/auth/ProtectedRoute';
import LoggedInRoute from './components/shared/auth/LoggedInRoute';

import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import RentalSearching from './components/rental/rental-listing/RentalSearching';
import RentalCreate from './components/rental/rental-create/RentalCreate';
import RentalManage from './components/rental/rental-manage/RentalManage';
import BookingManage from './components/booking/booking-manage/BookingManage';




function App() {


  // Because we don't have connect, we need to dispatch it with store.
  // If we have connect with state, we need props.dispatch.
  // But App can't be wrapped, we have to use store in this case.
  const store = require('./reducers').init();
  store.dispatch(checkAuthState());
  const LogOut = () => {
    store.dispatch(logOut());
  }
  return (
    <Provider store = {store}>
      <BrowserRouter>
      <div className="App">
          <Header logOut = {LogOut}></Header>
          <div className="container">
            <Switch>
              <Route exact path="/" render={() =>  <Redirect to="/rentals"></Redirect> }></Route>
              <Route exact path="/rentals" component={RentalListing}></Route>
  {/* Specific routes should be above, otherwise both are called */}
              <ProtectedRoute exact path="/rentals/create" component={RentalCreate}></ProtectedRoute>
              <ProtectedRoute path="/rentals/manage" component={RentalManage}></ProtectedRoute>
              <Route exact path="/rentals/:id" component={RentalDetail}></Route>
              <ProtectedRoute path="/bookings/manage" component={BookingManage}></ProtectedRoute>
              <Route path="/login" component={Login} ></Route>
              <LoggedInRoute path="/register" component={Register} ></LoggedInRoute>
              <Route exact path="/rentals/:city/homes" component={RentalSearching}></Route>
            </Switch>
          </div> 
      </div>
      </BrowserRouter>
    </Provider>
  );
}
export default App;

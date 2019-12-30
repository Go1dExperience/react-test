import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {checkAuthState, logOut} from './actions'

import Header from './components/shared/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';

import ProtectedRoute from './components/shared/auth/ProtectedRoute';
import LoggedInRoute from './components/shared/auth/LoggedInRoute';

import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';



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
            <Route exact path="/" render={() =>  <Redirect to="/rentals"></Redirect> }></Route>
            <Route exact path="/rentals" component={RentalListing}></Route>
            <ProtectedRoute path="/rentals/:id" component={RentalDetail}></ProtectedRoute>
            <Route path="/login" component={Login} ></Route>
            <LoggedInRoute path="/register" component={Register} ></LoggedInRoute>
          </div> 
      </div>
      </BrowserRouter>
    </Provider>
  );
}
export default App;

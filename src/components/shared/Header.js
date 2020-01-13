import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import RentalSearchInput from '../rental/RentalSearchInput';

function Header(props) {
    const {auth, logOut, history} = props;
    const {isAuth, username} = auth;
    const handleLogout = () => {
        logOut();
        history.push('/rentals');
    }

    const renderNavBtn = () => {
        if(auth.isAuth){
            return(
                <React.Fragment>
                    <button className="nav-item nav-link clickable" onClick={handleLogout}>LogOut</button>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <Link to="/login" className="nav-item nav-link active">Login <span className="sr-only">(current)</span></Link>
                <Link to="/register" className="nav-item nav-link">Register</Link>
            </React.Fragment>
        )
    }
    const renderOwner = () => {
        
        if(isAuth){
            return (
                <div className="nav-item dropdown">
                    <button className="nav-link clickable nav-item dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Owner Section
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/rentals/create">Create Rental</Link>
                        <Link className="dropdown-item" to="/rentals">Manage Rentals</Link>
                        <Link className="dropdown-item" to="/rentals">Manage Bookings</Link>
                    </div>
                </div>
            )
        }
    }

    return (     
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/rentals">BookWithMe</Link>
                   <RentalSearchInput></RentalSearchInput>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarAltMarkUp">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarAltMarkUp">
                        <div className="navbar-nav ml-auto">  
                            {isAuth && <button className="nav-item clickable nav-link">{username}</button>}
                        {renderOwner()}
                        {renderNavBtn()}
                        </div>
                    </div>
                </div>
            </nav>     
    )
}
const mapState = (state) => {
    return {
        auth: state.auth
    }
}
export default withRouter(connect(mapState)(Header))
import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

function Header(props) {
    const {auth, logOut, history} = props;
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

    return (     
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/rentals">BookWithMe</Link>
                    <form className="form-inline my-2 my-lg-0">
                        <input type="search" className="form-control mr-sm-2 bwm-search" placeholder="Try 'New York'" aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search" type="submit">Search</button>
                    </form>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarAltMarkUp">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarAltMarkUp">
                        <div className="navbar-nav ml-auto">         
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
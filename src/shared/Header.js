import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
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
                            <a href="/login" className="nav-item nav-link active">Login <span className="sr-only">(current)</span></a>
                            <a href="/register" className="nav-item nav-link">Register</a>
                        </div>
                    </div>
                </div>
            </nav>     
    )
}

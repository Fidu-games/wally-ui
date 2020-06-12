import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav id="menu"  className="navbar navbar-expand-lg py-2">
                <Link className="navbar-brand"  id="brand" to='/'>FIDU <br/> GAMES</Link>
                <button className="navbar-toggler" 
                    type="button"  
                    data-toggle="collapse" 
                    data-target="#navbarNav"  
                    aria-controls="navbarNav"  
                    aria-expanded="false"  
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"  id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">
                                Home  
                                <span className="sr-only">current</span> 
                            </Link> 
                        </li>
                    </ul>
                </div>
                <div className="form-inline my-2 my-lg-0 ml-auto">
                    <Link to="/login" className="btn btn-outline-primary mr-sm-2">
                        Log in
                    </Link>  
                    <Link to="/sign_up" className="btn btn-success my-2 my-sm-0">Sign up</Link>
                </div>
            </nav>
        );
    }
} 

export default Menu;
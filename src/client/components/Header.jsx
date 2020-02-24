import React, {Component} from 'react';
import {
    Link
  } from "react-router-dom";

class Header extends Component {
    constructor(props){
      super(props);
      this.state = {
        isNavOpen: false,
        isProfileOpen: false
      };
      
    }

    toggleNavbar = () =>{
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    toggleProfileModal = () =>{
        this.setState({
            isProfileOpen: !this.state.isProfileOpen
        })
    }

    updateUserState = (e) =>{
        e.preventDefault();
        this.props.toggleUserProfile();
    }

    render(){
        return(
            <header className="header-flex">
                <Link to="/"><img src="/logo-original.svg" alt="Afterwardz" id="main-name"/></Link>
                <nav id="site-nav">
                    <ul>
                        <li>
                            <Link to="/">app</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/profile">Extended Profile</Link>
                        </li>
                        <li>
                            <button id="profile-info" aria-label="Toggle User Information" onClick={(e) => this.updateUserState(e)}>
                                USER PROFILE
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}


export default Header;
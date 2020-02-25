import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
    constructor(props){
      super(props);
      this.state = {
        isNavOpen: false,
      };
      
    }

    toggleNavbar = () =>{
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render(){
        return(
            <header className="header-flex">
                <Link to="/" class="header-name"><img src="/logo-original.svg" alt="" id="logo"/>Elle Pope</Link>
                <nav id="site-nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link to="/personal">Personal</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}


export default Header;
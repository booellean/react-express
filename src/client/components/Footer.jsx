import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTwitter,
    faFacebookF,
    faLinkedinIn,
    faPinterestP,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Brand from './../brand.svg';
import Form from './Form';

class Footer extends Component {
    constructor(props){
      super(props);
    }

    render(){
        return(
            <footer id="site-footer">
                <Form />
                <nav id="social-media-nav">
                    <ul>
                        <li>
                            <a className="social-link" href="https://www.facebook.com/afterwardz/" target="_blank" alt="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} className="wsite-social-item-inner"/>
                            </a>
                        </li>
                        <li>
                            <a className="social-link" href="https://twitter.com/afterwardz2" target="_blank" alt="Twitter">
                                <FontAwesomeIcon icon={faTwitter} className="wsite-social-item-inner"/>
                            </a>
                        </li>
                        <li>
                            <a className="social-link" href="https://www.linkedin.com/company/afterwardz/" target="_blank" alt="Linkedin">
                                <FontAwesomeIcon icon={faLinkedinIn} className="wsite-social-item-inner"/>
                            </a>
                        </li>
                        <li>
                            <a className="social-link" href="mailto:info@afterwardz.com" target="_blank" alt="Mail">
                                <FontAwesomeIcon icon={faEnvelope} className="wsite-social-item-inner"/>
                            </a>
                        </li>
                        <li>
                            <a className="social-link" href="https://www.pinterest.com/afterwardz/" target="_blank" alt="Pinterest">
                                <FontAwesomeIcon icon={faPinterestP} className="wsite-social-item-inner"/>
                            </a>
                        </li>
                        <li>
                            <a className="social-link" href="https://www.instagram.com/after_wardz/" target="_blank" alt="Instagram">
                                <FontAwesomeIcon icon={faInstagram} className="wsite-social-item-inner"/>
                            </a>
                        </li>
                    </ul>
                </nav>
                <small id="copyright">
                    &copy; {new Date().getFullYear()} <span dangerouslySetInnerHTML={{__html: Brand}} />
                </small>
            </footer>
        )
    }
}


export default Footer;
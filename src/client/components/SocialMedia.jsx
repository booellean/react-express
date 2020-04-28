import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as Core from '@fortawesome/fontawesome-svg-core';
const Icons = {
    BrandIcons : require('@fortawesome/free-brands-svg-icons'),
    RegularIcons : require('@fortawesome/free-regular-svg-icons'),
    SolidIcons : require('@fortawesome/free-solid-svg-icons'),
}
// const Icons = Object.assign(require('@fortawesome/free-brands-svg-icons'), ('@fortawesome/free-regular-svg-icons'), require('@fortawesome/free-solid-svg-icons'));

export class SocialFollowButtons extends Component {
    render(){
        if(this.props.sms){
            const SocialList = Object.keys(this.props.sms).map( key => {
                return <SocialFollowIcon social={this.props.sms[key]}/>
            });
            return(
                <ul>
                    { SocialList }
                </ul>
            );
        }
    }
};

export class SocialShareIcons extends Component {
    render(){
        if(this.props.sms){
            const SocialList = Object.keys(this.props.sms).map( key => {
                return <SocialShareIcon social={this.props.sms[key]}/>
            });
            return(
                <ul>
                    { SocialList }
                </ul>
            );
        }
    }
};

const SocialShareIcon = ({ social }) => {
    const Icon = Icons[social.icon.path][social.icon.name];

    return(
        <li> 
            <a href={social.link.url} {...social.link.properties} >
                <FontAwesomeIcon icon={Icon} />
            </a>
        </li>
    );
};

 const SocialFollowIcon = ({ social }) => {
    
    return(
        <React.Fragment>
        <p className="label" data-label={label}>{label}</p>
        </React.Fragment>
    );
};
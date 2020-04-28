import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

class Pagination extends Component {
    constructor(props){
      super(props);
    }

    render(){
        const navitems = [];
        let finished = false;
        let countUp = this.props.currentPage;
        let countDown = this.props.currentPage;
        let maxItems = 1;
    
        if(this.props.maxPages <= 1){
            return <React.Fragment></React.Fragment>;
        }
    
        if(this.props.currentPage - 1 < 1){
            navitems.push(
                <li aria-label="First Page">
                    <Link aria-posinset="1" to={{ search: '?page=1' }}className="disabled-link">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                </li>);
            navitems.push(
                <li aria-label="Previous Page">
                    <Link aria-posinset="1" to={{ search: '?page=1' }} className="disabled-link">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </li>);
        }else{
            navitems.push(
                <li aria-label="First Page">
                    <Link aria-posinset="1" to={{ search: '?page=1' }} onClick={ (e) => this.props.updatePage(e, 1)}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                </li>);
    
            navitems.push(
                <li aria-label="Previous Page">
                    <Link aria-posinset={this.props.currentPage - 1} to={{ search: '?page=' + (this.props.currentPage - 1) }} onClick={ (e) => this.props.updatePage(e, (this.props.currentPage - 1))}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </li>);
        }
    
    
        navitems.push(
            <li aria-label={"Page " + this.props.currentPage}>
                <Link aria-posinset={this.props.currentPage} to={{ search: '?page=' + this.props.currentPage }} className="this.props.currentPage disabled-link">
                    <span aria-hidden="true">{this.props.currentPage}</span>
                </Link>
            </li>);
    
        // Now that the starting links and current have been pushed...
        while(!finished){
            if(maxItems == 0){
                if(countDown > 1){
                    navitems.splice(2, 0, <li aria-hidden="true">...</li>);
                }
                if(countUp < this.props.maxPages){
                    navitems.push(<li aria-hidden="true">...</li>);
                }
                finished = true;
                break;
            }
    
            // infinite loop failsafe
            if(countUp > this.props.currentPage + maxItems && countDown < this.props.currentPage - maxItems){
                finished = true;
                break;
            }
    
            countUp++;
            countDown--;
    
            if(!(countUp > this.props.maxPages)){
                navitems.push(
                    <li aria-label={"Page " + countUp}>
                        <Link aria-posinset={countUp} to={{ search: '?page=' + countUp }} onClick={ (e) => this.props.updatePage(e, countUp)} >
                            <span aria-hidden="true">{countUp}</span>
                        </Link>
                    </li>);
                maxItems--;
            }
    
            if(!(countDown < 1)){
                navitems.splice(2, 0, 
                    <li aria-label={"Page " + countDown}>
                        <Link aria-posinset={countDown} to={{ search: '?page=' + countDown }} onClick={ (e) => this.props.updatePage(e, countDown)} >
                            <span aria-hidden="true">{countDown}</span>
                        </Link>
                    </li>);
                maxItems--;
            }
        }
    
        if(this.props.currentPage + 1 > this.props.maxPages){
            navitems.push(
                <li aria-label="Next Page">
                    <Link aria-posinset={this.props.maxPages} to={{ search: '?page=' + this.props.maxPages }} className="disabled-link">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                </li>);
                navitems.push(
                    <li aria-label="Last Page">
                        <Link aria-posinset={this.props.maxPages} to={{ search: '?page=' + this.props.maxPages }} className="disabled-link">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                    </li>);
        }else{
            navitems.push(
                <li aria-label="Next Page">
                    <Link aria-posinset={this.props.currentPage + 1} to={{ search: '?page=' + (this.props.currentPage + 1) }} onClick={ (e) => this.props.updatePage(e, (this.props.currentPage + 1))}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                </li>);
            navitems.push(
                <li aria-label="Last Page">
                    <Link aria-posinset={this.props.maxPages} to={{ search: '?page=' + this.props.maxPages }}onClick={ (e) => this.props.updatePage(e, this.props.maxPages)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                </li>);
        }
    
        return(
            <nav className="pagination">
                <ul role="menubar">
                    { navitems }
                </ul>
            </nav>
        );
    }
}

export default Pagination;
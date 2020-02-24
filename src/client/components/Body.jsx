import React, {Component} from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
import MainApp from './MainApp';

class Body extends Component {
    constructor(props){
      super(props);
    }

    render(){
        return(
            <main>
                <Switch>
                    <Route path="/about">
                        <div>About</div>
                    </Route>
                    <Route path="/profile">
                        <div>Extended Profile</div>
                    </Route>
                    <Route path="/">
                        <MainApp isUserOpen={this.props.isUserOpen}/>
                    </Route>
                </Switch>
            </main>
        )
    }
}


export default Body;
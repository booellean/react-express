import React, {Component} from 'react';

import Financial from './Financial';
import UserInfo from './UserInfo';

class MainApp extends Component {
    constructor(props){
      super(props);
    }

    render(){
        return(
            <div>
                <Financial/>
                Main content
                <UserInfo isUserOpen={this.props.isUserOpen}/>
            </div>
        )
    }
}

export default MainApp;
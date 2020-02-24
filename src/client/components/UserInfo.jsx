import React, {Component} from 'react';

class UserInfo extends Component {
    constructor(props){
      super(props);
    }

    componentDidUpdate(){
        console.log(this.props.isUserOpen);
    }

    render(){
        return(
            <aside id="user-profile" className={ (this.props.isUserOpen ? 'open' : 'closed')}>
                This is content!
            </aside>
        )
    }
}


export default UserInfo;
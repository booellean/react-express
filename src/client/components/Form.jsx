import React, { Component } from 'react';

class Form extends Component {
    constructor(props){
      super(props);
    }

    handleSubmission = (e) =>{
        e.preventDefault();
        console.log(e);
    }

    render(){
        return(
            <form>
                <label for="name">Name: </label>
                <input type="text" id="name" name="name" />
                <label for="email">Email: </label>
                <input type="email" id="email" name="email"/>
                <label for="question">Question: </label>
                <textarea id="question" name="question"></textarea>
                <button onClick={ (e) => this.handleSubmission(e) } >Ask!</button>
            </form>
        )
    }
}

export default Form;
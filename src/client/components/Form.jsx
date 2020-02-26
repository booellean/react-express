import React, { Component } from 'react';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Form extends Component {
    constructor(props){
      super(props);

      this.fields = {};
      this.validation = {};
      this.messages = {};

      this.state = {
          errors: {},
          fields : {},
          validation: {}
      }
    }

    componentDidMount(){
        console.log(this.fields);

        // console.log(this.state);
    }

    handleSubmission = (e) =>{
        e.preventDefault();

        const errors = {};
        // Start with fresh error state object
        this.setState({
            errors: {}
        });

        Object.keys(this.fields).forEach( field =>{
            // switch(field){
            //     case 'name':
            //         errors.name += 'This is a test error';
            //         break;
            //     case 'email':
            //         break;
            //     case 'question':
            //         break;
            // }
            console.log(this.fields[field]);
            console.log(this.validation[field]);
            console.log(this.messages[field]);
        });

        this.setState({
            errors: errors
        });

        console.log(this.state);
    }

    render(){
        return(
            <form>
                <label for="name">Name: </label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name" 
                    required 
                    ref={(ref) => {
                        this.fields['name'] = ref;
                        this.validation['name'] = { required, minLength: minLength(2), maxLength: maxLength(50) }
                        this.messages['name'] = { required : 'Please fill out your name.', minLength: 'Your name must be longer than 1 digit.', maxLength: 'You have a very long name! Do you have a shortened name you use?'}
                    }}/>
                <span style={{color: "red"}}>{this.state.errors.name}</span>

                <label for="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    ref={(ref) => {
                        this.fields['email'] = ref;
                        this.validation['email'] = { required, validEmail }
                        this.messages['email'] = { required : 'Please provide an email for a response.', validEmail: 'Your email was not valid. Please check your characters.'}
                    }}
                    />

                <label for="question">Question: </label>
                <textarea
                    id="question"
                    name="question"
                    placeholder="What would you like to Ask?"
                    required
                    ref={(ref) => {
                        this.fields['question'] = ref;
                        this.validation['question'] = { required, minLength: minLength(20), maxLength: maxLength(500)}
                        this.messages['question'] = { required : 'Your question cannot be blank.', minLength: 'That was a bit too short. You should have at least 20 characters.', maxLength: 'That was a bit long! Please keep questions brief, less than 500 characters.'}
                    }}
                    ></textarea>
                <button onClick={ (e) => this.handleSubmission(e) } >Ask!</button>
            </form>
        )
    }
}

export default Form;
import React, { Component } from 'react';
import axios from 'axios';

import RichTextEditor from 'react-rte';

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
          value : RichTextEditor.createEmptyValue(),
          toolbarConfig : {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'text-options'},
              {label: 'Italic', style: 'ITALIC', className: 'text-options'},
              {label: 'Underline', style: 'UNDERLINE', className: 'text-options'}
            ],
            BLOCK_TYPE_BUTTONS: [
              {label: 'UL', style: 'unordered-list-item'},
              {label: 'OL', style: 'ordered-list-item'}
            ]
          },
      }
    }

    handleSubmission = (e) =>{
        e.preventDefault();

        const errors = {};
        const message = {};
        // TODO: Explain what this code does... inline errors by
        Object.keys(this.fields).forEach( field =>{
            let formField;

            // special case for Froala editor
            if(field == 'question'){
                formField = this.state.value.toString('html');
            }else{
                formField = this.fields[field].value;
            }

            Object.keys(this.validation[field]).forEach( func =>{
                if(!this.validation[field][func](formField)){
                    if(errors[field]){
                        errors[field] += '<br/>' + this.messages[field][func];
                    }else{
                        errors[field] = this.messages[field][func];
                    }
                    
                }else{
                    message[field] = formField;
                }
            })
        });

        console.log(this.fields);

        this.setState({
            errors: errors
        });

        // If there are no errors, let's call our server and try to send the email!
        if(Object.keys(this.state.errors).length < 1){
            axios.post('/api/contact', {
                data : message
            })
            .then( res =>{
                if(res.data.success){
                    // TODO: custom message that it was sent!
                    // Clear the form
                }
                if(res.data.errors){
                    // TODO: custom message that they broke some rules and need to correct their form before sending
                }
                if(res.data.error){
                    // TODO: message sending failed
                }
            })
            .catch( err =>{
                console.log(err);
                // TODO: message sending failed
            })
        }
    }

    // For the wysiwyg editor
    onChange = (value) => {
        this.setState({value});
        if (this.props.onChange) {
          // Send the changes up to the parent component as an HTML string.
          // This is here to demonstrate using `.toString()` but in a real app it
          // would be better to avoid generating a string on each change.
          this.props.onChange(
            value.toString('html')
          );
        }
      };

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
                    ref={ (ref) => {
                        this.fields['name'] = ref;
                        this.validation['name'] = { required, minLength: minLength(2), maxLength: maxLength(50) }
                        this.messages['name'] = { required : 'Please fill out your name.', minLength: 'Your name must be longer than 1 digit.', maxLength: 'You have a very long name! Do you have a shortened name you use?'}
                    }}/>
                <span style={{color: "red"}} dangerouslySetInnerHTML={{__html: this.state.errors['name']}} />

                <label for="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    ref={ (ref) => {
                        this.fields['email'] = ref;
                        this.validation['email'] = { required, validEmail }
                        this.messages['email'] = { required : 'Please provide an email for a response.', validEmail: 'Your email was not valid. Please check your characters.'}
                    }}
                    />
                <span style={{color: "red"}} dangerouslySetInnerHTML={{__html: this.state.errors['email']}} />

                <label for="question">Question: </label>
                <div id="question"
                     role="textbox"
                     contenteditable="true"
                     >
                    <RichTextEditor
                        tag='textarea'
                        toolbarConfig={this.state.toolbarConfig}
                        value={this.state.value}
                        onChange={this.onChange}
                        ref={ (ref) => {
                            this.fields['question'] = ref;
                            this.validation['question'] = { required, minLength: minLength(20), maxLength: maxLength(500)}
                            this.messages['question'] = { required : 'Your question cannot be blank.', minLength: 'That was a bit too short. You should have at least 20 characters.', maxLength: 'That was a bit long! Please keep questions brief, less than 500 characters.'}
                        }}
                    />
                    <span style={{color: "red"}} dangerouslySetInnerHTML={{__html: this.state.errors['question']}} />
                </div>

                <button onClick={ (e) => this.handleSubmission(e) } >Ask!</button>
            </form>
        )
    }
}

export default Form;
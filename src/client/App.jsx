import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isUserOpen: false
    }
  }

  toggleUserProfile = () =>{
    this.setState({
      isUserOpen: !this.state.isUserOpen
    })
  }

  render(){
    return (
      <div className="App">
          <Router>
            <Header toggleUserProfile={this.toggleUserProfile}/>
            <Body isUserOpen={this.state.isUserOpen}/>
            <Footer/>
          </Router>
      </div>
    );
  }
}

export default App;

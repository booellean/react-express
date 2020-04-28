import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import "@babel/polyfill";

import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

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
          <Provider store={store}>
            <Router>
              <Header toggleUserProfile={this.toggleUserProfile}/>
              <Body isUserOpen={this.state.isUserOpen}/>
              <Footer/>
            </Router>
          </Provider>
      </div>
    );
  }
}

export default App;

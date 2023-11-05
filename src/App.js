import './App.css';


import React, { Component } from 'react'
import NavBar from './component/NavBar';
import News  from './component/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar/>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
          <Routes>
        
            <Route exact path="/" element={<News setProgress={this.setProgress }   keys="general" country="in" category="General"/>}></Route>
          
            <Route exact path="/business" element={<News setProgress={this.setProgress }   keys="business" country="in" category="Business"/>}></Route>
          
            <Route exact path="/sports" element={<News setProgress={this.setProgress }   keys="sports"country="in" category="Sports"/>}></Route>
         
            <Route exact path="/science" element={<News setProgress={this.setProgress }   keys="science"country="in" category="Science"/>}></Route>
          
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress }   keys="enertainment"country="in" category="Entertainment"/>}></Route>
          
            <Route exact path="/health" element={<News setProgress={this.setProgress }   keys="health" country="in" category="Health"/>}></Route>
          
            <Route exact path="/technology" element={<News setProgress={this.setProgress }   keys="technology" country="in" category="Technology"/>}></Route>
          
          </Routes>
        
        </Router>
        
      </div>
    )
  }
}



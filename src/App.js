import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from './store/configureStore'
import Main from './components/Main'
import './App.css'

class App extends Component {
  render () {    
    return (
      <Provider store={store}>
        <Router>
          <>
            <Route exact path="/" component={Main}></Route>
          </>
        </Router>        
      </Provider>      
    )
  }
}

export default App;
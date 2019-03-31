import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
const routing = (
  <Router>
    <div>
      <Route path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
)
export default routing;
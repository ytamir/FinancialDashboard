import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ETF_Dashboard from './components/ETF_Dashboard'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Dashboard } />
          <Route exact path='/etf' component={ ETF_Dashboard } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )
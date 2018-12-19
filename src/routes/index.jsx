import React from 'react'
import { Route, Redirect } from 'react-router'
import { HashRouter, Switch } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'
import stores from 'stores'

import Home from 'routes/home'
import About from 'routes/about'

const Routes = () => (
  <HashRouter>
    <div>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  </HashRouter>
)
const App = () => (
  <React.Fragment>
    <Provider {...stores}>
      <Routes />
    </Provider>
    <DevTools />
  </React.Fragment>
)

export default App

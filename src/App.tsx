import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { Link, Route, Switch } from 'react-router-dom'
import FancyDiv from 'components/FancyDiv'
import Dynamic from 'containers/Dynamic'
import './app.css'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <Root>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/dynamic">Dynamic</Link>
      </nav>
      <div className="content">
        <FancyDiv>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Switch>
            <Route path="/dynamic" component={Dynamic} />
            <Route render={() => <Routes />} />
          </Switch>
          </React.Suspense>
        </FancyDiv>
      </div>
    </Root>
  )
}

export default App

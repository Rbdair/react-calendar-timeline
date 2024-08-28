import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-calendar-timeline-css'
import App from './app'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const render = AppToRender => {
  root.render(<AppToRender />)
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    render(NextApp)
  })
}

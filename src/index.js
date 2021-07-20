import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Route } from "react-router-dom"
import './index.css'
import '@material-ui/core/'
import '@material-ui/icons'

import Layout from './layout/Layout'
import Top from './top/Top'
import RoomView from './roomView/RoomView'
import Oxgame from './games/Oxgame'
import CreateRoom from './createRoom/CreateRoom'

const app = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Route exact path="/" component={Top} />
        <Route path="/room" component={RoomView} />
        <Route path="/room1234567890" component={Oxgame} />
        <Route path="/createRoom" component={CreateRoom} />
      </Layout>
    </Router>
  </React.StrictMode>,
  app);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

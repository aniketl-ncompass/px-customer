import { Fragment } from 'react'
import './App.css'
import Customers from './components/Customers'
import Navbar from './components/Navbar'

function App() {
  return (
    <Fragment>
      <Navbar />
      <Customers />
    </Fragment>
  )
}

export default App

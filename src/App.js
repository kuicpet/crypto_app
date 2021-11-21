import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import { Layout, Space, Typography } from 'antd'
import {
  Navbar,
  Exchanges,
  Home,
  Cryptocurrencies,
  CryptoDetails,
  News,
  Footer
} from './components'

function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' component={Home} />
              <Route exact path='/exchanges' component={Exchanges} />
              <Route
                exact
                path='/cryptocurrencies'
                component={Cryptocurrencies}
              />
              <Route exact path='/crypto/:coinId' component={CryptoDetails} />
              <Route exact path='/news' component={News} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
         <Footer />
        </div>
      </div>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Input } from 'antd'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import axios from 'axios'

const Cryptocurrencies = ({ simplified }) => {
  // const { data: cryptosList, isFetching } = useGetCryptosQuery()
  // const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
  const [cryptos, setCryptos] = useState([])
  const [loading, setloading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const count = simplified ? 10 : 100
  useEffect(() => {
    const url = `https://coinranking1.p.rapidapi.com/coins?limit=${count}`
    const fetchData = async () => {
      setloading(true)
      const apiHeaders = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '858b5fdf14mshd6b41216305fe10p1e5c5ejsnc6ba44b4a3a1',
      }
      const { data } = await axios.get(url, { headers: apiHeaders })
      setCryptos(data.data.coins)
      console.log('results', data.data.coins)
      setloading(false)
    }
    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  return (
    <>
      <div className='search-crypto'>
        <Input
          placeholder='Search Cryptocurrencies'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row gutter={[12, 12]} className='crypto-card-container'>
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}, ${currency.name}`}
                extra={
                  <img className='crypto-image' src={currency.iconUrl} alt='' />
                }
                hoverable
              >
                <p>Price: {currency.price}</p>
                <p>Market cap: {currency.marketCap}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies

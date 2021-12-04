import { Card, Col, Row, Spin } from 'antd'
import axios from 'axios'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Exchanges = ({ simplified }) => {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(false)
  const count = simplified ? 10 : 100
  useEffect(() => {
    const url = `https://coinranking1.p.rapidapi.com/exchanges?limit=${count}`
    const API_KEY = process.env.REACT_APP_RAPID_API_KEY
    const fetchData = async () => {
      setLoading(true)
      const apiHeaders = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': `${API_KEY}`,
      }
      const { data } = await axios.get(url, { headers: apiHeaders })
      setExchanges(data.data.exchanges)
      console.log('results', data.data.exchanges)
      setLoading(false)
    }
    fetchData()
  }, [count])
  if (loading) return <Spin />
  return (
    <>
      <Row gutter={[12, 12]} className='crypto-card-container'>
        {exchanges.map((exchange) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={exchange.id}>
            <Link to={`/crypto/${exchange.id}`}>
              <Card
                title={`${exchange.rank}, ${exchange.name}`}
                extra={
                  <img className='crypto-image' src={exchange.iconUrl} alt='' />
                }
                hoverable
              >
                  <p>Market Share : {millify(exchange.marketShare)} %</p>
                  <p>Volume: {millify(exchange.volume)}</p>
                  <p>No of Markets: {millify(exchange.numberOfMarkets)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges

import { Avatar, Card, Col, Collapse, Row, Spin, Typography } from 'antd'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const { Text } = Typography
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
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Changes</Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Collapse.Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}</strong></Text>
                      <Avatar className='exchange-image' src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>{millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)} %</Col>
                  </Row>
                }
              >
                {HTMLReactParser(`${exchange.description}` || '')}
              </Collapse.Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges

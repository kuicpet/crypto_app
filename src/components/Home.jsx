import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Typography, Row, Col, Statistic, Spin } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import axios from 'axios'
import { Cryptocurrencies, News } from '.'

const { Title } = Typography

const Home = () => {
  const [results, setResults] = useState({})
  const [loading, setloading] = useState(false)
  /*const { data, isFetching } = useGetCryptosQuery()
  if (isFetching) return 'Loading...'
  console.log(data)*/

  useEffect(() => {
    const url = 'https://coinranking1.p.rapidapi.com/coins'
    const API_KEY = process.env.REACT_APP_RAPID_API_KEY
    const fetchData = async () => {
      setloading(true)
      const apiHeaders = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': `${API_KEY}`,
      }
      const { data } = await axios.get(url, { headers: apiHeaders })
      setResults(data.data.stats)
      // console.log('results', data.data.stats)
      setloading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      {loading ? (
        <div>
          <Spin />
        </div>
      ) : (
        <Row>
          <Col span={12}>
            <Statistic title='Total Cryptocurrencies' value={results.total} />
          </Col>
          <Col span={12}>
            <Statistic title='Total Exchanges' value={results.totalExchanges} />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Market Cap'
              value={results.totalMarketCap}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total 24h Volume'
              value={results.total24hVolume}
            />
          </Col>
          <Col span={12}>
            <Statistic title='Total Markets' value={results.totalMarkets} />
          </Col>
        </Row>
      )}

      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Top 10 cryptocurrencies in the World
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/cryptocurrencies'>Show more</Link>
        </Title>
      </div>
      {loading ? <Spin /> : <Cryptocurrencies simplified />}

      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest Crypto news
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/news'>Show more</Link>
        </Title>
      </div>
      {loading ? <Spin /> : <News simplified />}
    </>
  )
}

export default Home

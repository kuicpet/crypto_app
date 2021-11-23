import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Typography, Row, Col, Statistic } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import axios from 'axios'
import { Cryptocurrencies, News } from '.'

const { Title } = Typography

const Home = () => {
  const [results, setResults] = useState({}) 
    /*const { data, isFetching } = useGetCryptosQuery()
  if (isFetching) return 'Loading...'
  console.log(data)*/

    useEffect(() => {
      const url = 'https://coinranking1.p.rapidapi.com/coins'
      const fetchData = async () => {
        const apiHeaders = {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key':
            '858b5fdf14mshd6b41216305fe10p1e5c5ejsnc6ba44b4a3a1',
        }
        const { data } = await axios.get(url, { headers: apiHeaders })
        setResults(data.data.stats)
        console.log('results', data.data.stats)
      }
      fetchData()
    }, [])
  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Cryptocurrencies' value={results.total} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Exchanges' value={results.totalExchanges} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Market Cap' value={results.totalMarketCap} />
        </Col>
        <Col span={12}>
          <Statistic title='Total 24h Volume' value={results.total24hVolume} />
        </Col>
        <Col span={12}>
        <Statistic title='Total Markets' value={results.totalMarkets} />
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 cryptocurrencies in the World</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
      </div>
        <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto news</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
      </div>
        <News simplified />
    </>
  )
}

export default Home

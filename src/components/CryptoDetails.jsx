import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import axios from 'axios'
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const [loading, setloading] = useState(false)
  const [coin, setCoin] = useState({})

  useEffect(() => {
    const url = `https://coinranking1.p.rapidapi.com/coin/${coinId}`
    const API_KEY = process.env.REACT_APP_RAPID_API_KEY
    const fetchData = async () => {
      setloading(true)
      const apiHeaders = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': `${API_KEY}`,
      }
      const { data } = await axios.get(url, { headers: apiHeaders })
      setCoin(data?.data?.coin)
      console.log('results', data.data.coin)
      setloading(false)
    }
    fetchData()
  }, [coinId])
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coin.price}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: coin.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${coin.volume}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coin.marketCap}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-hign(daily avg.)',
      value: `$ ${coin.allTimeHigh?.price}`,
      icon: <TrophyOutlined />,
    },
  ]

  const genericStats = [
    {
      title: 'Number of Markets',
      value: coin.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number of Exchanges',
      value: coin.numberOfexchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Approved Supply',
      value: coin.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <ExclamationCircleOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `${coin.totalSupply}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `${coin.circulatingSupply}`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {coin.name} ({coin.slug}) Price
        </Title>
        <p>
          {coin.name} live price in US Dollars view value statistics,market cap,
          and supply
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Time period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {coin.name} Value Statistics
            </Title>
            <p>Overview showing stats of {coin.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>Overview showing stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Text level={3} className='coin-details-heading'>
            What is {coin.name}
            {HTMLReactParser(`${coin.description}`)}
          </Text>
        </Row>
        <Col className='coin-list'>
          <Text level={3} className='coin-details-heading'>
            {coin.name} links
          </Text>
          {coin.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails

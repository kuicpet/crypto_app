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

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coin.price && millify(coin.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: coin.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${coin.volume && millify(coin.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coin.marketCap && millify(coin.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-hign(daily avg.)',
      value: `$ ${millify(coin.allTimeHigh.price)}`,
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
      value: coin.approvedSupply ? <CheckOutlined/> : ,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(coin.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(coin.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  useEffect(() => {
    const url = `https://coinranking1.p.rapidapi.com/coin/${coinId}`
    const fetchData = async () => {
      setloading(true)
      const apiHeaders = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '858b5fdf14mshd6b41216305fe10p1e5c5ejsnc6ba44b4a3a1',
      }
      const { data } = await axios.get(url, { headers: apiHeaders })

      console.log('results', data.data.coin)
      setloading(false)
    }
    fetchData()
  }, [coinId])
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {coin.name} ({coin.slug}) Price
        </Title>
        <p>
          {coin.name} live Price in US Dollars
        </p>
      </Col>
    </Col>
  )
}

export default CryptoDetails

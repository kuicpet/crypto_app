import React, { useState, useEffect } from 'react'
import { Typography, Select, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import axios from 'axios'

const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
  const [cryptoNews, setCryptoNews] = useState([])
  const [loading, setloading] = useState(false)
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const count = simplified ? 6 : 12
  // const newsCategory = 'Cryptocurrency'

  /*url: 'https://bing-news-search1.p.rapidapi.com/news',
  params: {safeSearch: 'Off', textFormat: 'Raw'},
  headers: {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '858b5fdf14mshd6b41216305fe10p1e5c5ejsnc6ba44b4a3a1'
  }*/

  useEffect(() => {
    const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
    const fetchData = async () => {
      setloading(true)
      const apiHeaders = {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '858b5fdf14mshd6b41216305fe10p1e5c5ejsnc6ba44b4a3a1',
      }
      const { data } = await axios.get(url, { headers: apiHeaders })
      setCryptoNews(data.value)
      // console.log('news', data.value)
      setloading(false)
    }
    fetchData()
  }, [count, newsCategory])

  if (loading) return <p>Loading...</p>
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select a news Category'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCsae().toIndexOf(input.toLowerCase()) >=
                0
              }
            >
              <Option value='Cryptocurrency'>Cryptocurrency</Option>
            </Select>
          </Col>
        )}
        {cryptoNews.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-csrd'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                    src={news.image?.thumbnail?.contentUrl}
                    alt='news'
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar
                      src={news.provider[0]?.image?.thumbnail?.contentUrl}
                      alt=''
                    />
                    <Text className='provider-name'>
                      {news.provider[0].name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf('seconds').fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News

import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
  FundOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(null)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])
  return (
    <Container>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Crypto App</Link>
        </Typography.Title>
        <Button
          className='menu-control-container'
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to='/exchanges'>Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  margin: 10px;
  height: 100vh;
  margin: 0px;
  background-color: rgb(0, 21, 41);
`
export default Navbar

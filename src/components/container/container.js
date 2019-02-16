import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import styles from './container.less'

// const { SubMenu } = Menu
const { Header, Sider, Footer } = Layout

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: [],
      currentUser: 'wangqi',
      mInfo: [
        {
          name: '旋转三角形',
          relativeUrl: ''
        }
      ]
    }
  }
  onSelect({ item, key, selectedKeys }) {
    this.setState({
      selectedKeys
    })
  }
  render() {
    const { children } = this.props
    const subMenuList = this.state.mInfo.map((itm, idx) => {
      return (
        <Menu.Item key={idx}>
          <Link to={itm.relativeUrl}>{itm.name}</Link>
        </Menu.Item>
      )
    })
    return (
      <div className={styles.container}>
        <Layout>
          <Header className={styles.header}>
            <div className={styles.logo}>
              <a href='/'>WebGL-Demo</a>
            </div>
            <a className={styles['dropdown-link']}>{this.state.currentUser}</a>
          </Header>
          <Layout>
            <Sider
              width={200}
              style={{
                background: '#fff',
                boxShadow: '2px 0px 5px 0px rgba(0,0,0,0.06)',
                position: 'relative',
                zIndex: '9'
              }}
            >
              <Menu
                mode='inline'
                selectedKeys={this.state.selectedKeys}
                defaultOpenKeys={['sub0', 'sub1']}
                style={{ height: '100%', borderRight: 0 }}
                onSelect={this.onSelect.bind(this)}
              >
                {subMenuList}
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 12px 12px' }}>{this.state.currentUser ? children : ''}</Layout>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>WebGL ©2019 Created by wangqi</Footer>
        </Layout>
      </div>
    )
  }
}

Container.propTypes = {
  children: PropTypes.any
}

export default Container

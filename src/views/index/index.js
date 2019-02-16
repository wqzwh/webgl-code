import React, { Component } from 'react'
import { Row, Col } from 'antd'
import isEqual from 'lodash/isEqual'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
  }
  render() {
    return (
      <Row>
        <Col span={24}>欢迎</Col>
      </Row>
    )
  }
}

export default Index

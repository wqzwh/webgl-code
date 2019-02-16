import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import isEqual from 'lodash/isEqual'
import { initWebGLCanvas } from './utils/glUtil'
import { LoadShaderFile } from './utils/lodaShaderUtil'
import Triangle from './utils/triangle'
import MatrixState from './utils/matrixState'
import shaderString from './shader/shader'

class Index extends Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {}
  }
  componentDidMount() {
    this.init()
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
  }
  init() {
    // GLES上下文
    let gl
    // 变换矩阵管理类对象
    const ms = new MatrixState()
    // 要绘制的3D物体
    let ooTri
    // 着色器程序列表，集中管理
    const shaderProgArray = new Array()
    let currentAngle
    let incAngle
    // 初始化的方法
    const start = () => {
      // 获取GL上下文
      gl = initWebGLCanvas(this.canvas)
      if (!gl) {
        // 若获取GL上下文失败
        alert('创建GLES上下文失败!') // 显示错误提示信息
        return
      }
      // 获取3D Canvas
      const canvas = this.canvas
      // 设置视口
      gl.viewport(0, 0, canvas.width, canvas.height)
      // 设置屏幕背景色RGBA
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      // 初始化变换矩阵
      ms.setInitStack()
      // 设置摄像机
      ms.setCamera(0, 0, -5, 0, 0, 0, 0, 1, 0)
      // 设置投影参数
      ms.setProjectFrustum(-1.5, 1.5, -1, 1, 1, 100)
      gl.enable(gl.DEPTH_TEST) // 开启深度检测

      // 加载着色器程序
      LoadShaderFile(shaderString, 0, shaderProgArray, gl)

      if (shaderProgArray[0]) {
        // 如果着色器已加载完毕
        ooTri = new Triangle(gl, shaderProgArray[0]) // 创建三角形绘制对象
      } else {
        setTimeout(function() {
          ooTri = new Triangle(gl, shaderProgArray[0])
        }, 10) // 休息10ms后再执行
      }
      // 初始化旋转角度
      currentAngle = 0
      // 初始化角度步进值
      incAngle = 0.5
      // 定时绘制画面
      renderScene()
      function renderScene() {
        drawFrame()
        requestAnimationFrame(renderScene)
      }
    }
    // 绘制一帧画面的方法
    function drawFrame() {
      if (!ooTri) {
        alert('加载未完成！') // 提示信息
        return
      }
      // 清除着色缓冲与深度缓冲
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      // 保护现场
      ms.pushMatrix()
      // 执行旋转
      ms.rotate(currentAngle, 0, 1, 0)
      // 绘制物体
      ooTri.drawSelf(ms)
      // 恢复现场
      ms.popMatrix()
      // 修改旋转角度
      currentAngle += incAngle
      if (currentAngle > 360)
        // 保证角度范围不超过360
        currentAngle -= 360
    }
    start()
  }
  render() {
    return (
      <Row>
        <Col span={24}>
          <Card title='旋转三角形' bordered={false}>
            <canvas
              height='500'
              width='500'
              ref={e => {
                this.canvas = e
              }}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Index

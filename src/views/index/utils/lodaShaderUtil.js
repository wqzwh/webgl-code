import { loadShaderSerial } from './glUtil'

// 加载着色器的方法

// 声明shaderObject类
const shaderObject = (typeIn, textIn) => {
  return {
    type: typeIn,
    text: textIn
  }
}

// 从服务器加载着色器脚本的函数
const LoadShaderFile = (str, index, shaderProgArray, gl) => {
  const shaderStr = str // 获取响应文本
  const shaderStrA = shaderStr.split('<#BREAK_BN#>') // 用分隔符<#BREAK_BN#>切分
  const vertexShader = shaderObject('vertex', shaderStrA[0]) // 顶点着色器脚本内容
  const fragmentShader = shaderObject('fragment', shaderStrA[1]) // 片元着色器脚本内容
  shaderProgArray[index] = loadShaderSerial(gl, vertexShader, fragmentShader) // 加载着色器
}

export { LoadShaderFile }

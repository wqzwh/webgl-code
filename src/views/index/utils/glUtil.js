// 初始化WebGL Canvas的方法
const initWebGLCanvas = canvas => {
  const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']
  let context = null // 声明上下文变量
  // 遍历可能的GL上下文名称
  for (let ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], null) // 获取GL上下文
    } catch (e) {}
    if (context) {
      // 若成功获取GL上下文则终止循环
      break
    }
  }
  return context // 返回GL上下文对象
}

// 加载单个着色器的方法
const loadSingleShader = (ctx, shaderScript) => {
  let shaderType
  if (shaderScript.type == 'vertex') {
    // 若为顶点着色器
    shaderType = ctx.VERTEX_SHADER
  }
  // 顶点着色器类型
  else if (shaderScript.type == 'fragment') {
    // 若为片元着色器
    shaderType = ctx.FRAGMENT_SHADER
  }
  // 片元着色器类型
  else {
    // 否则打印错误信息
    log("*** Error: shader script of undefined type '" + shaderScript.type + "'")
    return null
  }

  // 根据类型创建着色器程序
  const shader = ctx.createShader(shaderType)

  // 加载着色器脚本
  ctx.shaderSource(shader, shaderScript.text)

  // 编译着色器
  ctx.compileShader(shader)

  // 检查编译状态
  const compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)
  if (!compiled && !ctx.isContextLost()) {
    // 若编译出错
    const error = ctx.getShaderInfoLog(shader) // 获取错误信息
    log("*** Error compiling shader '" + shaderId + "':" + error) // 打印错误信息
    ctx.deleteShader(shader) // 删除着色器程序
    return null // 返回空
  }
  return shader // 返回着色器程序
}

// 加载链接顶点、片元着色器的方法
const loadShaderSerial = (gl, vshader, fshader) => {
  // 加载顶点着色器
  const vertexShader = loadSingleShader(gl, vshader)
  // 加载片元着色器
  const fragmentShader = loadSingleShader(gl, fshader)

  // 创建着色器程序
  const program = gl.createProgram()

  // 将顶点着色器和片元着色器挂接到着色器程序
  gl.attachShader(program, vertexShader) // 将顶点着色器添加到着色器程序中
  gl.attachShader(program, fragmentShader) // 将片元着色器添加到着色器程序中

  // 链接着色器程序
  gl.linkProgram(program)

  // 检查链接是否成功
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked && !gl.isContextLost()) {
    // 若链接不成功
    // 获取并在控制台打印错误信息
    const error = gl.getProgramInfoLog(program) // 获取错误信息
    log('Error in program linking:' + error) // 打印错误信息

    gl.deleteProgram(program) // 删除着色器程序
    gl.deleteProgram(fragmentShader) // 删除片元着色器
    gl.deleteProgram(vertexShader) // 删除顶点着色器

    return null // 返回空
  }
  gl.useProgram(program)
  gl.enable(gl.DEPTH_TEST)
  return program // 返回着色器程序
}

export { initWebGLCanvas, loadShaderSerial }
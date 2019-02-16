const shaderString = `uniform mat4 uMVPMatrix; // 总变换矩阵
attribute vec3 aPosition;  // 顶点位置
attribute vec4 aColor;    // 顶点颜色
varying  vec4 vColor;  // 用于传递给片元着色器的变量
void main(){                            		
   gl_Position = uMVPMatrix * vec4(aPosition,1); // 根据总变换矩阵计算此次绘制此顶点位置
   vColor = aColor;// 将接收的颜色传递给片元着色器 
}                      
<#BREAK_BN#>
precision mediump float;
varying  vec4 vColor; // 接收从顶点着色器过来的参数
void main(){                       
   gl_FragColor = vColor;// 给此片元颜色值
}`

export default shaderString

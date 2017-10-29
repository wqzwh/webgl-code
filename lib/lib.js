function initShader(gl, vertexShaderSource, fragmentShaderSource) {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.useProgram(program);
    console.log(gl.getShaderInfoLog(fragmentShader));
    return program;
}

function bindAttribute(cxt, attributeName, data, program,n) {

    var buffer = cxt.createBuffer();
    cxt.bindBuffer(cxt.ARRAY_BUFFER, buffer);
    cxt.bufferData(cxt.ARRAY_BUFFER, data, cxt.STATIC_DRAW);

    var posLocation = cxt.getAttribLocation(program, attributeName);
    cxt.vertexAttribPointer(posLocation, n || 2, cxt.FLOAT, false, 0, 0);
    cxt.enableVertexAttribArray(posLocation);

}

// 矩阵相乘
function multiplyMatrix(matrixA, matrixB) {
    var result = new Float32Array(16);
    for (var i = 0; i < 4; i++) {
        result[i] =
            matrixA[i] * matrixB[0] + matrixA[i + 4] * matrixB[1] + matrixA[i + 8] * matrixB[2] + matrixA[i + 12] * matrixB[3];
        result[i + 4] =
            matrixA[i] * matrixB[4] + matrixA[i + 4] * matrixB[5] + matrixA[i + 8] * matrixB[6] + matrixA[i + 12] * matrixB[7];
        result[i + 8] =
            matrixA[i] * matrixB[8] + matrixA[i + 4] * matrixB[9] + matrixA[i + 8] * matrixB[10] + matrixA[i + 12] * matrixB[11];
        result[i + 12] =
            matrixA[i] * matrixB[12] + matrixA[i + 4] * matrixB[13] + matrixA[i + 8] * matrixB[14] + matrixA[i + 12] * matrixB[15];

    }
    return result;
}


// 创建旋转矩阵
function createXZMatrix(angle) {
    var t = Math.PI * angle / 180;
    var sinB = Math.sin(t);
    var cosB = Math.cos(t);
    return new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
}

// 创建缩放矩阵
function createSFMatrix(sx, sy) {
    return new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

// 创建平移矩阵
function createPYMatrix(tx, ty) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        tx, ty, 0.0, 1.0
    ]);
}

// dot
function dot(a,b){
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

// minus
function minus(a,b){
    return new Float32Array([
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2]
    ]);
}

//  v 类型化数组
function normalize(v){
    var sum = 0;
    for(var i=0;i<v.length; i++){
        sum += v[i] * v[i];
    }
    var vm = Math.sqrt(sum);
    for(var j=0;j<v.length;j++){
        v[j] = v[j] / vm;
    }
}

// cross
function cross(a,b){
    var nX ,nY,nZ;
    nX = a[1] * b[2] - a[2] * b[1];
    nY = a[2] * b[0] - a[0] * b[2];
    nZ = a[0] * b[1] - a[1] * b[0];

    return new Float32Array([nX,nY,nZ]);
}

// 正射投影矩阵
function getOMX(left,right,bottom,top,near,far){
    return new Float32Array([
        2/(right-left),0,0,0,
        0,2/(top-bottom),0,0,
        0,0,-2/(far-near),0,
        -(right+left)/(right-left),
        -(top+bottom)/(top-bottom),
        -(far+near)/(far-near),
        1
    ]);
}

// 视图矩阵
function getVMatrix(eyeX){
    var eye = new Float32Array([eyeX,0.25,0.25]);
    var lookat = new Float32Array([0,0,0]);
    var up = new Float32Array([0,1,0]);

    var z = minus(eye,lookat);
    normalize(z);
    normalize(up);
    var x = cross(up,z);
    normalize(x);

    var y = cross(z,x);

    return new Float32Array([
        x[0],y[0],z[0],0,
        x[1],y[1],z[1],0,
        x[2],y[2],z[2],0,
        -dot(x,eye),-dot(y,eye),-dot(z,eye),1
    ]);

}













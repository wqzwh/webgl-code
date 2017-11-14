function share( planeFlag = true) {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;



  var scene = new THREE.Scene();

  if(planeFlag){
    // 定义平面

    var planeGeometry = new THREE.PlaneGeometry(60, 30);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -.5 * Math.PI;
    plane.position.set(15,0,0);
    scene.add(plane)
  }


  return {
    scene: scene,
    camera: new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1000),
    renderer: renderer
  }
}

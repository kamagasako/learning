$(document).ready(() => {
  console.log('ready!');

  // シーン
  let scene = new THREE.Scene();

  // Stats, dat.GUI
  let stats = initStats();
  let controls = new function() {
    this.cameraX = -30;
    this.cameraY = 40;
    this.cameraZ = 30;
    this.planeX = - Math.PI / 2;
    this.planeY = 0;
    this.planeZ = 0;
    //this.jX = 0;
    //this.jY = 0;
    //this.jZ = 0;
    this.rotateJ1 = false;
    this.rotateJ2 = false;
    this.rotateSpeed = 0.05;
  }
  let gui = new dat.GUI();
  gui.add(controls, 'cameraX', -50, 50);
  gui.add(controls, 'cameraY', -50, 50);
  gui.add(controls, 'cameraZ', -50, 50);
  gui.add(controls, 'planeX', - Math.PI, Math.PI);
  gui.add(controls, 'planeY', - Math.PI, Math.PI);
  gui.add(controls, 'planeZ', - Math.PI, Math.PI);
  //gui.add(controls, 'jX', -20, 20);
  //gui.add(controls, 'jY', -20, 20);
  //gui.add(controls, 'jZ', -20, 20);
  gui.add(controls, 'rotateJ1');
  gui.add(controls, 'rotateJ2');
  gui.add(controls, 'rotateSpeed', 0, 0.2);

  // 床板
  let planeGeo = new THREE.PlaneGeometry(20, 20);
  let planeMat = new THREE.MeshLambertMaterial({ color: 0xCCCCCC});
  let plane = new THREE.Mesh(planeGeo, planeMat);
  plane.receiveShadow = true;
  scene.add(plane);

  // J1
  let j1Geo = new THREE.CylinderGeometry(5, 5, 10, 100);
  let j1Mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
  let j1 = new THREE.Mesh(j1Geo, j1Mat);
  j1.position.y = 5;
  scene.add(j1);

  // J2
  let j2Geo = new THREE.CylinderGeometry(5, 5, 20, 100);
  let j2Mat = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
  let j2 = new THREE.Mesh(j2Geo, j2Mat);
  j2.position.x = 10;
  j2.rotation.z = Math.PI / 2;
  j1.add(j2);

  // J3
  let j3Geo = new THREE.CylinderGeometry(5, 5, 20, 100);
  let j3Mat = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
  let j3 = new THREE.Mesh(j3Geo, j3Mat);
  j3.position.x = 10;
  j3.position.y = -5;
  j3.rotation.z = Math.PI / 2;
  j2.add(j3);


  // 光源
  let spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(1000, 1000, 1000);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // ヘルパー
  let axes = new THREE.AxisHelper(100);
  scene.add(axes);

  // カメラ
  let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = controls.cameraX;
  camera.position.y = controls.cameraY;
  camera.position.z = controls.cameraZ;
  camera.lookAt(scene.position);

  // レンダラ
  let renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  // 画面更新
  let render = () => {
    stats.update();

    // 床板
    plane.rotation.x = controls.planeX;
    plane.rotation.y = controls.planeY;
    plane.rotation.z = controls.planeZ;

    // カメラ
    camera.position.x = controls.cameraX;
    camera.position.y = controls.cameraY;
    camera.position.z = controls.cameraZ;

    // 動作確認
    //j.position.x = controls.jX;
    //j.position.y = controls.jY;
    //j.position.z = controls.jZ;

    // 回転
    if (controls.rotateJ1) {
      let q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), controls.rotateSpeed);
      q.multiply(j1.quaternion.clone());
      j1.quaternion.copy(q);
    }
    if (controls.rotateJ2) {
      let q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), controls.rotateSpeed);
      q.multiply(j2.quaternion.clone());
      j2.quaternion.copy(q);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  console.log('done!');
});

// Stats初期化
let initStats = () => {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.getElementById('Stats-output').appendChild(stats.domElement);
  return stats;
}

$(document).ready(() => {
  console.log('ready!');

  // データ自動更新
  let data = [0, 0, 0, 0, 0, 0];
  setInterval(() => {
    for (let i = 0; i < data.length; i++) {
      let tmp = Math.floor(Math.random() * 360); // 0 - 359
      data[i] = tmp > 180 ? tmp - 360 : tmp; // -179 - 180
    }
    console.log(data);
  }, 1000);

  // 現在の状況
  let status = [0, 0, 0, 0, 0, 0];

  // シーン
  let scene = new THREE.Scene();

  // Stats, dat.GUI
  let stats = initStats();
  let controls = new function() {
    this.cameraX = 40;
    this.cameraY = 80;
    this.cameraZ = 120;
    //this.jX = 0;
    //this.jY = 0;
    //this.jZ = 0;
    this.rotateJ1 = false;
    this.rotateJ2 = false;
    this.rotateJ3 = false;
    this.rotateJ4 = false;
    this.rotateJ5 = false;
    this.rotateJ6 = false;
    this.rotateSpeed = 0.1;
  }
  let gui = new dat.GUI();
  gui.add(controls, 'cameraX', -100, 100);
  gui.add(controls, 'cameraY', 0, 200);
  gui.add(controls, 'cameraZ', -100, 100);
  //gui.add(controls, 'jX', -100, 100);
  //gui.add(controls, 'jY', -100, 100);
  //gui.add(controls, 'jZ', -100, 100);
  gui.add(controls, 'rotateJ1');
  gui.add(controls, 'rotateJ2');
  gui.add(controls, 'rotateJ3');
  gui.add(controls, 'rotateJ4');
  gui.add(controls, 'rotateJ5');
  gui.add(controls, 'rotateJ6');
  gui.add(controls, 'rotateSpeed', -0.1, 0.1);

  // 床板
  let planeGeo = new THREE.PlaneGeometry(20, 20);
  let planeMat = new THREE.MeshLambertMaterial({ color: 0xCCCCCC});
  let plane = new THREE.Mesh(planeGeo, planeMat);
  // 床板
  plane.rotation.x = - Math.PI / 2;
  plane.rotation.y = 0;
  plane.rotation.z = 0;
  plane.receiveShadow = true;
  scene.add(plane);

  // J1
  let j1Geo = new THREE.CylinderGeometry(5, 5, 10, 100);
  let j1Mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
  let j1 = new THREE.Mesh(j1Geo, j1Mat);
  j1.position.y = 5;
  scene.add(j1);

  // J2
  let j2Geo = new THREE.CylinderGeometry(5, 5, 30, 100);
  let j2Mat = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
  let j2 = new THREE.Mesh(j2Geo, j2Mat);
  j2.position.x = 15;
  j2.rotation.z = Math.PI / 2;
  j1.add(j2);

  // J3
  let j3Geo = new THREE.CylinderGeometry(5, 5, 80, 100);
  let j3Mat = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
  let j3 = new THREE.Mesh(j3Geo, j3Mat);
  j3.position.x = 40;
  j3.position.y = -10;
  j3.rotation.z = Math.PI / 2;
  j2.add(j3);

  // J4
  let j4Geo = new THREE.CylinderGeometry(5, 5, 30, 100);
  let j4Mat = new THREE.MeshLambertMaterial({ color: 0x0000FF });
  let j4 = new THREE.Mesh(j4Geo, j4Mat);
  j4.rotation.z = Math.PI / 2;
  j4.position.x = 15;
  j4.position.y = -35;
  j3.add(j4);

  // J5
  let j5Geo = new THREE.CylinderGeometry(5, 5, 60, 100);
  let j5Mat = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
  let j5 = new THREE.Mesh(j5Geo, j5Mat);
  j5.rotation.z = Math.PI / 2;
  j5.position.x = 30;
  j5.position.y = -10;
  j4.add(j5);

  // J6
  let j6Geo = new THREE.CylinderGeometry(5, 5, 20, 100);
  let j6Mat = new THREE.MeshLambertMaterial({ color: 0x00FFFF });
  let j6 = new THREE.Mesh(j6Geo, j6Mat);
  j6.rotation.z = Math.PI / 2;
  j6.position.x = 10;
  j6.position.y = -25;
  j5.add(j6);

  // J7
  let j7Geo = new THREE.CylinderGeometry(5, 5, 10, 100);
  let j7Mat = new THREE.MeshLambertMaterial({ color: 0xFF00FF });
  let j7 = new THREE.Mesh(j7Geo, j7Mat);
  j7.rotation.z = Math.PI / 2;
  j7.position.x = 5;
  j7.position.y = -5;
  j6.add(j7);

  // スポットライト
  let spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(1000, 1000, 1000);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // 環境光
  let ambientLight = new THREE.AmbientLight(0x666666);
  scene.add(ambientLight);

  // ヘルパー
  let axes = new THREE.AxisHelper(100);
  scene.add(axes);

  // カメラ
  let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
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

    // カメラ
    camera.position.x = controls.cameraX;
    camera.position.y = controls.cameraY;
    camera.position.z = controls.cameraZ;

    // 表示確認
    //j7.position.x = controls.jX;
    //j7.position.y = controls.jY;
    //j7.position.z = controls.jZ;

    // 回転
    const VECTORS = {
      x : new THREE.Vector3(1, 0, 0),
      y : new THREE.Vector3(0, 1, 0),
      z : new THREE.Vector3(0, 0, 1),
    }
    const ACTUATORS = [
      [ j1, controls.rotateJ1, VECTORS.y ],
      [ j2, controls.rotateJ2, VECTORS.x ],
      [ j3, controls.rotateJ3, VECTORS.x ],
      [ j4, controls.rotateJ4, VECTORS.x ],
      [ j5, controls.rotateJ5, VECTORS.x ],
      [ j6, controls.rotateJ6, VECTORS.x ]
    ];
    for (let i = 0; i < ACTUATORS.length; i++) {
      let actuator = ACTUATORS[i];
      if (actuator[1]) {
        let speed = controls.rotateSpeed;
        if (data[i] > status[i]) {
          speed *= 1;
        } else if (data[i] < status[i]) {
          speed *= -1;
        } else {
          speed *= 0;
        }
        let q = new THREE.Quaternion();
        q.setFromAxisAngle(actuator[2], speed);
        q.multiply(actuator[0].quaternion.clone());
        actuator[0].quaternion.copy(q);
        status[i] += (speed * 180 / Math.PI);
      }
    }
    /*
    if (controls.rotateJ1) {
      let speed = controls.rotateSpeed;
      if (data[0] > status[0]) {
        speed *= 1;
      } else if (data[0] < status[0]) {
        speed *= -1;
      } else {
        speed *= 0;
      }
      let q = new THREE.Quaternion();
      //q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), controls.rotateSpeed);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), speed);
      q.multiply(j1.quaternion.clone());
      j1.quaternion.copy(q);
      status[0] += (speed * 180 / Math.PI);
    }
    if (controls.rotateJ2) {
      let q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), controls.rotateSpeed);
      q.multiply(j2.quaternion.clone());
      j2.quaternion.copy(q);
    }
    if (controls.rotateJ3) {
      let q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), controls.rotateSpeed);
      q.multiply(j3.quaternion.clone());
      j3.quaternion.copy(q);
    }
    if (controls.rotateJ4) {
      let q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), controls.rotateSpeed);
      q.multiply(j4.quaternion.clone());
      j4.quaternion.copy(q);
    }
    if (controls.rotateJ5) {
      let q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), controls.rotateSpeed);
      q.multiply(j5.quaternion.clone());
      j5.quaternion.copy(q);
    }
    if (controls.rotateJ6) {
      let q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), controls.rotateSpeed);
      q.multiply(j6.quaternion.clone());
      j6.quaternion.copy(q);
    }
    */
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

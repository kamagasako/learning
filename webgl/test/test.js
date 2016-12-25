// データ自動更新の間隔 [ミリ秒]
const INTERVAL = 1000;

// 回転軸となるベクトル
const VECTORS = {
  x : new THREE.Vector3(1, 0, 0).normalize(),
  y : new THREE.Vector3(0, 1, 0).normalize(),
  z : new THREE.Vector3(0, 0, 1).normalize()
}

// 各軸のパラメータ
// TODO position, rotationの連想配列化、全体のクラス化、等
const ACTUATOR_PARAMS = [
  { args: [5, 5, 10, 100], color: 0xFFFFFF, rotation: [0, 0, 0], position: [0, 5, 0], parent: null, axis: VECTORS.y },
  { args: [5, 5, 30, 100], color: 0xFF0000, rotation: [0, 0, Math.PI / 2], position: [15, 0, 0], parent: 0, axis: VECTORS.x },
  { args: [5, 5, 80, 100], color: 0x00FF00, rotation: [0, 0, Math.PI / 2], position: [40, -10, 0], parent: 1, axis: VECTORS.x },
  { args: [5, 5, 30, 100], color: 0x0000FF, rotation: [0, 0, Math.PI / 2], position: [15, -35, 0], parent: 2, axis: VECTORS.x },
  { args: [5, 5, 60, 100], color: 0xFFFF00, rotation: [0, 0, Math.PI / 2], position: [30, -10, 0], parent: 3, axis: VECTORS.x },
  { args: [5, 5, 20, 100], color: 0x00FFFF, rotation: [0, 0, Math.PI / 2], position: [10, -25, 0], parent: 4, axis: VECTORS.x },
  { args: [5, 5, 10, 100], color: 0xFF00FF, rotation: [0, 0, Math.PI / 2], position: [5, -5, 0], parent: 5, axis: VECTORS.x }
];

$(document).ready(function() {
  console.log('ready!');

  // データ自動更新
  let data = [0, 0, 0, 0, 0, 0];
  setInterval(function() {
    for (let i = 0; i < data.length; i++) {
      let tmp = Math.floor(Math.random() * 360); // 0 - 359
      data[i] = tmp > 180 ? tmp - 360 : tmp; // -179 - 180
    }
    console.log(data);
  }, INTERVAL);

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
    this.rotateJ1 = true;
    this.rotateJ2 = true;
    this.rotateJ3 = true;
    this.rotateJ4 = true;
    this.rotateJ5 = true;
    this.rotateJ6 = true;
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
  gui.add(controls, 'rotateSpeed', -1, 1);

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

  let actuators = [];
  for (let i = 0; i < ACTUATOR_PARAMS.length; i++) {
    let param = ACTUATOR_PARAMS[i];
    let geo = new THREE.CylinderGeometry(param.args[0], param.args[1], param.args[2], param.args[3]);
    let mat = new THREE.MeshLambertMaterial({ color: param.color });
    let actuator = new THREE.Mesh(geo, mat);
    actuator.position.x = param.position[0]; // Vector3で渡したい
    actuator.position.y = param.position[1];
    actuator.position.z = param.position[2];
    actuator.rotation.x = param.rotation[0]; // Eulerで渡したい
    actuator.rotation.y = param.rotation[1];
    actuator.rotation.z = param.rotation[2];
    if (param.parent == null) {
      scene.add(actuator);
    } else {
      actuators[param.parent].add(actuator); // 子が先に定義された場合、エラー
    }
    actuator.userData.axis = param.axis;
    actuator.userData.degree = 0;
    actuators[i] = actuator;
  }

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
  let render = function() {
    stats.update();

    // カメラ
    camera.position.x = controls.cameraX;
    camera.position.y = controls.cameraY;
    camera.position.z = controls.cameraZ;

    // 表示確認
    //j7.position.x = controls.jX;
    //j7.position.y = controls.jY;
    //j7.position.z = controls.jZ;

    let flags = [
      controls.rotateJ1,
      controls.rotateJ2,
      controls.rotateJ3,
      controls.rotateJ4,
      controls.rotateJ5,
      controls.rotateJ6
    ];
    for (let i = 0; i < actuators.length; i++) {
      let actuator = actuators[i];
      if (flags[i]) {
        let speed = controls.rotateSpeed;
        if (data[i] > actuator.userData.degree) {
          speed *= 1;
        } else if (data[i] < actuator.userData.degree) {
          speed *= -1;
        } else {
          speed *= 0;
        }
        let q = new THREE.Quaternion();
        q.setFromAxisAngle(actuator.userData.axis, speed);
        q.multiply(actuator.quaternion.clone());
        actuator.quaternion.copy(q);

        // ガタガタ対応
        let tmp = actuator.userData.degree + (speed * 180 / Math.PI);
        if ((speed > 0 && tmp > data[i]) || (speed < 0 && tmp < data[i])) { // 行き過ぎた場合は戻す
          actuator.userData.degree = data[i];
        } else {
          actuator.userData.degree = tmp;
        }
      }
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  console.log('done!');
});

// Stats初期化
let initStats = function() {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.getElementById('Stats-output').appendChild(stats.domElement);
  return stats;
}

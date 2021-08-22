import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const fieldOfView = 75; // field of view - straight view is 60 degrees
const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;
let aspectRatio = windowInnerWidth / windowInnerHeight;
const viewFrustum = 0.1;
const viewDistance = 1000;

const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, viewFrustum, viewDistance);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

// Set Renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowInnerWidth, windowInnerHeight);
// Camera
camera.position.setZ(30);

// First Render
renderer.render(scene, camera);

// Sphere - bubble
const geometry = new THREE.SphereGeometry(15, 50, 50);
const material = new THREE.MeshStandardMaterial({ color: 0x0fffff, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
// Spotlight
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
// AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Light Helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function animate() {
  requestAnimationFrame(animate);
  // sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.0000727;
  moon.rotation.y += 0.0003;
  sphere.rotation.speed = 0.1;
  controls.update();
  renderer.render(scene, camera);
}
animate();

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 0.9, 0.9, 0.9 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const material2 = new THREE.MeshBasicMaterial( {
  color: 0x888888,
  transparent: true,
  opacity: 0.05,
})
camera.position.z = 15;

const cubes: THREE.Mesh[] = [];

function createCube(x: number, y: number, z: number) {
  const cube = new THREE.Mesh( geometry, material2 );
  cube.position.set(x, y, z);
  cubes.push(cube);
  scene.add(cube);
}

for (let x = -5; x <= 5; x ++) {
  for (let y = -5; y <= 5; y ++) {
    for (let z = -5; z <= 5; z ++) {
      createCube(x, y, z);
    }
  }
}

let selectedCube = cubes[0];

let overlay = document.getElementById("overlay") as HTMLDivElement;

let frames = 0;
function animate( time: number) {
  //scene.rotation.x = time / 2000;
  //scene.rotation.y = time / 1000;
  scene.rotation.y = time / 5000;
  if (frames % 16 === 0) {
    selectedCube.material = material2;
    selectedCube = cubes[Math.floor(Math.random() * cubes.length)];
    selectedCube.material = material;
  }

  frames ++;
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
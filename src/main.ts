import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 0.9, 0.9, 0.9 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const grassMat = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const waterMat = new THREE.MeshLambertMaterial( { color: 0x0066ff } );

camera.position.y = 15;
camera.position.z = 15;
camera.rotation.x = -0.3;


const color = 0xFFFFFF;
const intensity = 0.75;
const ambientLight = new THREE.AmbientLight(color, intensity/40);
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(color, intensity);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

let overlay = document.getElementById("overlay") as HTMLDivElement;

let basePlane = new THREE.Mesh( new THREE.PlaneGeometry( 64*5, 64*5 ), waterMat );
basePlane.rotation.x = - Math.PI / 2;
scene.add( basePlane );

//create plane
const size = 64;
const width = size;
const height = size;
const planeGeometry = new THREE.PlaneGeometry(
  width*5,
  height*5,
  width - 1,
  height - 1
);

//create data
const data: number[][] = [];
for (let y = 0; y < height; y++) {
  const row: number[] = [];
  for (let x = 0; x < width; x++) {
    const z = (-0.45 + Math.random()) * 20; // Beispiel-Height-Wert
    row.push(z);
  }
  data.push(row);
}

//smooth terrain
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const sum =
      data[y][x] +
      data[y - 1][x] +
      data[y + 1][x] +
      data[y][x - 1] +
      data[y][x + 1];
    data[y][x] = sum / 5;
  }
}

//set vertices from data
const vertices = planeGeometry.attributes.position;
for (let i = 0; i < vertices.count; i++) {
  const x = i % width;
  const y = Math.floor(i / width);

  const z = data[y][x]; // dein Height-Wert

  vertices.setZ(i, z);
}
vertices.needsUpdate = true;
planeGeometry.computeVertexNormals();

const plane = new THREE.Mesh( planeGeometry, grassMat );
plane.rotation.x = - Math.PI / 2;
scene.add( plane );



let frames = 0;
function animate( time: number) {
  //scene.rotation.x = time / 2000;
  //scene.rotation.y = time / 1000;
  scene.rotation.y = time / 5000;

  frames ++;
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
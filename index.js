const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const material = new THREE.MeshBasicMaterial( {color: '#ECBD2C'} );
const sun = new THREE.Mesh( geometry, material );
scene.add(sun);

var earthPivot = new THREE.Object3D();
sun.add( earthPivot );

const earthGeometry = new THREE.SphereGeometry( 2, 20, 20 );
const earthMaterial = new THREE.MeshBasicMaterial( {color: '#31ec3e'} );
const earth = new THREE.Mesh( earthGeometry, earthMaterial );
earth.position.x = 30;
earthPivot.add( earth );


camera.position.z = 50;

const animate = function () {
  requestAnimationFrame( animate );
  earthPivot.rotation.y += 0.01;


  renderer.render( scene, camera );
};

animate();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Resize window size on re-size

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Create skybox cube
const skyGeometry = new THREE.BoxGeometry(1000, 1000, -100);
const skyMaterial = new THREE.MeshBasicMaterial({color: 'grey'});
const skybox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skybox);

// Create Sun

const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({color: '#ECBD2C'});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create Earth

const earthGeometry = new THREE.SphereGeometry(2, 20, 20);
const earthMaterial = new THREE.MeshBasicMaterial({color: '#31ec3e'});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 30;

// Orbit Earth around the sun
const earthPivot = new THREE.Object3D();
sun.add(earthPivot);
earthPivot.add(earth);


// Create the Moon

const moonGeometry = new THREE.SphereGeometry(1, 5, 5);
const moonMaterial = new THREE.MeshBasicMaterial({color: 'white'});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = 5;

// Orbit Earth around the sun

const moonPivot = new THREE.Object3D();
earth.add(moonPivot);
moonPivot.add(moon);

// Add pointlight to sun
const sunLight = new THREE.PointLight('#ff8000', 100, 1000);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

camera.position.set(0,10,75);

const animate = function () {
  requestAnimationFrame(animate);
  earthPivot.rotation.y += 0.005;
  moonPivot.rotation.y += 0.003;

  renderer.render(scene, camera);
};

animate();

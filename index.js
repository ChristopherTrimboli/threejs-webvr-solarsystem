const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// Resize window size on re-size

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Create skybox cube

const starTexture = new THREE.TextureLoader().load( 'stars2.jpg' );
const starMaterial = new THREE.MeshBasicMaterial( { map: starTexture } );

const skyGeometry = new THREE.BoxGeometry(1000, 1000, -1000);

const skybox = new THREE.Mesh(skyGeometry, starMaterial);
scene.add(skybox);

// Create Sun

const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({color: '#ECBD2C'});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add pointlight to sun
const sunLight = new THREE.PointLight('#ff8000', 100, 1000);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Create Earth

const earthGeometry = new THREE.SphereGeometry(2, 20, 20);
const earthMaterial = new THREE.MeshBasicMaterial({color: '#31ec3e'});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(sunLight);
earth.position.x = 30;

// Orbit Earth around the sun
const earthPivot = new THREE.Object3D();
sun.add(earthPivot);
earthPivot.add(earth);

// Create the Moon

const moonGeometry = new THREE.SphereGeometry(1, 5, 5);
const moonMaterial = new THREE.MeshBasicMaterial({color: 'white'});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.position.x = 5;

// Orbit moon around earth

const moonPivot = new THREE.Object3D();
earth.add(moonPivot);
moonPivot.add(moon);

// Create jupiter

const jupiterGeometry = new THREE.SphereGeometry(4, 20, 20);
const jupiterMaterial = new THREE.MeshBasicMaterial({color: '#ec151e'});
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);
jupiter.position.x = 60;

// Orbit Jupiter around the sun

const jupiterPivot = new THREE.Object3D();
sun.add(jupiterPivot);
jupiterPivot.add(jupiter);


// Camera controls

const controls = new THREE.OrbitControls( camera );
controls.update();
camera.position.set(0,10,75);

const animate = function () {
  requestAnimationFrame(animate);
  earthPivot.rotation.y += 0.005;
  moonPivot.rotation.y += 0.003;
  jupiterPivot.rotation.y += 0.002;
  controls.update();

  renderer.render(scene, camera);
};

animate();

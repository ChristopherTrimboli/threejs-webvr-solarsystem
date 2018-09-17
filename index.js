// Planets are 1:1000
// Distances are 1:100,000

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );

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

const loader = new THREE.CubeTextureLoader();
loader.setPath( './images/milky_way-cubemap/' );

const starsTextureCube = loader.load( [
  'GalaxyTex_NegativeX.png', 'GalaxyTex_PositiveX.png',
  'GalaxyTex_NegativeY.png', 'GalaxyTex_PositiveY.png',
  'GalaxyTex_PositiveZ.png', 'GalaxyTex_NegativeZ.png'
] );

const starMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: starsTextureCube } );
const skyGeometry = new THREE.BoxGeometry(100000, 100000, -100000);

const skybox = new THREE.Mesh(skyGeometry, starMaterial);
scene.add(skybox);

// Create Sun

const sunTexture = new THREE.TextureLoader().load( './images/sunbumpmap.jpg' );
const sunMaterial = new THREE.MeshBasicMaterial( { map: sunTexture } );

const sunGeometry = new THREE.SphereGeometry(695, 100, 100);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add pointlight to sun
const sunLight = new THREE.PointLight('#ffb013', 100, 1000);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// create mercury

const mercuryTexture = new THREE.TextureLoader().load( './images/mercurybumpmap.jpg' );
const mercuryMaterial = new THREE.MeshBasicMaterial( { map: mercuryTexture } );

const mercuryGeometry = new THREE.SphereGeometry(1, 100, 100);
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);
mercury.position.x = 927;

// Orbit mercury around the sun
const mercuryPivot = new THREE.Object3D();
sun.add(mercuryPivot);
mercuryPivot.add(mercury);

// Create Earth

const earthTexture = new THREE.TextureLoader().load( './images/earthbumpmap.jpg' );
const earthMaterial = new THREE.MeshBasicMaterial( { map: earthTexture } );

const earthGeometry = new THREE.SphereGeometry(12.7, 100, 100);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(sunLight);
earth.position.x = 1496;

// Orbit Earth around the sun
const earthPivot = new THREE.Object3D();
sun.add(earthPivot);
earthPivot.add(earth);

// Create the Moon

const moonTexture = new THREE.TextureLoader().load( './images/moonbumpmap.jpg' );
const moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );

const moonGeometry = new THREE.SphereGeometry(3.5, 100, 100);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.position.x = 20;

// Orbit moon around earth

const moonPivot = new THREE.Object3D();
earth.add(moonPivot);
moonPivot.add(moon);

// Create mars

const marsTexture = new THREE.TextureLoader().load( './images/marsbumpmap.jpg' );
const marsMaterial = new THREE.MeshBasicMaterial( { map: marsTexture } );

const marsGeometry = new THREE.SphereGeometry(6.8, 100, 100);
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);
mars.position.x = 2627;

// Orbit mars around the sun
const marsPivot = new THREE.Object3D();
sun.add(marsPivot);
marsPivot.add(mars);

// Create jupiter

const jupiterTexture = new THREE.TextureLoader().load( './images/jupiterbumpmap.jpg' );
const jupiterMaterial = new THREE.MeshBasicMaterial( { map: jupiterTexture } );

const jupiterGeometry = new THREE.SphereGeometry(139.8, 20, 20);
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);
jupiter.position.x = 8133;

// Orbit Jupiter around the sun

const jupiterPivot = new THREE.Object3D();
sun.add(jupiterPivot);
jupiterPivot.add(jupiter);


// Camera controls

const controls = new THREE.OrbitControls( camera );
controls.update();
camera.position.set(0,1000,5000);

if (navigator.getVRDisplays) {
  navigator.getVRDisplays()
    .then(displays => {
      const presentingDisplay = displays.find(display => display.isPresenting);
      if (presentingDisplay) {
        renderer.vr.enabled = true;
        renderer.vr.setDevice(presentingDisplay);
      }
    })
    .catch(err => {
      console.warn(err);
    });
}

const animate = function () {
  requestAnimationFrame(animate);
  sun.rotation.y += 0.0002;
  mercuryPivot.rotation.y += 0.0001;
  mercury.rotation.y += 0.0002;
  earthPivot.rotation.y += 0.00005;
  earth.rotation.y += 0.0004;
  moonPivot.rotation.y += 0.003;
  moon.rotation.y += 0.0002;
  marsPivot.rotation.y += 0.0005;
  mars.rotation.y += 0.0002;
  jupiterPivot.rotation.y += 0.00002;
  jupiter.rotation.y += 0.0002;
  controls.update();

  renderer.render(scene, camera);
};

animate();

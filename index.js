// Planets are 1:1000
// Distances are 1:100,000

let pause_spin_global = false;
let pause_orbit_global = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 150000);

const renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: 'high-performance'});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// VR support

if(navigator.getVRDisplays){
  console.log("VR displays detected");
  renderer.vr.enabled = true;
  renderer.vr.userHeight = 0;
}
else console.log("No VR displays detected");

// Resize window size on re-size

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// dat GUI

window.onload = function() {

  const FizzyText = function() {
    this.music = true;
    this.pause_orbit = false;
    this.pause_spin = false;
  };

  const gui = new dat.GUI();

  const text = new FizzyText();

  const musicController = gui.add(text, 'music', true);
  const pause_orbitController = gui.add(text, 'pause_orbit', false);
  const pause_spinController = gui.add(text, 'pause_spin', false);

  musicController.onChange(function(value) {
    if(value){
      backgroundMusic.play();
    }
    else{
      backgroundMusic.pause();
    }
  });

  pause_orbitController.onChange(function(value) {
    if(value){
      pause_orbit_global = true;
    }
    else{
      pause_orbit_global = false;
    }
  });

  pause_spinController.onChange(function(value) {
    if(value){
      pause_spin_global = true;
    }
    else{
      pause_spin_global = false;
    }
  });

};

// Music

// instantiate a listener
const audioListener = new THREE.AudioListener();

// add the listener to the camera
camera.add(audioListener);

// instantiate audio object
const backgroundMusic = new THREE.Audio(audioListener);

// add the audio object to the scene
scene.add(backgroundMusic);

// instantiate a loader
const loader = new THREE.AudioLoader();

// load a resource
loader.load(
  // resource URL
  'ＮＯＳＴＡＬＧＩＣ.mp3',

  // onLoad callback
  function ( audioBuffer ) {
    // set the audio object buffer to the loaded object
    backgroundMusic.setBuffer( audioBuffer );

    // play the audio
    backgroundMusic.play();
  },

  // onProgress callback
  function ( xhr ) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  },

  // onError callback
  function ( err ) {
    console.log( 'An error happened' );
    console(err.stack)
  }
);

// create starbox

const imagePrefix = "images/2kstars/";
const directions  = ["GalaxyTex_PositiveX", "GalaxyTex_NegativeX", "GalaxyTex_PositiveY",
  "GalaxyTex_NegativeY", "GalaxyTex_PositiveZ", "GalaxyTex_NegativeZ"];
const imageSuffix = ".png";

let materialArray = [];
for (let i = 0; i < 6; i++)
  materialArray.push( new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
    side: THREE.FrontSide
  }));
const starMaterial = new THREE.MeshFaceMaterial( materialArray );
const starGeometry = new THREE.CubeGeometry(100000, 100000, -100000);
const starbox = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starbox);

starbox.rotation.x = THREE.Math.degToRad(63);

starbox.position.set(
  camera.position.x,
  camera.position.y,
  camera.position.z
);

// create center point that isnt tied to the sun, because orbit mechanics

const centerMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );
const centerGeometry = new THREE.SphereGeometry(1, 1, 1);
const center = new THREE.Mesh(centerGeometry, centerMaterial);
scene.add(center);
center.position.set(0,0,0);


// Create Sun

const sunTexture = new THREE.TextureLoader().load( './images/sunbumpmap.jpg' );
const sunMaterial = new THREE.MeshBasicMaterial( { map: sunTexture } );

const sunGeometry = new THREE.SphereGeometry(695, 100, 100);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add pointlight to sun

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// create mercury

const mercuryTexture = new THREE.TextureLoader().load( './images/mercurybumpmap.jpg' );
const mercuryMaterial = new THREE.MeshBasicMaterial( { map: mercuryTexture } );

const mercuryGeometry = new THREE.SphereGeometry(1, 100, 100);
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);
mercury.position.x = 927;

// Orbit mercury around the sun
const mercuryPivot = new THREE.Object3D();
center.add(mercuryPivot);
mercuryPivot.add(mercury);

// Create Earth

const earthTexture = new THREE.TextureLoader().load( './images/earthbumpmap.jpg' );
const earthMaterial = new THREE.MeshBasicMaterial( { map: earthTexture } );

const earthGeometry = new THREE.SphereGeometry(12.7, 100, 100);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 1496;

// Orbit Earth around the sun

const earthPivot = new THREE.Object3D();
center.add(earthPivot);
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
center.add(marsPivot);
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
center.add(jupiterPivot);
jupiterPivot.add(jupiter);


// Camera controls

const controls = new THREE.OrbitControls( camera );
controls.minDistance = 1000;
controls.maxDistance = 50000;
controls.update();
camera.position.set(0,1000,5000);

const spinPlanets = function () {
  sun.rotation.y += 0.0001;
  mercury.rotation.y += 0.0002;
  earth.rotation.y += 0.0004;
  moon.rotation.y += 0.0002;
  mars.rotation.y += 0.0002;
  jupiter.rotation.y += 0.0002;
};

const orbitPlanets = function () {
  mercuryPivot.rotation.y += 0.0001;
  earthPivot.rotation.y += 0.00008;
  moonPivot.rotation.y += 0.003;
  marsPivot.rotation.y += 0.0002;
  jupiterPivot.rotation.y += 0.00002;
};

const animate = function () {
  if(!pause_orbit_global){
    orbitPlanets();
  }
  if(!pause_spin_global){
    spinPlanets();
  }
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// Resize window size on re-size

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Create skybox cube

const starTexture = new THREE.TextureLoader().load( 'stars2.jpg' );
const starMaterial = new THREE.MeshBasicMaterial( { map: starTexture } );

const skyGeometry = new THREE.BoxGeometry(10000, 10000, -10000);

const skybox = new THREE.Mesh(skyGeometry, starMaterial);
scene.add(skybox);

// Create Sun

const sunTexture = new THREE.TextureLoader().load( 'sunbumpmap.jpg' );
const sunMaterial = new THREE.MeshBasicMaterial( { map: sunTexture } );

const sunGeometry = new THREE.SphereGeometry(6, 100, 100);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add pointlight to sun
const sunLight = new THREE.PointLight('#ffb013', 100, 1000);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// create mercury

const mercuryGeometry = new THREE.SphereGeometry(1, 100, 100);
const mercuryMaterial = new THREE.MeshBasicMaterial({color: '#B26919'});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);
mercury.position.x = 20;

// Orbit mercury around the sun
const mercuryPivot = new THREE.Object3D();
sun.add(mercuryPivot);
mercuryPivot.add(mercury);



// Create Earth

const earthTexture = new THREE.TextureLoader().load( 'earthbumpmap.jpg' );
const earthMaterial = new THREE.MeshBasicMaterial( { map: earthTexture } );

const earthGeometry = new THREE.SphereGeometry(12, 100, 100);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(sunLight);
earth.position.x = 14;

// Orbit Earth around the sun
const earthPivot = new THREE.Object3D();
sun.add(earthPivot);
earthPivot.add(earth);

// Create the Moon

const moonTexture = new THREE.TextureLoader().load( 'moonbumpmap.jpg' );
const moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );

const moonGeometry = new THREE.SphereGeometry(3.5, 100, 100);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.position.x = 15.5;

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

// const controls = new THREE.OrbitControls( camera );
// controls.update();
// camera.position.set(0,1000,5000);

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
  sun.position.set( 0, 5, 0 );
  earthPivot.rotation.y += 0.00005;
  moonPivot.rotation.y += 0.003;
  jupiterPivot.rotation.y += 0.002;
  // controls.update();

  renderer.render(scene, camera);
};

animate();

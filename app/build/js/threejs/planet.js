import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  Mesh,
  Group,
  SphereGeometry,
  ShaderMaterial,
  AdditiveBlending,
  BackSide,
} from 'three';
import gsap from 'gsap';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

import moonTexture from '../../images/destination/2k_moon.jpg';
import marsTexture from '../../images/destination/2k_mars.jpg';
import europaTexture from '../../images/destination/4k_europa.jpg';
import titanTexture from '../../images/destination/4k_titan.jpg';

const modelContainer = document.querySelector('.main-container--planet-model');

//create canvas and append to container
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
const renderer = new WebGLRenderer({
  alpha: true,
  antialias: true,
});
if (modelContainer != null) {
  renderer.setPixelRatio(window.devicePixelRatio);
  modelContainer.appendChild(renderer.domElement);
  renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
  camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
  camera.updateProjectionMatrix();
}

//create a sphere
const changeTexture = (txt) => new TextureLoader().load(txt);

const sphere = new Mesh(
  new SphereGeometry(8, 50, 50),
  new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      planetTexture: {
        value: changeTexture(moonTexture),
      },
    },
  })
);

//create "atmosphere" glow
const atmosphere = new Mesh(
  new SphereGeometry(8, 50, 50),
  new ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: AdditiveBlending,
    side: BackSide,
  })
);
atmosphere.scale.set(1.2, 1.2, 1.2);
scene.add(atmosphere);

const group = new Group();
group.add(sphere);
scene.add(group);
camera.position.z = 17;

//animate mouse movement
const mouse = {
  x: undefined,
  y: undefined,
};
document.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerWidth) * 2 + 1;
});

createPlanet = () => {
  requestAnimationFrame(createPlanet);
  renderer.render(scene, camera);
  sphere.rotation.y += 0.002;
  gsap.to(group.rotation, {
    x: -mouse.y * 0.5,
    y: mouse.x * 0.5,
    duration: 2,
  });
};

export const createMoon = () => {
  sphere.material.uniforms.planetTexture.value = changeTexture(moonTexture);
  createPlanet();
};
export const createMars = () => {
  sphere.material.uniforms.planetTexture.value = changeTexture(marsTexture);
  createPlanet();
};
export const createEuropa = () => {
  sphere.material.uniforms.planetTexture.value = changeTexture(europaTexture);
  createPlanet();
};
export const createTitan = () => {
  sphere.material.uniforms.planetTexture.value = changeTexture(titanTexture);
  createPlanet();
};

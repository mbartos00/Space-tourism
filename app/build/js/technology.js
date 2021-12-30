import data from './data/data.json';

import gsap from 'gsap';

import launchVehicleLandscape from '../images/technology/launch-vehicle-landscape.jpg';
import launchVehiclePortrait from '../images/technology/launch-vehicle-portrait.jpg';
import spaceCapsuleLandscape from '../images/technology/space-capsule-landscape.jpg';
import spaceCapsulePortrait from '../images/technology/space-capsule-portrait.jpg';
import spaceportLandscape from '../images/technology/spaceport-landscape.jpg';
import spaceportPortrait from '../images/technology/spaceport-portrait.jpg';

const portraitImages = [
  launchVehiclePortrait,
  spaceCapsulePortrait,
  spaceportPortrait,
];
const landscapeImages = [
  launchVehicleLandscape,
  spaceCapsuleLandscape,
  spaceportLandscape,
];

const technologyBtns = document.querySelectorAll(
  '.main-container--about-technologyBtns--btn'
);

const changeTechnology = () => {
  [...technologyBtns].map((btn, index) =>
    btn.addEventListener('click', (e) => {
      animatePage();
      setInfo(index);
      toggleActive(e);
    })
  );
};

const toggleActive = (e) => {
  [...technologyBtns].map((btn) => btn.classList.remove('active'));
  e.target.classList.add('active');
};

const { technology } = data;

const setInfo = (index) => {
  const title = document.querySelector('.main-container--about-content--title');
  const content = document.querySelector(
    '.main-container--about-content--paragraph'
  );
  const image = document.querySelector('.image');
  //append data
  technology.map((item) => {
    const { name, description, id } = item;

    if (index + 1 == id) {
      image.src = isImagePortrait()
        ? landscapeImages[index]
        : portraitImages[index];
      image.setAttribute('alt', `${name} image`);
      title.innerText = name.toUpperCase();
      content.innerText = description;
    }
  });
};

const isImagePortrait = () => {
  !window.matchMedia('screen and (min-width:1440px').matches;
};

const animatePage = () => {
  gsap
    .timeline()
    .from('.main-container--about-content', {
      opacity: 0,
      yPercent: 100,
      delay: 0.2,
      duration: 1,
    })
    .from('.main-container--technology-image', {
      opacity: 0,
      yPercent: 100,
      duration: 1,
    })
    .to('.main-container--about-content', { opacity: 1, yPercent: 0 })
    .to('.main-container--technology-image', { opacity: 1, yPercent: 0 });
};

export default changeTechnology;

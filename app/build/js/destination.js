import gsap from 'gsap';
import data from './data/data.json';
import {
  createMars,
  createMoon,
  createEuropa,
  createTitan,
} from './threejs/planet';

const locationBtns = document.querySelectorAll(
  '.main-container--description-btns--btn'
);

const changePlanet = () => {
  [...locationBtns].map((btn) =>
    btn.addEventListener('click', (e) => {
      toggleActive(e);
      setInfo(e);
      animatePlanet();
      animateContent();
    })
  );
};

//toggle active class on buttons
const toggleActive = (e) => {
  [...locationBtns].map((btn) => btn.classList.remove('active'));
  e.target.classList.add('active');
};

//set information about planet

const setInfo = (e) => {
  const title = document.querySelector(
    '.main-container--description-text--title'
  );
  const paragraph = document.querySelector(
    '.main-container--description-text--paragraph'
  );
  const descriptionDistance = document.querySelector(
    '.main-container--description-info--distance'
  );
  const descriptionTime = document.querySelector(
    '.main-container--description-info--time'
  );

  const btnName = e.target.innerText;

  const capitalizedBtn =
    btnName[0].toUpperCase() + btnName.toLowerCase().substring(1);

  const { destinations } = data;

  destinations.map((planet) => {
    const { name, description, distance, travel } = planet;

    if (capitalizedBtn == name) {
      document.title = name;
      title.innerText = name.toUpperCase();
      paragraph.innerText = description;
      descriptionDistance.innerText = distance.toUpperCase();
      descriptionTime.innerText = travel.toUpperCase();

      name == 'Mars'
        ? createMars()
        : name == 'Europa'
        ? createEuropa()
        : name == 'Titan'
        ? createTitan()
        : createMoon();
    }
  });
};

//animate on planet change
const animatePlanet = () => {
  const canvas = document.querySelector('canvas');
  gsap
    .timeline()
    .from(canvas, {
      scale: 0,
      xPercent: -60,
      yPercent: 20,
      duration: 1.2,
      delay: 0.1,
    })
    .to(canvas, { scale: 1, xPercent: 0, yPercent: 0 });
};

//animate content on change
const animateContent = () => {
  gsap
    .timeline()
    .from('.main-container--description-text--title', {
      opacity: 0,
      yPercent: -80,
      duration: 0.2,
      delay: 0.2,
    })
    .from('.main-container--description-text--paragraph', {
      opacity: 0,
      yPercent: -80,
      duration: 0.2,
      delay: 0.3,
    })
    .from('.main-container--description-info', {
      opacity: 0,
      yPercent: -80,
      delay: 0.4,
    })

    .to('.main-container--description-text--title', {
      opacity: 1,
      yPercent: 0,
    })
    .to('.main-container--description-text--paragraph', {
      opacity: 1,
      yPercent: 0,
    })
    .to('.main-container--description-info', {
      opacity: 1,
      yPercent: 0,
    });
};
export default changePlanet;

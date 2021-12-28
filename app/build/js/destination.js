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
  createMoon();

  [...locationBtns].map((btn) =>
    btn.addEventListener('click', (e) => {
      toggleActive(e);
      setInfo(e);
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

export default changePlanet;

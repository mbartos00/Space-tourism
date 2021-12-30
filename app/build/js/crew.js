import data from './data/data.json';
import douglas from '../images/crew/image-douglas-hurley.webp';
import mark from '../images/crew/image-mark-shuttleworth.webp';
import anousheh from '../images/crew/image-anousheh-ansari.webp';
import victor from '../images/crew/image-victor-glover.webp';

import gsap from 'gsap';

const radioBtns = document.querySelectorAll('.main-container--about-btns--btn');

const changeCrew = () => {
  [...radioBtns].map((btn, index) =>
    btn.addEventListener('click', (e) => {
      animateCrew();

      toggleActive(e);
      setInfo(index);
    })
  );
};

const toggleActive = (e) => {
  [...radioBtns].map((btn) => btn.classList.remove('active'));
  e.target.classList.add('active');
};

const setInfo = (index) => {
  const crewImage = document.querySelector('.image');
  const crewRole = document.querySelector('.js-crewRole');
  const crewMember = document.querySelector(
    '.main-container--about-content--title'
  );
  const crewBio = document.querySelector(
    '.main-container--about-content--paragraph'
  );

  const { crew } = data;

  const crewImages = [douglas, mark, anousheh, victor];

  //append data
  crew.map((member) => {
    const { name, role, bio, id } = member;

    if (index + 1 == id) {
      crewImage.src = crewImages[index];
      crewImage.setAttribute('alt', `${role} image`);
      crewRole.innerText = role.toUpperCase();
      crewMember.innerText = name.toUpperCase();
      crewBio.innerText = bio;
    }
  });
};

//animate on change crew member
const animateCrew = () => {
  gsap
    .timeline()
    .from('.main-container--crew-image', {
      opacity: 0,
      duration: 1,
    })
    .from('.main-container--about-content', {
      opacity: 0,
      duration: 1,
      delay: 0.5,
    })
    .to('.main-container--crew-image', { opacity: 1, duration: 0.5 })
    .to('.main-container--about-content', { opacity: 1, duration: 0.2 });
};
export default changeCrew;

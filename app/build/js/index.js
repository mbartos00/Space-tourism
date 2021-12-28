import gsap from 'gsap';
import changePlanet from './destination';

//nav animation
let hamburger = document.querySelector('.main-header--burger');
let hamburgerBtn = document.querySelector('.main-header--burger-btn');
if (matchMedia('screen and (min-width: 768px)').matches) {
  gsap.set('.main-header--nav', { xPercent: 0, x: 0 });
} else {
  gsap.set('.main-header--nav', { xPercent: 150, x: 0 });
}

let hamburgerMotion = gsap
  .timeline()
  .to('.main-header--nav', { xPercent: 0, x: 0 })
  .reverse();

hamburger.addEventListener('click', () => {
  if (hamburgerBtn.className.includes('active'))
    hamburgerBtn.classList.remove('active');
  else hamburgerBtn.classList.add('active');
  hamburgerMotion.reversed(!hamburgerMotion.reversed());
});

//planet model
changePlanet();

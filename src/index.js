import 'babel-polyfill'

import ThreeWrapper from './Three'

import { setStylesOnElement } from './utils/dom'

// ------ GLOBALS --------
let threeWrapper

const KONAMI_KEYS = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let KONAMI_INDEX = 0;

// --- HTML ELEMENTS -----

// ------ THREEJS --------
const MAX_FPS = 60
const FPS_INTERVAL = 1000 / MAX_FPS

let lastDate = Date.now()
let dt = 0
let now = 0

// ------- EVENTS --------
window.addEventListener('keydown', (e) => { onKeyDown(e) }, false);

// ------ FUNCTIONS ------
function animate() {
  requestAnimationFrame(animate)

  now = Date.now()
  dt = now - lastDate

  if (dt > FPS_INTERVAL) {
    lastDate = now - (dt % FPS_INTERVAL)

    threeWrapper.update(dt)
  }
}

// --- EVENT FUNCTIONS ---
function onKeyDown(e) {
  if (e.keyCode === KONAMI_KEYS[KONAMI_INDEX]) {
    KONAMI_INDEX += 1

    if (KONAMI_INDEX === KONAMI_KEYS.length) {
      const gif = document.createElement('img')
      gif.src = 'https://media.giphy.com/media/l4Ki2obCyAQS5WhFe/giphy.gif'
      setStylesOnElement(gif, {
        position: 'absolute',
        bottom: 0,
        left: 0,
      })
      document.body.appendChild(gif)
      KONAMI_INDEX = 0;

      return false;
    }
  } else {
    KONAMI_INDEX = 0;
  }

  return false
}

// -------- MAIN ---------
threeWrapper = new ThreeWrapper()

animate()

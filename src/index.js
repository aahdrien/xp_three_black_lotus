import 'babel-polyfill'

import ThreeWrapper from './Three'

// ------ GLOBALS --------
let threeWrapper

// --- HTML ELEMENTS -----

// ------ THREEJS --------
const MAX_FPS = 60
const FPS_INTERVAL = 1000 / MAX_FPS

let lastDate = Date.now()
let dt = 0
let now = 0

// ------- EVENTS --------

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

// -------- MAIN ---------
threeWrapper = new ThreeWrapper()

animate()

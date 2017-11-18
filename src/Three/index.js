import Scene from './components/Scene'

import VoronoiSphere from './components/VoronoiSphere'

// COMPONENTS

/* THREE global class */
export default class ThreeWrapper {
  constructor(audioPlayer) {
    this.audioPlayer = audioPlayer

    // INIT
    this.sceneWrapper = new Scene(
      window.innerWidth,
      window.innerHeight,
      window.devicePixelRatio ? window.devicePixelRatio : 1,
    )

    // ELEMENTS
    this.elements = []

    this.addElement(new VoronoiSphere())
  }

  addElement(element) {
    this.elements.push(element)
    this.sceneWrapper.add(element.getThreeObject())
  }

  update(dt) {
    this.elements.forEach((element) => { element.update(dt) })
    this.sceneWrapper.render()
  }
}

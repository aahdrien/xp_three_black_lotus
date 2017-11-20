import dat from 'dat-gui';

import Scene from './components/Scene'

import BackgroundSphere from './components/BackgroundSphere'
import VoronoiSphere from './components/VoronoiSphere'

// COMPONENTS

/* THREE global class */
export default class ThreeWrapper {
  constructor() {
    // INIT
    this.sceneWrapper = new Scene(
      window.innerWidth,
      window.innerHeight,
      window.devicePixelRatio ? window.devicePixelRatio : 1,
    )

    // ELEMENTS
    this.backgroundSphere = new BackgroundSphere()
    this.icoDetails = 6
    this.flatShading = true
    this.voronoiSphere = new VoronoiSphere(this.icoDetails, this.flatShading)

    this.addElement(this.backgroundSphere)
    this.addElement(this.voronoiSphere)

    this.initGUI()
  }

  initGUI() {
    this.datGUI = new dat.GUI();
    const buildFolder = this.datGUI.addFolder('BUILD')
    buildFolder.add(this, 'icoDetails', 1, 8).step(1)
    buildFolder.add(this, 'flatShading')
    buildFolder.add(this, 'rebuild')
    buildFolder.open()

    const liveFolder = this.datGUI.addFolder('LIVE')

    const liveFolderSphere = liveFolder.addFolder('SPHERE')
    liveFolderSphere.add(this.voronoiSphere, 'resolution', 1, 20).step(1)
    liveFolderSphere.add(this.voronoiSphere, 'amplitude', 0, 40).step(0.5)
    liveFolderSphere.add(this.voronoiSphere, 'shininess', 1, 100).step(1)
    liveFolderSphere.addColor(this.sceneWrapper, 'frontLightColor')
    liveFolderSphere.addColor(this.sceneWrapper, 'sideLightColor')
    liveFolderSphere.addColor(this.sceneWrapper, 'backLightColor')
    liveFolderSphere.open()

    const liveFolderBg = liveFolder.addFolder('BACKGROUND')
    liveFolderBg.add(this.backgroundSphere, 'backgroundNoise')
    liveFolderBg.addColor(this.backgroundSphere, 'backgroundColor')
    liveFolderBg.open()

    liveFolder.open()
  }

  rebuild() {
    this.datGUI.destroy()

    this.sceneWrapper.remove(this.voronoiSphere.getThreeObject())
    this.voronoiSphere = new VoronoiSphere(this.icoDetails, this.flatShading)
    this.addElement(this.voronoiSphere)

    this.initGUI()
  }

  addElement(element) {
    this.sceneWrapper.add(element.getThreeObject())
  }

  update(dt) {
    this.backgroundSphere.update(dt)
    this.voronoiSphere.update(dt)
    this.sceneWrapper.render()
  }
}

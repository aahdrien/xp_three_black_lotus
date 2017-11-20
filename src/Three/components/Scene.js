import * as THREE from 'three'

const OrbitControls = require('three-orbit-controls')(THREE)

/**
 * Class for the global Scene.
 */
export default class Scene {
  constructor(width, height, devicePixelRatio) {
    this.backgroundColor = 0x030303
    this.frontLightColor = 0xca3aff
    this.sideLightColor = 0x39fff5
    this.backLightColor = 0xca3aff

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(this.backgroundColor, 1)
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(devicePixelRatio)

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000)
    this.camera.position.set(0, 0, 60)
    this.activeCamera = this.camera

    this.camera.lookAt(new THREE.Vector3())
    this.controls = new OrbitControls(this.camera)

    // LIGHTS
    this.frontLight = new THREE.DirectionalLight(this.frontLightColor, 0.8)
    this.frontLight.position.set(2, 2, 5).normalize()

    this.sideLight = new THREE.DirectionalLight(this.sideLightColor, 0.7)
    this.sideLight.position.set(0, -8, -4).normalize()

    this.secondSideLight = new THREE.DirectionalLight(this.sideLightColor, 0.7)
    this.secondSideLight.position.set(0, 8, -4).normalize()

    this.backLight = new THREE.DirectionalLight(this.backLightColor, 0.8)
    this.backLight.position.set(-2, -2, -10).normalize()

    this.scene.add(this.frontLight)
    this.scene.add(this.sideLight)
    this.scene.add(this.secondSideLight)
    this.scene.add(this.backLight)

    document.getElementById('three-container').appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => { this.onWindowResize() }, false)
  }

  add(element) {
    this.scene.add(element)
  }

  remove(element) {
    this.scene.remove(element)
  }

  // EVENTS
  onWindowResize() {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    this.camera.aspect = screenWidth / screenHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(screenWidth, screenHeight)
  }

  render() {
    this.renderer.setClearColor(this.backgroundColor, 1)

    this.frontLight.color.setHex(this.frontLightColor)
    this.sideLight.color.setHex(this.sideLightColor)
    this.secondSideLight.color.setHex(this.sideLightColor)
    this.backLight.color.setHex(this.backLightColor)

    this.renderer.render(this.scene, this.activeCamera)
  }
}

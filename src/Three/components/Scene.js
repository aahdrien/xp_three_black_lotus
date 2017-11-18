import * as THREE from 'three'

/**
 * Class for the global Scene.
 */
export default class Scene {
  constructor(width, height, devicePixelRatio) {
    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0x111111, 1)
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(devicePixelRatio)

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000)
    this.camera.position.set(0, 0, 25)
    this.activeCamera = this.camera

    // LIGHTS
    this.mainLight = new THREE.DirectionalLight(0xca3aff, 0.8)
    this.mainLight.position.set(2, 2, 5).normalize()

    this.coldLight = new THREE.DirectionalLight(0x39fff5, 0.7)
    this.coldLight.position.set(0, -10, -5).normalize()

    this.secondColdLight = new THREE.DirectionalLight(0x39fff5, 0.7)
    this.secondColdLight.position.set(0, 10, -5).normalize()

    this.scene.add(this.mainLight)
    this.scene.add(this.coldLight)
    this.scene.add(this.secondColdLight)

    document.getElementById('three-container').appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => {
      this.onWindowResize()
    }, false)
  }

  // GETTERS AND SETTERS
  getCamera() {
    return this.camera
  }

  getRenderer() {
    return this.renderer
  }

  add(element) {
    this.scene.add(element)
  }

  render() {
    this.renderer.render(this.scene, this.activeCamera)
  }

  // EVENTS
  onWindowResize() {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    this.camera.aspect = screenWidth / screenHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(screenWidth, screenHeight)
  }
}
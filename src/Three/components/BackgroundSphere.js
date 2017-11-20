import * as THREE from 'three'

import fragShader from '../shaders/backgroundSphere.frag'
import vertShader from '../shaders/backgroundSphere.vert'

/**
 * Class for the the THREE.js BackgroundSphere.
 */
export default class BackgroundSphere {
  constructor() {
    this.name = 'ThunderSphere'

    this.backgroundColor = [17, 9, 28]
    this.backgroundNoise = true

    this.sphereGeometry = new THREE.SphereGeometry(30, 35, 25)

    this.uniforms = {
      u_resolution: { type: 'vec2', value: new THREE.Vector2(10, 10) },
      u_amplitude: { type: '1f', value: 10 },
      u_is_noise: { type: 'bool', value: this.backgroundNois },
      u_color: { type: 'vec3', value: new THREE.Vector3(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]) },
      u_time: { type: '1f', value: 0 },
    }

    this.sphereMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      side: THREE.BackSide,
      transparent: true,
      wireframe: false,
      flatShading: true,
    })

    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
  }

  update(dt) {
    this.uniforms.u_is_noise.value = this.backgroundNoise
    this.uniforms.u_color.value = new THREE.Vector3(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2])
    this.uniforms.u_time.value += dt / 3000
  }

  getThreeObject() {
    return this.sphere
  }
}

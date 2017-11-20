import * as THREE from 'three'

import fragShader from '../shaders/voronoiSphere.frag'
import vertShader from '../shaders/voronoiSphere.vert'

/**
 * Class for the the THREE.js VoronoiSphere.
 */
export default class VoronoiSphere {
  constructor(icoDetails = 6, flatShading = true) {
    this.name = 'VoronoiSphere'
    this.resolution = 5
    this.amplitude = 5
    this.shininess = 100
    this.flatShading = true
    this.speed = 1000

    this.children = []
    this.attributes = []

    const phongShader = THREE.ShaderLib.phong;
    this.sphereGeometry = new THREE.IcosahedronGeometry(10, icoDetails)

    this.uniforms = THREE.UniformsUtils.merge([
      phongShader.uniforms,
      {
        u_resolution: { type: 'vec2', value: new THREE.Vector2(this.resolution, this.resolution) },
        u_amplitude: { type: '1f', value: this.amplitude },
        u_time: { type: '1f', value: 0 },
        shininess: { type: '1f', value: this.shininess },
      },
    ]);

    this.sphereMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      side: THREE.FrontSide,
      lights: true,
      wireframe: false,
      flatShading,
    })

    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
  }

  update(dt) {
    this.uniforms.u_resolution.value = new THREE.Vector2(this.resolution, this.resolution)
    this.uniforms.u_amplitude.value = this.amplitude
    this.uniforms.shininess.value = this.shininess

    this.uniforms.u_time.value += this.speed !== 0 ? dt / (2001 - this.speed) : 0
  }

  getThreeObject() {
    return this.sphere
  }
}

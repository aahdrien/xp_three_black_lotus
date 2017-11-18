import * as THREE from 'three'

import fragShader from '../shaders/thunderSphere.frag'
import vertShader from '../shaders/thunderSphere.vert'

/**
 * Class for the the THREE.js ThunderSphere.
 */
export default class VoronoiSphere {
  constructor() {
    this.name = 'ThunderSphere'
    this.children = []
    this.attributes = []

    const phongShader = THREE.ShaderLib.phong;
    // this.sphereGeometry = new THREE.SphereGeometry(10, 80, 50)
    this.sphereGeometry = new THREE.IcosahedronGeometry(10, 5)

    this.uniforms = THREE.UniformsUtils.merge([
      phongShader.uniforms,
      {
        u_resolution: { type: 'vec2', value: new THREE.Vector2(5, 5) },
        u_amplitude: { type: '1f', value: 5 },
        u_time: { type: '1f', value: 0 },
        shininess: { type: '1f', value: 100 },
      },
    ]);

    this.sphereMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      side: THREE.FrontSide,
      lights: true,
      wireframe: false,
      flatShading: true,
    })

    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
  }

  update(dt) {
    this.uniforms.u_time.value += dt / 1000
  }

  getThreeObject() {
    return this.sphere
  }
}

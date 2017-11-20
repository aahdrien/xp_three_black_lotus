precision mediump float;

// CUSTOM
uniform bool u_is_noise;
uniform vec3 u_color;

varying vec3 v_voronoi;

void main() {
    if (u_is_noise) {
        gl_FragColor = vec4(u_color.r / 255., u_color.g / 255., u_color.b / 255., v_voronoi.x);
    } else {
        gl_FragColor = vec4(u_color.r / 255., u_color.g / 255., u_color.b / 255., 1.);
    }
}
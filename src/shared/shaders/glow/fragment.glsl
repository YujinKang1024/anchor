uniform vec3 glowColor;
uniform float glowIntensity;
varying float intensity;

void main() {
  vec3 glow = glowColor * intensity * glowIntensity * 1.5;
  gl_FragColor = vec4(glow, 1.0);
}

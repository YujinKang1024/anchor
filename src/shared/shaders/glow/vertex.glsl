uniform vec3 viewVector;
varying float intensity;

void main() {
  vec3 vNormal = normalize(normalMatrix * normal);
  vec3 vNormel = normalize(normalMatrix * viewVector);
  intensity = pow(0.9 - dot(vNormal, vNormel), 3.0);

  vec3 expandedPosition = position + normal * 0.25;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(expandedPosition, 1.0);
}

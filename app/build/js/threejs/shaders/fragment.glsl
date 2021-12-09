uniform sampler2D planetTexture;
varying vec2 vertexUv;
varying vec3 vertexNormal;

void main() {
  float intensity = 1.05 - dot(vertexNormal, vec3(0.0,0.0,1.0));
  vec3 atmosphere = vec3(0.7,0.6,0.8) * pow(intensity, 1.5);
  gl_FragColor = vec4(atmosphere + texture2D(planetTexture, vertexUv).xyz, 1.0);
}
uniform vec3 u_yellow;
uniform float u_size;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  
  gl_FragColor = vec4(vec3(0.), 1.0);

float aspect = 1.;

if(u_size >= 0.4){
  aspect = 0.4/u_size;
}else{
  aspect = u_size/0.4;
}
float thickness = 0.06;

if(vUv.x >0. && vUv.x<thickness || vUv.x<1. && vUv.x>1.-thickness){
  gl_FragColor.rgb = u_yellow;
}

if(vUv.y >0. && vUv.y<thickness*aspect || vUv.y<1. && vUv.y>1.-thickness*aspect){
  gl_FragColor.rgb = u_yellow;
}
}
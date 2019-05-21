varying vec3 vPosition;
varying vec2 vUv;

void main() {
  
  gl_FragColor = vec4(vec3(0.), 0.);


  float thickness = 0.01;

  if(vUv.x >0. && vUv.x<thickness || vUv.x<1. && vUv.x>1.-thickness){
    gl_FragColor.a = 1.0;
  }

  if(vUv.y >0. && vUv.y<thickness*2./3. || vUv.y<1. && vUv.y>1.-thickness*2./3.){
    gl_FragColor.a = 1.0;
  }
  }
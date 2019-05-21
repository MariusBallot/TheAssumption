import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import Emitter from './emitter'
import frag from '../shaders/emitter.frag'
import vert from '../shaders/emitter.vert'
import ParticleSystem from './particles'

class ThreeScene {

    constructor() {
        this.camera
        this.scene
        this.renderer
        this.cube
        this.controls
        this.uniforms
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.emitter
        this.particles;
        this.bind()
        this.init();
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xFFE501)

        this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.1, 1000)
        this.camera.position.set(0, 5, 10)
        this.camera.lookAt(this.scene.position)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true;
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 0;

        this.uniforms = {
            colorB: {
                type: 'vec3',
                value: new THREE.Color(0xACB6E5)
            },
            colorA: {
                type: 'vec3',
                value: new THREE.Color(0x74ebd5)
            }
        }

        this.cube = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 2), new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            side: THREE.BackSide,
            transparent: true
        }))
        this.scene.add(this.cube)

        this.emitter = new Emitter()
        this.cube.add(this.emitter.plane)

        for (let i = 0; i < this.emitter.floaters.length; i++) {
            this.cube.add(this.emitter.floaters[i].cube);
        }

        this.particles = new ParticleSystem(1000, 10)
        this.scene.add(this.particles.particleSystem)
    }

    update() {
        this.renderer.render(this.scene, this.camera)
        for (let i = 0; i < this.emitter.floaters.length; i++) {
            this.emitter.floaters[i].update()
        }
        this.cube.rotateY(0.01)
        this.particles.translateParticles(0, 0.01, 0)
    }



    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix();
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        window.addEventListener('resize', this.resizeCanvas)

    }
}

export {
    ThreeScene as
    default
}
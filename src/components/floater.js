import * as THREE from 'three'
import frag from '../shaders/cube.frag'
import vert from '../shaders/cube.vert'

import {
    TweenMax,
    Power2,
    TimelineLite,
    TweenLite
} from "gsap/TweenMax";

class Floater {

    constructor() {
        this.cube
        this.uniforms;
        this.size = Math.random() * 2
        this.pos = new THREE.Vector3(
            2 / 5 * Math.floor(Math.random() * 5) - 0.8,
            -1.5 - this.size / 2,
            2 / 5 * Math.floor(Math.random() * 5) - 0.8
        )
        this.flag = false
        this.init()
    }

    init() {
        this.uniforms = {
            u_yellow: {
                type: 'vec3',
                value: new THREE.Color(0xFFE501)
            },
            u_size: {
                type: 'f',
                value: this.size,
            }
        }
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(2 / 5, this.size, 2 / 5), new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: frag,
            vertexShader: vert,
        }))
        this.cube.position.set(this.pos.x, this.pos.y, this.pos.z)

        this.animateIn()
    }

    initializeValues() {
        this.size = Math.random() * 2
        this.pos = new THREE.Vector3(
            2 / 5 * Math.floor(Math.random() * 5) - 0.8,
            -1.5 - this.size / 2,
            2 / 5 * Math.floor(Math.random() * 5) - 0.8
        )

    }

    update() {
        this.cube.position.y += 0.01;
        if (this.cube.position.y >= 1.5 + this.size / 2 && !this.flag) {
            this.animateOut()
            this.flag = true
        }
    }

    animateIn() {
        TweenLite.fromTo(this.cube.scale, 0.5, {
            y: 0.0001,
        }, {
            y: 1
        })

    }

    animateOut() {
        TweenLite.fromTo(this.cube.scale, 0.5, {
            y: 1,
        }, {
            y: 0.00001,
            onComplete: () => {
                this.initializeValues
                this.cube.position.set(this.pos.x, this.pos.y, this.pos.z)
                this.animateIn()
                this.flag = false
            }
        })

    }


}

export {
    Floater as
    default
}
import * as THREE from 'three'
import Floater from './floater'

class Emitter {

    constructor() {
        this.plane
        this.count = 20
        this.floaters = []
        this.init()
    }

    init() {
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 5, 5), new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x000000
        }));
        this.plane.position.y = -1.5
        this.plane.rotateX(-Math.PI / 2)

        for (let i = 0; i < this.count; i++) {
            this.floaters[i] = new Floater()
        }
    }


}

export {
    Emitter as
    default
}
import * as THREE from 'three';
import partAsset from '../assets/particle.png'

class ParticleSystem {

    constructor(pCount_, boxSize_) {
        this.particleCount = pCount_;
        this.plarticles;
        this.particlMaterial;
        this.particleSystem;
        this.textureLoader
        this.boxSize = boxSize_;

        this.bind();
        this.init();
    }

    init() {
        this.particles = new THREE.Geometry();

        for (let p = 0; p < this.particleCount; p++) {

            let x = Math.random() * this.boxSize - this.boxSize / 2;
            let y = Math.random() * this.boxSize - this.boxSize / 2;
            let z = Math.random() * this.boxSize - this.boxSize / 2;

            // Create the vertex
            let particle = new THREE.Vector3(x, y, z);

            // Add the vertex to the geometry
            this.particles.vertices.push(particle);
        }

        this.textureLoader = new THREE.TextureLoader()
        let part = this.textureLoader.load(partAsset)

        this.particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            map: part,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });

        this.particleSystem = new THREE.Points(this.particles, this.particleMaterial);
    }

    translateParticles(x_, y_, z_) {
        for (let p = 0; p < this.particleCount; p++) {
            this.particleSystem.geometry.vertices[p].x += x_;
            this.particleSystem.geometry.vertices[p].y += y_;
            this.particleSystem.geometry.vertices[p].z += z_;
            if (this.particleSystem.geometry.vertices[p].y >= this.boxSize / 2) {
                this.particleSystem.geometry.vertices[p].y = -this.boxSize / 2
            }

        }

        this.particleSystem.geometry.verticesNeedUpdate = true;

    }

    bind() {
        this.init = this.init.bind(this)
        this.translateParticles = this.translateParticles.bind(this)
    }

}

export {
    ParticleSystem as
    default
}
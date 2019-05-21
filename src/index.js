import './sass/index.scss';
import ThreeScene from './components/threeScene'
import {
    TweenMax,
    Power2,
    TimelineLite
} from "gsap/TweenMax";

const threeScene = new ThreeScene();

TweenLite.ticker.addEventListener("tick", raf);

function raf() {
    threeScene.update();
}
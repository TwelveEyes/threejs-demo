import { Component } from "react";
import * as THREE from "three";

class App extends Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x222222);
    scene.add(light);

    const dLight = new THREE.DirectionalLight(0xffffff, 1);
    dLight.position.set(5, 5, 5);
    dLight.castShadow = true;
    scene.add(dLight);

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const texture = new THREE.TextureLoader().load("textures/earthmap1k.jpg");
    const bumpmap = new THREE.TextureLoader().load("textures/earthbump1k.jpg");
    const specmap = new THREE.TextureLoader().load("textures/earthspec1k.jpg");
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      bumpMap: bumpmap,
      bumpScale: 0.05,
      specularMap: specmap,
      specular: 0x808080,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const backgeo = new THREE.SphereGeometry(90, 32, 32);
    const backtex = new THREE.TextureLoader().load(
      "textures/galaxy_starfield.png"
    );
    const backmat = new THREE.MeshBasicMaterial({
      map: backtex,
      side: THREE.BackSide,
    });
    const backsphere = new THREE.Mesh(backgeo, backmat);
    scene.add(backsphere);

    camera.position.z = 1;

    const animate = function () {
      requestAnimationFrame(animate);

      sphere.rotation.y += 0.0025;

      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default App;

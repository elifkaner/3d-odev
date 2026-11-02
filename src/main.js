import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 1. SAHNE
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f172a'); // Koyu lacivert arka plan

// 2. KAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 4, 7);
scene.add(camera);

// 3. RENDERER (İŞLEYİCİ)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// 4. FARE KONTROLLERİ (OrbitControls)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 5. IŞIKLAR (Basit ve Hafif)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Genel ortam ışığı
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Üstten gelen beyaz ışık
directionalLight.position.set(5, 8, 5);
scene.add(directionalLight);

// 6. MATERYALLER
const coverMaterial = new THREE.MeshStandardMaterial({
  color: 0x1d4ed8, // Mavi kapak
  roughness: 0.3
});

const pagesMaterial = new THREE.MeshStandardMaterial({
  color: 0xf8fafc, // Beyaz sayfalar
  roughness: 0.8
});

const goldMaterial = new THREE.MeshStandardMaterial({
  color: 0xf59e0b, // Altın halka
  metalness: 0.8,
  roughness: 0.2
});

// 7. KİTAP MODELİ (THREE.Group)
const bookGroup = new THREE.Group();

// 7.1. Alt Kapak
const backCover = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.08, 4),
  coverMaterial
);
backCover.position.y = 0.04;
bookGroup.add(backCover);

// 7.2. İç Sayfalar
const pages = new THREE.Mesh(
  new THREE.BoxGeometry(2.8, 0.5, 3.8),
  pagesMaterial
);
pages.position.set(0.08, 0.33, 0);
bookGroup.add(pages);

// 7.3. Üst Kapak
const frontCover = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.08, 4),
  coverMaterial
);
frontCover.position.y = 0.62;
bookGroup.add(frontCover);

// 7.4. Kitap Sırtı (Sol tarafı düzgünce kapatan ince kenar)
const spine = new THREE.Mesh(
  new THREE.BoxGeometry(0.08, 0.66, 4),
  coverMaterial
);
spine.position.set(-1.46, 0.33, 0);
bookGroup.add(spine);

// 7.5. Kapak Üzerindeki Altın Halka (Süsleme)
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(0.6, 0.04, 16, 50),
  goldMaterial
);
ring.rotation.x = Math.PI / 2;
ring.position.set(0, 0.67, 0);
bookGroup.add(ring);

// Kitap grubunu sahneye ekle
scene.add(bookGroup);

// 8. PENCERE BOYUTU DEĞİŞİMİ (RESPONSIVE)
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 9. ANİMASYON DÖNGÜSÜ
function animate() {
  requestAnimationFrame(animate);

  // Kitabı kendi etrafında yavaşça döndür
  bookGroup.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate();

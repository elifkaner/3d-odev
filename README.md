# 3D Kitap Modeli — Three.js Ödevi

Bu proje, Three.js'in temel yapı taşları kullanılarak oluşturulmuş sade ve anlaşılır bir **3D Kitap Modeli** çalışmasıdır.

## 📌 Kullanılan Temel Özellikler
1. **Scene, Camera, Renderer:** Sahne kurulumu, perspektif kamera ve WebGLRenderer.
2. **OrbitControls:** Fare ile nesneyi 360° serbestçe inceleme ve yakınlaştırma.
3. **Işıklandırma:** `AmbientLight` (genel ortam ışığı) ve `DirectionalLight` (üstten gelen yönlü ışık).
4. **Temel Geometriler:**
   - `BoxGeometry`: Alt kapak, sayfalar, üst kapak ve kitap sırtı.
   - `TorusGeometry`: Üst kapaktaki altın süsleme halkası.
5. **Hiyerarşik Grup (`THREE.Group`):** Tüm kitap parçalarını tek bir gövdede toplayıp birlikte hareket ettirme.
6. **Animasyon Döngüsü:** Kitabın kendi ekseninde yavaşça dönmesi (`bookGroup.rotation.y += 0.005`).

## 🚀 Çalıştırma
```bash
npm install
npm run dev
```
Tarayıcınızda `http://localhost:5173/` adresinden projeyi görüntüleyebilirsiniz.

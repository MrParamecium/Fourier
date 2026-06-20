// Login Cosmos — Three.js particle scene for the login view background.
// Extracted from app.js in Phase 1 #10. Loaded as a classic <script>
// before app.js; the function becomes a global so the call site
// `loginScene = createLoginCosmos();` in openLoginView() is unchanged.
//
// Requires THREE.js to be loaded first (CDN, see index.html). When THREE
// is missing or the #loginWebglContainer DOM node is absent, returns null
// and the caller silently falls back to a static background.
//
// Returns { destroy } when successful — caller invokes destroy() on view
// teardown to free GPU memory and remove the resize / mousemove listeners.

function createLoginCosmos() {
  const container = document.getElementById('loginWebglContainer');
  if (!container || !window.THREE) return null;

  while (container.firstChild) container.removeChild(container.firstChild);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020617, 0.0015);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(0, 400, 400);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const particlesCount = 15000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  const sizes = new Float32Array(particlesCount);
  const colorPalette = [
    new THREE.Color(0x38BDF8),
    new THREE.Color(0x818CF8),
    new THREE.Color(0xFFFFFF),
    new THREE.Color(0x020617)
  ];

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const radius = Math.pow(Math.random(), 2) * 800;
    const angle = Math.random() * Math.PI * 2;
    const heightVariance = ((800 - radius) / 800) * 40;
    const y = (Math.random() - 0.5) * heightVariance;
    const spiralOffset = radius * 0.01;

    positions[i3] = Math.cos(angle + spiralOffset) * radius;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(angle + spiralOffset) * radius;

    let color;
    if (radius < 80) color = colorPalette[2];
    else if (radius < 300) color = Math.random() > 0.5 ? colorPalette[1] : colorPalette[2];
    else color = Math.random() > 0.3 ? colorPalette[0] : colorPalette[3];

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    sizes[i] = (1 - (radius / 800)) * 3 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      pixelRatio: { value: renderer.getPixelRatio() }
    },
    vertexShader: `
      uniform float time;
      uniform float pixelRatio;
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * pixelRatio * (800.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float glow = pow(1.0 - (dist * 2.0), 2.0);
        gl_FragColor = vec4(vColor, glow * 0.9);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  particles.rotation.x = Math.PI * 0.1;
  scene.add(particles);

  let frameId = 0;
  let mouseX = 0;
  let mouseY = 0;
  const clock = new THREE.Clock();

  const onMouseMove = (event) => {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
  };

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.pixelRatio.value = renderer.getPixelRatio();
  };

  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.time.value = elapsedTime;
    particles.rotation.y += 0.0015;
    camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.1 + 400 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  animate();

  return {
    destroy() {
      cancelAnimationFrame(frameId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    }
  };
}

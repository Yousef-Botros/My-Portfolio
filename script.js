const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.follower');
window.addEventListener('mousemove', e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.15 });
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starCount = 5000;
const posArray = new Float32Array(starCount * 3);
for(let i=0; i < starCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const starMat = new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.012 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: { trigger: section, start: "top 85%" },
        opacity: 0, y: 40, duration: 1.2, ease: "power2.out"
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
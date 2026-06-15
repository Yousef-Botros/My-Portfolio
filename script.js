const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    gsap.set(cursor, { x: mouseX, y: mouseY });
    gsap.set(follower, { x: followerX - 16, y: followerY - 16 });
    
    requestAnimationFrame(updateCursor);
}
updateCursor();

(function() {
    emailjs.init("kXiXKhxm5qj61m1V1");
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        emailjs.sendForm('service_k64igyf', 'template_xgvgw28', this)
            .then(function() {
                alert('Message sent successfully!');
                contactForm.reset();
            }, function(error) {
                alert('Failed to send message, please try again.');
                console.log('FAILED...', error);
            });
    });
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starCount = 5000;
const posArray = new Float32Array(starCount * 3);
for(let i = 0; i < starCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const starMat = new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.012 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);
camera.position.z = 5;

function animateStars() {
    requestAnimationFrame(animateStars);
    stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
}
animateStars();

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});

const navItems = document.querySelectorAll('.nav-item');
const indicator = document.querySelector('.nav-indicator');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    if (current === 'hero' || current === 'contact' || current === '') {
        gsap.to(indicator, { opacity: 0, duration: 0.3 });
    } else {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
                gsap.to(indicator, { 
                    opacity: 1,
                    width: item.offsetWidth + 20, 
                    left: item.offsetLeft - 10,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        });
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

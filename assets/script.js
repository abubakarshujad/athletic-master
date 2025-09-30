document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    const isActive = navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    if (isActive) {
        menuBtn.innerHTML = '&times;'; 
        menuBtn.setAttribute('aria-label', 'Close menu');
    } else {
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Open menu');
    }
    
    document.body.style.overflow = isActive ? 'hidden' : '';
    
    if (window.innerWidth <= 768) {
        if (isActive) {
            navLinks.style.display = 'flex';
            menuOverlay.style.display = 'block';
        } else {
            navLinks.style.display = 'none';
            menuOverlay.style.display = 'none';
        }
    }
}

menuBtn.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuBtn.innerHTML = '☰';
            menuBtn.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
            navLinks.style.display = 'none';
            menuOverlay.style.display = 'none';
        }
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.classList.remove('active');
        menuOverlay.style.display = 'none';
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Open menu');
    } else {
        navLinks.style.display = 'none';
        navLinks.classList.remove('active');
        menuOverlay.style.display = 'none';
        menuOverlay.classList.remove('active');
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Open menu');
    }
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#') return;

        const el = document.querySelector(href);
        if (el) {
            e.preventDefault();
            const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const revealEls = document.querySelectorAll('[data-reveal]');
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

revealEls.forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounter, 1);
        } else {
            counter.innerText = target;
        }
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        menuOverlay.style.display = 'none';
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Open menu');
    } else {
        navLinks.style.display = 'flex';
        menuOverlay.style.display = 'none';
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Open menu');
    }
});
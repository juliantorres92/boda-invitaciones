const WEDDING_DATE = new Date('2026-05-02T16:00:00');
const PHONE_NUMBER = '573013092189';

async function loadGuestData() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('f');

    if (!guestId) {
        document.getElementById('guestName').textContent = '¡Bienvenido!';
        document.getElementById('cuposInfo').textContent = 'Comparte este enlace con el invitado esperado';
        setupWhatsappLink(null);
        return;
    }

    try {
        const response = await fetch('guests.json');
        const guests = await response.json();
        const guest = guests.find(g => g.id === guestId);

        if (guest) {
            document.getElementById('guestName').textContent = `${guest.name}`;
            document.getElementById('cuposInfo').textContent = guest.display;
            
            setupWhatsappLink(guest);
        } else {
            document.getElementById('guestName').textContent = 'Invitado no encontrado';
            document.getElementById('cuposInfo').textContent = 'Por favor verifica tu enlace de invitación';
        }
    } catch (error) {
        console.error('Error loading guest data:', error);
        document.getElementById('guestName').textContent = 'Error al cargar datos';
    }
}

function setupWhatsappLink(guest) {
    const btn = document.getElementById('whatsappBtn');
    let message = 'Hola, confirmamos nuestra asistencia a la boda de Yessica y Julian. ';
    
    if (guest) {
        message += `Nombre: ${guest.name}. Acompañantes: ${guest.display}. `;
    }
    
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    btn.href = whatsappUrl;
}

function flipDigit(el, newValue) {
    const formatted = String(newValue).padStart(2, '0');
    if (el.textContent === formatted) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
        el.textContent = formatted;
        return;
    }

    el.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(-14px)', opacity: 0 }
    ], { duration: 180, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
        el.textContent = formatted;
        el.animate([
            { transform: 'translateY(14px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ], { duration: 220, easing: 'ease-out', fill: 'forwards' });
    };
}

function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
        flipDigit(document.getElementById('days'), 0);
        flipDigit(document.getElementById('hours'), 0);
        flipDigit(document.getElementById('minutes'), 0);
        flipDigit(document.getElementById('seconds'), 0);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    flipDigit(document.getElementById('days'), days);
    flipDigit(document.getElementById('hours'), hours);
    flipDigit(document.getElementById('minutes'), minutes);
    flipDigit(document.getElementById('seconds'), seconds);
}

function initAnimations() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    const container = document.querySelector('.invitation');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: container,
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    const container = document.querySelector('.invitation');

    function updateProgress() {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }

    container.addEventListener('scroll', () => {
        requestAnimationFrame(updateProgress);
    }, { passive: true });

    updateProgress();
}

function initAudio() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');
    let playing = false;

    audio.volume = 0.1;

    function play() {
        audio.play().then(() => {
            playing = true;
            btn.classList.remove('paused');
        }).catch(() => {});
    }

    function toggle() {
        if (playing) {
            audio.pause();
            playing = false;
            btn.classList.add('paused');
        } else {
            play();
        }
    }

    // Intentar autoplay al cargar
    play();

    // Fallback: arrancar en primera interacción si autoplay fue bloqueado
    const container = document.querySelector('.invitation');
    function onFirstInteraction() {
        if (!playing) play();
        container.removeEventListener('scroll', onFirstInteraction);
        document.removeEventListener('touchstart', onFirstInteraction);
        document.removeEventListener('click', onFirstInteraction);
    }
    container.addEventListener('scroll', onFirstInteraction, { passive: true });
    document.addEventListener('touchstart', onFirstInteraction, { passive: true });
    document.addEventListener('click', onFirstInteraction);

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadGuestData();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initAnimations();
    initScrollProgress();
    initAudio();
});
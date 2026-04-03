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
    let message;
    if (guest) {
        const count = (guest.display.match(/\bSr\b|\bSra\b|\bSrta\b/g) || []).length;
        message = count === 1
            ? 'Hola, confirmo mi asistencia a la boda de Yessica y Julian.'
            : 'Hola, confirmamos nuestra asistencia a la boda de Yessica y Julian.';
    } else {
        message = 'Hola, confirmamos nuestra asistencia a la boda de Yessica y Julian.';
    }
    btn.href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
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

    audio.volume = 0;

    function fadeIn(target, duration) {
        const steps = 20;
        const increment = target / steps;
        const interval = duration / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                audio.volume = target;
                clearInterval(timer);
            } else {
                audio.volume = current;
            }
        }, interval);
    }

    function play() {
        audio.play().then(() => {
            playing = true;
            btn.classList.remove('paused');
            fadeIn(0.1, 2000);
        }).catch(() => {});
    }

    function toggle() {
        if (playing) {
            audio.pause();
            playing = false;
            btn.classList.add('paused');
        } else {
            audio.volume = 0.1;
            audio.play().then(() => {
                playing = true;
                btn.classList.remove('paused');
            }).catch(() => {});
        }
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
    });

    return { play };
}

function initSplash(onOpen) {
    const splash = document.getElementById('splash');
    const invitation = document.querySelector('.invitation');
    const musicToggle = document.getElementById('musicToggle');
    const progressBar = document.querySelector('.scroll-progress');

    function showControls() {
        musicToggle.classList.remove('hidden');
        if (progressBar) progressBar.classList.remove('hidden');
    }

    function revealInvitation() {
        invitation.style.visibility = 'visible';
        const cover = invitation.querySelector('.cover');
        if (cover) {
            cover.classList.remove('visible');
            void cover.offsetWidth;
            cover.classList.add('visible');
        }
    }

    if (!splash) {
        invitation.style.visibility = 'visible';
        showControls();
        const startOnce = () => { onOpen(); };
        document.addEventListener('touchstart', startOnce, { once: true, passive: true });
        document.addEventListener('click', startOnce, { once: true });
        return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    splash.addEventListener('click', () => {
        // MUST be first: audio play síncrono en user gesture (Safari iOS)
        onOpen();

        if (prefersReduced) {
            splash.remove();
            invitation.style.visibility = 'visible';
            showControls();
            const cover = invitation.querySelector('.cover');
            if (cover) cover.classList.add('visible');
            return;
        }

        // Deshabilitar clicks adicionales
        splash.style.pointerEvents = 'none';

        // Ocultar hint
        const hint = splash.querySelector('.splash-hint');
        if (hint) hint.style.display = 'none';

        const video = splash.querySelector('.envelope-video');
        const canPlay = video && (video.canPlayType('video/webm') || video.canPlayType('video/mp4'));

        if (!canPlay) {
            splash.classList.add('revealing');
            setTimeout(() => revealInvitation(), 300);
            setTimeout(() => { splash.remove(); showControls(); }, 1100);
            return;
        }

        // Reproducir video inmediatamente
        video.play().catch(() => {
            splash.classList.add('revealing');
            setTimeout(() => revealInvitation(), 300);
            setTimeout(() => { splash.remove(); showControls(); }, 1100);
        });

        // Al terminar el video → revelar invitación
        video.addEventListener('ended', () => {
            revealInvitation();
            splash.classList.add('revealing');
            setTimeout(() => { splash.remove(); showControls(); }, 800);
        });

        // Safety timeout: si el video no termina en 8s, forzar transición
        setTimeout(() => {
            if (invitation.style.visibility !== 'visible') {
                revealInvitation();
                splash.classList.add('revealing');
                setTimeout(() => { splash.remove(); showControls(); }, 800);
            }
        }, 8000);
    }, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
    loadGuestData();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initAnimations();
    initScrollProgress();

    const audioCtrl = initAudio();

    // Ocultar controles hasta que se abra la invitación
    document.getElementById('musicToggle').classList.add('hidden');
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.classList.add('hidden');

    initSplash(() => {
        audioCtrl.play();
    });
});
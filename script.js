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
            
            const cuposText = guest.cupos === 1 
                ? 'Tu invitación tiene 1 cupo disponible'
                : `Tu invitación tiene ${guest.cupos} cupos disponibles`;
            document.getElementById('cuposInfo').textContent = cuposText;
            
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
        message += `Nombre: ${guest.name}. `;
        message += `Cupos: ${guest.cupos}. `;
    }
    
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    btn.href = whatsappUrl;
}

function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function initAnimations() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateProgress);
    }, { passive: true });
    
    updateProgress();
}

document.addEventListener('DOMContentLoaded', () => {
    loadGuestData();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initAnimations();
    initScrollProgress();
});
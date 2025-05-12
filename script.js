// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC_7K2Wr301_CBwjSMa8T0MsDgJ0fzKC8Q",
  authDomain: "contact-cd716.firebaseapp.com",
  databaseURL: "https://contact-cd716-default-rtdb.firebaseio.com",
  projectId: "contact-cd716",
  storageBucket: "contact-cd716.appspot.com",
  messagingSenderId: "892046660987",
  appId: "1:892046660987:web:d336fbf06f96e0537619de",
  measurementId: "G-H45P01T7PF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.add(savedTheme);
        updateThemeIcon();
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (html.classList.contains('dark')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && closeMenu && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Typing Animation
const typingText = document.getElementById('typingText');
if (typingText) {
    const texts = [
        "Web Developer",
        "Data Analyst",
        "Data Scientist",
        "RPA Developer"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing animation
    setTimeout(type, 1000);
}

// Update copyright year
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Alert function
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Telegram notification function
function sendTelegramNotification(data) {
    const token = "7712958701:AAGBAqEYx2gvEPCOHFWVI0aCG_eERK9Ql0U";
    const chat_id = "1278161988";
    const message =
        `📬 New Contact Form Submission:%0A` +
        `👤 Name: ${encodeURIComponent(data.name)}%0A` +
        `✉️ Email: ${encodeURIComponent(data.email)}%0A` +
        `📝 Message: ${encodeURIComponent(data.message)}%0A` +
        `🏷️ Subject: ${encodeURIComponent(data.subject || '')}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Optionally handle success
        })
        .catch(error => {
            // Optionally handle error
        });
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) return;

        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic form validation
            if (!data.name || !data.email || !data.message) {
                throw new Error('Please fill in all required fields');
            }

            // Save to Firebase
            await db.ref('contacts').push({
                name: data.name,
                email: data.email,
                message: data.message,
                subject: data.subject || '',
                timestamp: Date.now()
            });

            // Send Telegram notification
            sendTelegramNotification(data);

            showAlert('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            showAlert(error.message || 'Error sending message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Show success/error message from URL parameters
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('success')) {
    showAlert('Message sent successfully!', 'success');
} else if (urlParams.has('error')) {
    showAlert('Error sending message. Please try again.', 'error');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Scroll to Top Button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
} 
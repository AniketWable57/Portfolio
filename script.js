// --- 1. Typing Effect for Hero Section (Innovation) ---
const typingTextElement = document.querySelector('.role-typing-text');
const roles = [
    "A Full Stack Software Engineer specializing in the **MERN** ecosystem.",
    "Experienced in **React.js** for seamless user experiences.",
    "Building scalable APIs with **Node.js** and **Express.js**.",
    "Designing database models with **MongoDB**.",
    "Proficient in **Java, Python**, and algorithm design.",
    "A motivated software developer eager to grow."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 70;
const deletingSpeed = 40;
const delayBetweenRoles = 1500;

function type() {
    const currentRole = roles[roleIndex % roles.length];
    let displayText = currentRole.substring(0, charIndex);
    
    // Replace **bold** tags with strong tags for styling
    typingTextElement.innerHTML = displayText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    if (!isDeleting) {
        // Typing
        charIndex++;
        if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenRoles);
            return;
        }
    } else {
        // Deleting
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            roleIndex++;
            setTimeout(type, 500);
            return;
        }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
}

// --- 2. Dynamic Skill Tag Loader (Innovation) ---
function loadSkills() {
    // Skills derived directly from Aniket Wable's resume, ordered by stack focus
    const skills = [
        "ReactJS", "NodeJS", "ExpressJS", "MongoDB", // MERN Core
        "JavaScript", "HTML", "CSS", "JSP", // Web Fundamentals
        "Java", "Python", "PHP", "C", "C++", // Other Languages
        "Git", "Postman", "DevOps", "Firebase" // Tools & DevOps
    ];
    const skillCloud = document.querySelector('.skill-cloud');

    skills.forEach(skill => {
        const tag = document.createElement('span');
        tag.classList.add('skill-tag');
        tag.textContent = skill;
        skillCloud.appendChild(tag);
    });
}

// --- 3. Simple Contact Form Handling ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.classList.remove('hidden');
    formStatus.style.color = 'var(--color-primary)';
    formStatus.textContent = 'Sending... please wait.';
    
    // Placeholder for demonstration:
    setTimeout(() => {
        formStatus.textContent = 'Message simulation successful! (Connect to a real backend to make this live.)';
        formStatus.style.color = '#38c172'; // Success Green
        contactForm.reset();
    }, 2000);
});

// --- 4. Navbar Active Link Scroller ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Offset by 150px to account for the sticky header
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- 5. Mobile Menu Toggle ---
const nav = document.querySelector('.navbar nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksMobile = document.querySelectorAll('.navbar nav a'); // Select all links in the nav

function toggleMenu() {
    nav.classList.toggle('active');
    const isExpanded = nav.classList.contains('active');
    // Change icon between bars and X
    menuToggle.querySelector('i').className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
}

menuToggle.addEventListener('click', toggleMenu);

// Close menu when a link is clicked (important for mobile UX)
navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});


// Initialization on load
document.addEventListener('DOMContentLoaded', () => {
    type();
    loadSkills();
});


document.getElementById('contact-form').addEventListener('submit', function(event) {
    // 1. Prevent the default form submission
    event.preventDefault();

    // 2. Get the values from the input fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const userMessage = document.getElementById('message').value;
    const formStatus = document.getElementById('form-status');

    // Basic validation
    if (!name || !email || !userMessage) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.classList.remove('hidden');
        return;
    }

    // 3. Construct the message body
    const phoneNumber = '8308026653';
    // Encode the message to safely pass it in a URL
    const whatsappMessage = encodeURIComponent(
        `Hello, I'm ${name} (${email}).\n\n${userMessage}`
    );

    // 4. Create the WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // 5. Open the URL in a new window/tab
    window.open(whatsappURL, '_blank');
    
    // Optional: Provide feedback to the user
    formStatus.textContent = 'Opening WhatsApp...';
    formStatus.classList.remove('hidden');
});
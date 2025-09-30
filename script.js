document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // CORE CONFIGURATIONS & ELEMENTS
    // =====================================
    const nav = document.querySelector('.navbar nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const whatsappNumber = "8308026653"; // Aniket's WhatsApp Number


    // =====================================
    // 1. Typing Effect for Hero Section
    // =====================================
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
        if (!typingTextElement) return; // Exit if element not found

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
    
    // =====================================
    // 2. Dynamic Skill Tag Loader
    // =====================================
    function loadSkills() {
        const skills = [
            "React.js", "Node.js", "Express.js", "MongoDB", // MERN Core
            "JavaScript", "HTML5", "CSS3", "JSP", // Web Fundamentals
            "Java", "Python", "PHP", "C", "C++", // Other Languages
            "Git", "Postman", "DevOps", "Firebase", // Tools & DevOps
            "Flutter (Dart)", "RESTful APIs", "SQL" // Added missing skills
        ];
        const skillCloud = document.querySelector('.skill-cloud');

        if (!skillCloud) return;

        // Clear existing (static) skills to prevent duplication, though HTML already had tags
        skillCloud.innerHTML = ''; 

        skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.classList.add('skill-tag');
            tag.textContent = skill;
            skillCloud.appendChild(tag);
        });
    }


    // =====================================
    // 3. Scroll-Reveal Animation (Intersection Observer)
    // =====================================
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const skillCloud = document.querySelector('.skill-cloud');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const scrollObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(scrollObserverCallback, observerOptions);

    sectionsToAnimate.forEach(element => {
        scrollObserver.observe(element);
    });

    // Special observer for Skill Cloud to trigger staggered animation (uses CSS delays)
    const skillCloudObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillCloud) {
        skillCloudObserver.observe(skillCloud);
    }

    // =====================================
    // 4. Mobile Navbar Toggle
    // =====================================
    function toggleMenu() {
        if (!nav || !menuToggle) return;
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        // Change icon between bars and X
        menuToggle.querySelector('i').className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked (important for mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // =====================================
    // 5. Contact Form (WhatsApp)
    // =====================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const userMessage = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !userMessage) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill out all fields.';
                    formStatus.classList.remove('hidden');
                    formStatus.style.color = '#ff6b6b';
                }
                return;
            }

            // Construct the message body
            const whatsappMessage = encodeURIComponent(
                `Hello Aniket, I'm ${name} (${email}). I saw your portfolio and wanted to connect about: \n\n${userMessage}`
            );

            // Create the WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            // Open the URL in a new window/tab
            window.open(whatsappURL, '_blank');

            // Provide feedback to the user
            if (formStatus) {
                formStatus.textContent = 'Opening WhatsApp with your message...';
                formStatus.classList.remove('hidden');
                formStatus.style.color = 'var(--color-primary)';
                
                // Optional: Clear form after successful attempt
                setTimeout(() => {
                    contactForm.reset();
                    formStatus.textContent = 'Message initiated via WhatsApp!';
                }, 1000);
            }
        });
    }

    // =====================================
    // 6. Navbar Active Link on Scroll (Intersection Observer)
    // =====================================
    const sections = document.querySelectorAll('main section');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active to the corresponding link
                const targetId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px' }); // Adjusted margin to activate link closer to the top

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Run initial functions
    type();
    loadSkills();
});

document.addEventListener('DOMContentLoaded', function() {
    // Create button
    const button = document.createElement('button');
    button.textContent = 'Get Car Data';
    document.body.appendChild(button);

    // Create main content area
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    document.body.appendChild(mainContent);

    // Add event listener to button

    // Function to toggle navigation menu visibility
    function toggleMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('visible');
        }
    }

    // Add event listener to hamburger icon
    const hamburgerIcon = document.getElementById('hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', toggleMenu);
    }

    // Implement smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Filter projects by category
    function filterProjects(category) {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            if (category === 'all' || project.classList.contains(category)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Add event listeners to project filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProjects(category);
        });
    });

    // Lightbox effect for project images
    function openLightbox(imageSrc) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="Project Image">
                <span class="close-lightbox">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Close lightbox
        lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
    }

    // Add event listeners to project images
    const projectImages = document.querySelectorAll('.project img');
    projectImages.forEach(image => {
        image.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Form submitted successfully!');
            contactForm.reset();
        });
    }
    button.addEventListener('click', function() {
        fetch('https://random-data-api.com/api/vehicle/random_vehicle?size=10')
            .then(response => response.json())
            .then(data => {
                mainContent.innerHTML = ''; // Clear previous content
                data.forEach(car => {
                    const carDiv = document.createElement('div');
                    carDiv.textContent = `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}`;
                    mainContent.appendChild(carDiv);
                });
            })
            .catch(error => console.error('Error fetching car data:', error));
    });
});
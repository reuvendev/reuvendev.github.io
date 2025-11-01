// Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Typed text animation for About section
    const typedText = document.getElementById('typed-text');
    const messages = ['System.out.println("Hello, World!");'];
    let currentMessageIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentMessage = messages[currentMessageIndex];
        const textSpan = typedText.querySelector('span');

        if (isDeleting) {
            currentCharIndex--;
            if (currentCharIndex < 0) {
                isDeleting = false;
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                setTimeout(typeWriter, 500);
                textSpan.textContent = '';
            } else {
                textSpan.textContent = currentMessage.substring(0, currentCharIndex);
                setTimeout(typeWriter, 50);
            }
        } else {
            currentCharIndex++;
            textSpan.textContent = currentMessage.substring(0, currentCharIndex);
            if (currentCharIndex > currentMessage.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
            } else {
                setTimeout(typeWriter, 100);
            }
        }
    }

    setTimeout(typeWriter, 1000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Glow effect on project card images
    document.addEventListener('mouseover', event => {
        if (event.target.matches('.project-card img')) {
            event.target.style.boxShadow = '0 0 15px rgba(88, 166, 255, 0.5)';
        }
    });
    document.addEventListener('mouseout', event => {
        if (event.target.matches('.project-card img')) {
            event.target.style.boxShadow = '';
        }
    });

    // Project rendering helpers
    function getStatusDotsHtml(dots) {
        return dots.map(color => `<span class="text-${color}-500 mr-2">●</span>`).join('');
    }

    function renderProjects(containerId, projects) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        projects.forEach(project => {
            const dotsHtml = getStatusDotsHtml(project.statusDots);
            const codeLinkHtml = project.codeLink ? 
                `<a href="${project.codeLink}" class="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-blue text-sm transition-colors">View Code</a>` 
                : '';
            const cardHtml = `
                <div class="project-card terminal p-6">
                    <div class="flex items-center mb-4 text-gray-400 text-sm">
                        ${dotsHtml}
                        <span>${project.title}</span>
                    </div>
                    <img src="${project.imageSrc}" alt="${project.title} project image" class="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 class="text-lg font-semibold text-blue mb-2">${project.title}</h3>
                    <p class="text-gray-300 text-sm mb-3">${project.description}</p>
                    <div class="text-green-400 text-sm mb-3">// ${project.tech}</div>
                    ${codeLinkHtml}
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // Load project data from JSON file and render
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            renderProjects('current-projects-container', data.currentProjects);
            renderProjects('completed-projects-container', data.completedProjects);
        })
        .catch(error => {
            console.error('Error loading project data:', error);
        });
/* ==== Your Existing Nav Logic ==== */
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}
navSlide();

/* ==== Animation Logic: Banner, Header, Blue Box, About Me, Typewriter, Sunfish ==== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
        .js-fade-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1.2s ease, transform 1.2s ease;
        }
        .js-fade-item.appear {
            opacity: 1;
            transform: translateY(0);
        }
        .typing-cursor::after {
            content: "|";
            animation: blink 0.7s infinite;
            color: #fff;
            margin-left: 2px;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 2. Select the elements
    const banner = document.querySelector('.banner');
    const header = document.querySelector('header');
    const blueBox = document.querySelector('section'); // The main-section blue container
    const aboutMeTitle = document.querySelector('.text-container h2');
    const paragraphs = document.querySelectorAll('.text-container p');
    const sunfish = document.querySelector('.sunbastard');

    // 3. Initial Setup: Hide elements and clear text
    const fadeGroup = [banner, header, blueBox, aboutMeTitle, sunfish];
    fadeGroup.forEach(el => {
        if(el) el.classList.add('js-fade-item');
    });
    
    // Store original text and clear it
    const originalTexts = Array.from(paragraphs).map(p => p.innerText);
    paragraphs.forEach(p => p.innerText = '');

    // 4. Typewriter Function
    const typeLine = (index) => {
        if (index >= paragraphs.length) {
            // Last step: Show the sunfish after typing is done
            if(sunfish) sunfish.classList.add('appear');
            return;
        }

        let i = 0;
        const element = paragraphs[index];
        const text = originalTexts[index];
        element.classList.add('typing-cursor');

        const timer = setInterval(() => {
            element.innerText += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                element.classList.remove('typing-cursor');
                setTimeout(() => typeLine(index + 1), 250); // Pause between lines
            }
        }, 35); 
    };

    // 5. The Sequential "Grand Entrance"
    
    // Step 1: Banner and Site Header fade in
    setTimeout(() => {
        if(banner) banner.classList.add('appear');
        if(header) header.classList.add('appear');
    }, 200);

    // Step 2: The Blue Box container fades in
    setTimeout(() => {
        if(blueBox) blueBox.classList.add('appear');
    }, 900);

    // Step 3: The "About Me" title fades in inside the box
    setTimeout(() => {
        if(aboutMeTitle) aboutMeTitle.classList.add('appear');
    }, 1500);

    // Step 4: The text starts typing
    setTimeout(() => {
        typeLine(0);
    }, 2200);
});
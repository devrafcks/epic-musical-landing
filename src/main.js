gsap.registerPlugin(ScrollTrigger);

gsap.to('.header', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
});

const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
    .to('.hero__title', { opacity: 1, filter: 'blur(0px)', duration: 1.5, delay: 0.5 })
    .to('.hero__subtitle', { opacity: 1, duration: 1, y: 0 }, '-=0.8')
    .to('.hero__cta', { opacity: 1, duration: 1, y: 0 }, '-=0.6');

gsap.to('.about__text h2', {
    scrollTrigger: { trigger: '.about__text h2', start: 'top 80%', end: 'top 50%', scrub: 1 },
    opacity: 1,
    y: 0
});

gsap.to('.about__text p', {
    scrollTrigger: { trigger: '.about__text p', start: 'top 80%', end: 'top 50%', scrub: 1 },
    opacity: 1,
    y: 0,
    stagger: 0.2
});

gsap.to('.about__image', {
    scrollTrigger: { trigger: '.about__image', start: 'top 80%', end: 'top 40%', scrub: 1 },
    opacity: 1,
    scale: 1,
    duration: 1.5
});

gsap.utils.toArray('.cast__card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 60%', scrub: 1 },
        opacity: 0,
        y: 50,
        rotateY: -15,
        duration: 1
    });
});

gsap.utils.toArray('.ticket__card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 60%', scrub: 1 },
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 1,
        delay: i * 0.2
    });
});

document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return; 

        const carouselTrack = carousel.querySelector('.carousel__track');
        const slides = Array.from(carouselTrack.children);
        const prevButton = carousel.querySelector('.carousel__btn--prev');
        const nextButton = carousel.querySelector('.carousel__btn--next');
        const indicatorsContainer = carousel.querySelector('.carousel__indicators');
        const indicators = Array.from(indicatorsContainer.children);

        let currentSlideIndex = 0;
        let slideWidth;

        const getSlideWidth = () => slides[0].getBoundingClientRect().width;

        const moveToSlide = (targetIndex) => {
            if (targetIndex < 0) {
                targetIndex = slides.length - 1; 
            } else if (targetIndex >= slides.length) {
                targetIndex = 0; 
            }

            slideWidth = getSlideWidth(); 
            const amountToMove = targetIndex * slideWidth;
            carouselTrack.style.transform = `translateX(-${amountToMove}px)`;
            indicators.forEach(indicator => indicator.classList.remove('carousel__indicator--active'));
            if (indicators[targetIndex]) {
                 indicators[targetIndex].classList.add('carousel__indicator--active');
            }
            currentSlideIndex = targetIndex;
        };

        nextButton.addEventListener('click', () => {
            moveToSlide(currentSlideIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentSlideIndex - 1);
        });

        indicatorsContainer.addEventListener('click', e => {
            if (e.target.matches('.carousel__indicator')) {
                const targetIndex = parseInt(e.target.dataset.slide);
                moveToSlide(targetIndex);
            }
        });

        window.addEventListener('load', () => moveToSlide(0)); 
        window.addEventListener('resize', () => moveToSlide(currentSlideIndex));
        setTimeout(() => moveToSlide(0), 100); 
    });

const tabs = document.querySelectorAll('.cast__tab');
const contents = document.querySelectorAll('.cast__grid');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('cast__tab--active'));
        tab.classList.add('cast__tab--active');

        contents.forEach(content => {
            content.classList.remove('cast__grid--active');
            if (content.dataset.content === target) {
                content.classList.add('cast__grid--active');

                gsap.from(content.children, {
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
    });
});

const faqQuestions = document.querySelectorAll('.faq__question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('faq__question--active');

        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('faq__question--active');
                q.nextElementSibling.style.maxHeight = null;
            }
        });

        question.classList.toggle('faq__question--active');

        if (!isActive) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            gsap.from(answer.querySelector('.faq__answer-content'), {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            answer.style.maxHeight = null;
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

gsap.to('.hero__background', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    y: 200,
    opacity: 0.5
});

document.querySelectorAll('.btn--primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' }));
    btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' }));
});

gsap.utils.toArray('.cast__title, .tickets__title, .faq__title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: { trigger: title, start: 'top 85%', end: 'top 60%', scrub: 1 },
        opacity: 0,
        y: 50,
        scale: 0.9
    });
});

updateCarousel();

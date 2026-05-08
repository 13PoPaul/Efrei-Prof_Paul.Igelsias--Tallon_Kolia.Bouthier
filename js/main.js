// --- 1. CODE DU CARROUSEL ---
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    // Si on n'est pas sur la page d'accueil, le carrousel n'existe pas, on arrête le script ici pour éviter des erreurs
    if (!track) return; 

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoplayInterval;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(showNextSlide, 5000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    nextButton.addEventListener('click', function () {
        showNextSlide();
        startAutoplay();
    });

    prevButton.addEventListener('click', function () {
        showPrevSlide();
        startAutoplay();
    });

    track.addEventListener('mouseover', stopAutoplay);
    track.addEventListener('mouseout', startAutoplay);

    updateCarousel();
    startAutoplay();
}); // <-- FIN DU BLOC DOMContentLoaded

// --- 2. CODE DU QUIZ (Sorti du bloc précédent pour être accessible globalement) ---
function checkQuiz() {
    // Récupérer les réponses sélectionnées
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const resultDiv = document.getElementById('quiz-result');

    // Vérifier si l'utilisateur a répondu à toutes les questions
    if (!q1 || !q2) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'quiz-result result-error';
        resultDiv.innerHTML = '⚠️ Please answer all questions before checking!';
        return;
    }

    let score = 0;

    // Calcul du score
    if (q1.value === 'correct') score++;
    if (q2.value === 'correct') score++;

    // Affichage du résultat
    resultDiv.style.display = 'block';
    if (score === 2) {
        resultDiv.className = 'quiz-result result-success';
        resultDiv.innerHTML = '🎉 Excellent! You got 2/2. You are ready for OOP!';
    } else {
        resultDiv.className = 'quiz-result result-error';
        resultDiv.innerHTML = `💡 You got ${score}/2. No worries, that's exactly what this course is for!`;
    }
}
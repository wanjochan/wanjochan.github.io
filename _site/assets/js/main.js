// Main JavaScript for QuantTech Finance Blog

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initCharts();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .post-card, .stat-item');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize animations
function initAnimations() {
    // Counter animation for stats
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const text = stat.textContent;
        const number = parseFloat(text.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(number)) {
            animateCounter(stat, 0, number, 2000, text);
        }
    });
}

// Counter animation function
function animateCounter(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const isPercentage = originalText.includes('%');
    const isPositive = originalText.includes('+');
    const isNegative = originalText.includes('-');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutQuart(progress);
        let displayValue = current.toFixed(1);
        
        if (isPercentage) displayValue += '%';
        if (isPositive && current > 0) displayValue = '+' + displayValue;
        if (isNegative && current < 0) displayValue = '-' + Math.abs(displayValue);
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Easing function
function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Initialize charts
function initCharts() {
    const heroChart = document.getElementById('heroChart');
    if (heroChart) {
        drawHeroChart(heroChart);
    }
}

// Draw hero chart with canvas
function drawHeroChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = [100, 102, 98, 105, 110, 108, 115, 120, 118, 125, 130, 128, 135];
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    
    function drawChart() {
        ctx.clearRect(0, 0, width, height);
        
        // Grid
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = padding + (height - 2 * padding) * i / 10;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Chart line
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = padding + (width - 2 * padding) * i / (data.length - 1);
            const y = height - padding - (height - 2 * padding) * (data[i] - 90) / 50;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Data points
        ctx.fillStyle = '#00ff88';
        for (let i = 0; i < data.length; i++) {
            const x = padding + (width - 2 * padding) * i / (data.length - 1);
            const y = height - padding - (height - 2 * padding) * (data[i] - 90) / 50;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    drawChart();
}

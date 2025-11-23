// Chart.js configuration and data
document.addEventListener('DOMContentLoaded', function() {
    // Chart colors
    const colors = {
        primary: '#1e3a8a',
        secondary: '#0f766e',
        accent: '#dc2626',
        scenario1: '#3b82f6',
        scenario2: '#8b5cf6',
        scenario3: '#10b981',
        scenario4: '#f59e0b',
        indices: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']
    };

    // Years for charts
    const years = [];
    for (let i = 2025; i <= 2035; i++) {
        years.push(i);
    }

    // Expenditure Chart (Kuva 5)
    const expenditureCtx = document.getElementById('expenditureChart');
    if (expenditureCtx) {
        // Simulated data based on the table values
        // Scenario 1: 62 -> 73.78 (linear approximation)
        const scenario1Data = [62, 63.5, 65.2, 66.9, 68.5, 69.8, 70.9, 71.8, 72.5, 73.1, 73.78];
        // Scenario 2: 62 -> 72.71
        const scenario2Data = [62, 63.3, 64.7, 66.1, 67.4, 68.6, 69.7, 70.6, 71.4, 72.1, 72.71];
        // Scenario 3: 62 -> 69.88
        const scenario3Data = [62, 63.0, 64.1, 65.2, 66.3, 67.3, 68.2, 68.9, 69.5, 69.7, 69.88];
        // Scenario 4: 62 -> 68.32
        const scenario4Data = [62, 62.8, 63.7, 64.6, 65.5, 66.3, 67.0, 67.6, 68.0, 68.2, 68.32];

        new Chart(expenditureCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Skenaario 1: Perusvaihtoehto',
                        data: scenario1Data,
                        borderColor: colors.scenario1,
                        backgroundColor: colors.scenario1 + '20',
                        borderWidth: 3,
                        tension: 0.4
                    },
                    {
                        label: 'Skenaario 2: Jäädytysten jatkaminen',
                        data: scenario2Data,
                        borderColor: colors.scenario2,
                        backgroundColor: colors.scenario2 + '20',
                        borderWidth: 3,
                        tension: 0.4
                    },
                    {
                        label: 'Skenaario 3: Ehdollinen indeksileikkaus',
                        data: scenario3Data,
                        borderColor: colors.scenario3,
                        backgroundColor: colors.scenario3 + '20',
                        borderWidth: 3,
                        tension: 0.4
                    },
                    {
                        label: 'Skenaario 4: Kokonaisvaltainen indeksileikkaus',
                        data: scenario4Data,
                        borderColor: colors.scenario4,
                        backgroundColor: colors.scenario4 + '20',
                        borderWidth: 3,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + ' mrd. €';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 75,
                        title: {
                            display: true,
                            text: 'Menot (mrd. €)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(0) + ' mrd.';
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Vuosi',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe scenario cards
    document.querySelectorAll('.scenario-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

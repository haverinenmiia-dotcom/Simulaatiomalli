// Chart.js configuration and data
document.addEventListener('DOMContentLoaded', function() {
    // Chart colors
    const colors = {
        primary: '#1e3a8a',
        secondary: '#0f766e',
        accent: '#dc2626',
        scenario1: '#2f3a44',
        scenario2: '#3a6ea5',
        scenario3: '#c8821f',
        scenario4: '#1f7a4d'
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
        // Helper function to calculate uncertainty bands (10/90 quantiles)
        // Uncertainty increases over time: starts at ±0.1% (2025) and grows to ±1.9% (2035)
        function calculateUncertaintyBands(data) {
            const upper = [];
            const lower = [];
            const numPoints = data.length;
            
            data.forEach((value, index) => {
                // Uncertainty grows linearly from 0.1% at start to 1.9% at end
                // Based on: 2025 ~62.24 (very narrow, almost no difference) and 2035 ~72.37-75.24 (wider)
                const progress = index / (numPoints - 1); // 0 to 1
                const uncertaintyPercent = 0.001 + (progress * 0.018); // 0.1% to 1.9%
                
                // 10/90 quantiles: approximately ±1.28 standard deviations
                // Using multiplier to approximate 10th and 90th percentiles
                const multiplier = 1.28; // For 10/90 quantiles
                upper.push(value * (1 + uncertaintyPercent * multiplier)); // 90th percentile
                lower.push(value * (1 - uncertaintyPercent * multiplier)); // 10th percentile
            });
            
            return { upper, lower };
        }
        
        const scenario1Data = [62.24, 62.60, 63.78, 64.60, 65.74, 66.26, 68.05, 69.59, 71.36, 72.85, 73.78];
        const scenario1Lower = [62.24, 62.34, 63.38, 64.03, 65.03, 65.42, 67.09, 68.53, 70.19, 71.57, 72.37];
        const scenario1Upper = [62.24, 62.90, 64.20, 65.21, 66.48, 67.14, 69.07, 70.73, 72.59, 74.20, 75.24];

        const scenario2Data = [62.24, 62.60, 63.78, 64.49, 65.49, 65.88, 67.53, 68.93, 70.57, 71.91, 72.71];
        const scenario2Lower = [62.24, 62.34, 63.38, 64.00, 64.91, 65.21, 66.78, 68.10, 69.67, 70.95, 71.67];
        const scenario2Upper = [62.24, 62.90, 64.20, 65.03, 66.11, 66.58, 68.33, 69.80, 71.51, 72.93, 73.82];

        const scenario3Data = [62.24, 62.63, 63.46, 64.18, 64.82, 64.82, 66.06, 67.03, 68.21, 69.09, 69.88];
        const scenario3Lower = [62.24, 62.35, 63.06, 63.66, 64.21, 64.11, 65.27, 66.14, 67.26, 68.07, 68.77];
        const scenario3Upper = [62.24, 62.96, 63.93, 64.77, 65.50, 65.59, 66.91, 67.99, 69.22, 70.19, 71.05];

        const scenario4Data = [62.24, 62.20, 62.97, 63.49, 64.06, 64.00, 65.17, 66.07, 67.18, 68.00, 68.32];
        const scenario4Lower = [62.24, 61.97, 62.49, 62.91, 63.39, 63.22, 64.31, 65.13, 66.17, 66.90, 67.15];
        const scenario4Upper = [62.24, 62.57, 63.49, 64.14, 64.81, 64.85, 66.09, 67.12, 68.29, 69.18, 69.60];

        new Chart(expenditureCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    // Uncertainty areas (10/90 quantiles) - filled areas around each line
                    {
                        label: 'Skenaario 1: 90% kvantiili',
                        data: scenario1Upper,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario1 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: '+1',
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    {
                        label: 'Skenaario 1: 10% kvantiili',
                        data: scenario1Lower,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario1 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    {
                        label: 'Skenaario 2: 90% kvantiili',
                        data: scenario2Upper,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario2 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: '+1',
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    {
                        label: 'Skenaario 2: 10% kvantiili',
                        data: scenario2Lower,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario2 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    {
                        label: 'Skenaario 3: 90% kvantiili',
                        data: scenario3Upper,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario3 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: '+1',
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    {
                        label: 'Skenaario 3: 10% kvantiili',
                        data: scenario3Lower,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario3 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    {
                        label: 'Skenaario 4: 90% kvantiili',
                        data: scenario4Upper,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario4 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: '+1',
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    {
                        label: 'Skenaario 4: 10% kvantiili',
                        data: scenario4Lower,
                        borderColor: 'transparent',
                        backgroundColor: colors.scenario4 + '25',
                        borderWidth: 0,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        order: 0
                    },
                    // Main lines (drawn on top of uncertainty bands)
                    {
                        label: 'Skenaario 1: Nyk. säännöt 2027 asti',
                        data: scenario1Data,
                        borderColor: colors.scenario1,
                        backgroundColor: colors.scenario1,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        order: 1
                    },
                    {
                        label: 'Skenaario 2: Nyk. säännöt 2035 asti',
                        data: scenario2Data,
                        borderColor: colors.scenario2,
                        backgroundColor: colors.scenario2,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        order: 1
                    },
                    {
                        label: 'Skenaario 3: Jarru -1 % (inflaatio ≥ 2 %)',
                        data: scenario3Data,
                        borderColor: colors.scenario3,
                        backgroundColor: colors.scenario3,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        order: 1
                    },
                    {
                        label: 'Skenaario 4: Jarru -1 % (rajoittamaton)',
                        data: scenario4Data,
                        borderColor: colors.scenario4,
                        backgroundColor: colors.scenario4,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                            },
                            filter: function(item) {
                                // Hide uncertainty area datasets from legend
                                return !item.text.includes('kvantiili');
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            filterTooltipItems: function(tooltipItems) {
                                // Hide uncertainty area datasets (kvantiilit) from tooltip
                                return tooltipItems.filter(function(item) {
                                    const label = item.dataset.label || '';
                                    return !label.includes('kvantiili');
                                });
                            },
                            label: function(context) {
                                // Double check - don't show kvantiilit
                                if (context.dataset.label && context.dataset.label.includes('kvantiili')) {
                                    return null;
                                }
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + ' mrd. €';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 76,
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

    // Display embedded data as static table
    displayDataTable();
});

// Embedded CSV data (converted from "data uusi.csv")
const embeddedData = [
    ['Momentti', 'Momentin nimi', 'Indeksiryhmä', 'Määrä (€)'],
    ['28.89.31', 'Hyvinvointialueiden ja HUS-yhtymän sosiaali- ja terveydenhuollon sekä pelastustoimen rahoitus', 'Hyvinvointialueiden hintaindeksi', '26 235 003 000'],
    ['28.50.15', 'Eläkkeet', 'Työeläkeindeksi (TyEL)', '5 622 854 000'],
    ['33.40.60', 'Valtion osuus kansaneläkelaista ja eräistä muista laeista johtuvista menoista', 'Kansaneläkeindeksi (KEL)', '4 065 100 000'],
    ['28.90.30', 'Valtionosuus kunnille peruspalvelujen järjestämiseen', 'Valtionosuusindeksi (VOS)', '3 366 600 000'],
    ['27.10.01', 'Puolustusvoimien toimintamenot', 'Kuluttajahintaindeksi (KHI)', '2 519 809 000'],
    ['29.40.50', 'Valtionrahoitus yliopistojen toimintaan', 'Yliopistoindeksi', '2 269 102 000'],
    ['33.30.60', 'Valtion osuus sairausvakuutuslaista johtuvista menoista', 'Kansaneläkeindeksi (KEL)', '1 866 300 000'],
    ['27.10.19', 'Monitoimihävittäjien hankinta', 'Toteutuneen kustannustason nousun mukaan', '1 852 774 000'],
    ['33.10.50', 'Perhe-etuudet', 'Kuluttajahintaindeksi (KHI)', '1 626 400 000'],
    ['27.10.18', 'Puolustusmateriaalihankinnat', 'Teollisuuden tuottajahintaindeksi, alaindeksi C28', '1 517 054 000'],
    ['33.10.54', 'Asumistuki', 'Kansaneläkeindeksi (KEL)', '1 406 300 000'],
    ['33.20.52', 'Valtionosuus työttömyysetuuksien perusturvasta', 'Kansaneläkeindeksi (KEL)', '1 312 500 000'],
    ['29.40.55', 'Valtionrahoitus ammattikorkeakoulujen toimintaan', 'Yliopistoindeksi', '1 020 666 000'],
    ['29.20.30', 'Valtionosuus ja -avustus ammatilliseen koulutukseen', 'Ammatillisen koulutuksen indeksi', '1 020 058 000'],
    ['33.10.57', 'Perustoimeentulotuki', 'Kansaneläkeindeksi (KEL)', '970 200 000'],
    ['33.40.51', 'Valtion osuus maatalousyrittäjän eläkelaista johtuvista menoista', 'Työeläkeindeksi (TyEL)', '850 000 000'],
    ['29.70.55', 'Opintoraha ja asumislisä', 'Kansaneläkeindeksi (KEL)', '699 300 000'],
    ['29.10.30', 'Valtionosuus ja -avustus esi- ja perusopetuksen ja varhaiskasvatuksen käyttökustannuksiin', 'Valtionosuusindeksi (VOS)', '625 697 000'],
    ['31.20.60', 'Siirto valtion televisio- ja radiorahastoon', 'YLE-indeksi', '609 681 000'],
    ['33.20.50', 'Valtionosuus työttömyysetuuksien ansioturvasta ja vuorottelukorvauksesta', 'Kansaneläkeindeksi (KEL)', '539 800 000'],
    ['33.40.52', 'Valtion osuus yrittäjän eläkelaista johtuvista menoista', 'Työeläkeindeksi (TyEL)', '521 800 000'],
    ['28.50.63', 'Muiden eläkelaitosten vastattavaksi kuuluvat eläkemenot', 'Työeläkeindeksi (TyEL)', '375 086 000'],
    ['29.20.35', 'Valtionosuus ja -avustus lukiokoulutuksen käyttökustannuksiin', 'Valtionosuusindeksi (VOS)', '333 411 000'],
    ['29.10.31', 'Valtionosuus ja -avustus vapaan sivistystyön oppilaitosten käyttökustannuksiin', 'Valtionosuusindeksi (VOS)', '185 445 000'],
    ['29.80.31', 'Valtionosuus ja -avustus esittävän taiteen ja museoiden käyttökustannuksiin', 'Valtionosuusindeksi (VOS)', '147 118 000'],
    ['29.01.52', 'Valtion rahoitus evankelis-luterilaisen kirkon yhteiskunnallisiin tehtäviin', 'Kuluttajahintaindeksi (KHI)', '105 030 000'],
    ['29.80.34', 'Valtionosuus ja -avustus taiteen perusopetuksen käyttökustannuksiin', 'Valtionosuusindeksi (VOS)', '99 609 000'],
    ['33.40.50', 'Valtion osuus merimieseläkekassan menoista', 'Työeläkeindeksi (TyEL)', '68 000 000'],
    ['29.80.56', 'Valtionrahoitus kansallisten taidelaitosten toimintaan', 'Ansiotasoindeksi 2/3 ja KHI 1/3', '66 764 000'],
    ['27.30.20', 'Sotilaallisen kriisinhallinnan kalusto- ja hallintomenot', 'Kuluttajahintaindeksi (KHI)', '64 920 000'],
    ['26.40.63', 'Vastaanottotoiminnan asiakkaille maksettavat tuet', 'Kansaneläkeindeksi (KEL)', '45 890 000'],
    ['33.50.52', 'Sotilasvammakorvaukset', 'Työeläkeindeksi (TyEL)', '42 000 000'],
    ['29.90.52', 'Valtionosuudet kunnille ja liikunnan koulutuskeskuksille', 'Valtionosuusindeksi (VOS)', '36 631 000'],
    ['28.50.95', 'Muiden eläkelaitosten valtion puolesta maksamien eläkemenojen ym. korkomenot', 'Työeläkeindeksi (TyEL)', '34 961 000'],
    ['33.40.53', 'Valtion korvaus lapsen hoidon ja opiskelun ajalta kertyvästä eläkkeestä', 'Työeläkeindeksi (TyEL)', '27 600 000'],
    ['33.10.53', 'Sotilasavustus', 'Kansaneläkeindeksi (KEL)', '23 000 000'],
    ['29.80.16', 'Ylimääräiset taiteilija- ja sanomalehtimieseläkkeet', 'Työeläkeindeksi (TyEL)', '22 932 000'],
    ['33.40.54', 'Valtion osuus maatalousyrittäjien tapaturmavakuutuksen kustannuksista', 'Työeläkeindeksi (TyEL)', '14 000 000'],
    ['30.10.42', 'Luopumistuet ja -eläkkeet', 'TyEL/KEL', '13 200 000'],
    ['29.80.30', 'Valtionavustukset yleisten kirjastojen toimintaan', 'Valtionosuusindeksi (VOS)', '9 228 000'],
    ['33.50.50', 'Rintamalisät', 'Kansaneläkeindeksi (KEL)', '3 500 000'],
    ['29.01.51', 'Avustukset kirkolliseen ja uskonnolliseen toimintaan', 'Kuluttajahintaindeksi (KHI)', '3 152 000'],
    ['28.50.16', 'Ylimääräiset eläkkeet ja muut eläkemenot', 'Työeläkeindeksi (TyEL)', '2 797 000'],
    ['33.20.55', 'Valtionosuudet Työllisyysrahastolle', 'Kansaneläkeindeksi (KEL)', '1 595 000']
];

// Function to display embedded data as static HTML table
function displayDataTable() {
    const container = document.getElementById('data-table-container');
    if (!container) return; // Exit if container doesn't exist

    try {
        if (embeddedData.length < 2) {
            throw new Error('Dataa ei löytynyt');
        }
        
        // First row is headers
        const headers = embeddedData[0];
        const rows = embeddedData.slice(1);
        
        if (rows.length === 0) {
            throw new Error('Dataa ei löytynyt');
        }
        
        // Create HTML table
        let tableHTML = '<table class="data-table">';
        
        // Table header
        tableHTML += '<thead><tr>';
        headers.forEach(header => {
            if (header) {
                tableHTML += `<th>${escapeHtml(header)}</th>`;
            }
        });
        tableHTML += '</tr></thead>';
        
        // Table body
        tableHTML += '<tbody>';
        rows.forEach(row => {
            tableHTML += '<tr>';
            headers.forEach((header, index) => {
                const cell = row[index] !== undefined ? row[index] : '';
                const cellValue = cell !== null && cell !== undefined ? String(cell).trim() : '';
                
                // Momentti column should always be treated as text (contains dots like "28.89.31")
                const isMomenttiColumn = header === 'Momentti';
                
                // Check if cell is a number for right alignment (but not Momentti column)
                let isNumber = false;
                let displayValue = cellValue;
                
                if (!isMomenttiColumn && cellValue !== '') {
                    // Remove spaces and convert comma to dot for parsing
                    const cleanValue = cellValue.replace(/\s/g, '').replace(',', '.');
                    const numValue = parseFloat(cleanValue);
                    // Only treat as number if it's a valid number and doesn't contain multiple dots (like momentti codes)
                    const hasMultipleDots = (cellValue.match(/\./g) || []).length > 1;
                    isNumber = !isNaN(numValue) && !hasMultipleDots && cleanValue === numValue.toString();
                    
                    // Format numbers with thousand separators
                    if (isNumber) {
                        displayValue = numValue.toLocaleString('fi-FI', { 
                            minimumFractionDigits: 0, 
                            maximumFractionDigits: 0 
                        });
                    }
                }
                
                const cellClass = isNumber ? 'number' : '';
                tableHTML += `<td class="${cellClass}">${escapeHtml(displayValue)}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody></table>';
        
        container.innerHTML = tableHTML;
        
    } catch (error) {
        console.error('Virhe taulukon luomisessa:', error);
        container.innerHTML = `
            <div style="padding: 2rem; background-color: #fee; border: 1px solid #fcc; border-radius: 4px;">
                <p style="color: #c33; margin: 0;">
                    <strong>Virhe:</strong> ${error.message}
                </p>
            </div>
        `;
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Accordion toggle function for data table
function toggleAccordion() {
    const content = document.getElementById('accordion-content');
    const icon = document.getElementById('accordion-icon');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
    }
}

// Accordion toggle function for methodology
function toggleMethodology() {
    const content = document.getElementById('methodology-content');
    const icon = document.getElementById('methodology-icon');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
    }
}

// Accordion toggle function for limitations
function toggleLimitations() {
    const content = document.getElementById('limitations-content');
    const icon = document.getElementById('limitations-icon');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
    }
}

// Accordion toggle function for references
function toggleReferences() {
    const content = document.getElementById('references-content');
    const icon = document.getElementById('references-icon');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
    }
}

// Accordion toggle function for index table
function toggleIndexTable() {
    const content = document.getElementById('index-table-content');
    const icon = document.getElementById('index-table-icon');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
    }
}

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
        // Helper function to calculate uncertainty bands (10/90 quantiles)
        // Uncertainty increases over time: starts at ±1% and grows to ±5% by 2035
        function calculateUncertaintyBands(data) {
            const upper = [];
            const lower = [];
            const numPoints = data.length;
            
            data.forEach((value, index) => {
                // Uncertainty grows linearly from 1% at start to 5% at end
                const progress = index / (numPoints - 1); // 0 to 1
                const uncertaintyPercent = 0.01 + (progress * 0.04); // 1% to 5%
                
                // 10/90 quantiles: approximately ±1.28 standard deviations
                // Using multiplier to approximate 10th and 90th percentiles
                const multiplier = 1.28; // For 10/90 quantiles
                upper.push(value * (1 + uncertaintyPercent * multiplier)); // 90th percentile
                lower.push(value * (1 - uncertaintyPercent * multiplier)); // 10th percentile
            });
            
            return { upper, lower };
        }
        
        // Scenario 1: 62 -> 73.78 (linear approximation)
        const scenario1Data = [62, 63.5, 65.2, 66.9, 68.5, 69.8, 70.9, 71.8, 72.5, 73.1, 73.78];
        const scenario1Bands = calculateUncertaintyBands(scenario1Data);
        const scenario1Upper = scenario1Bands.upper;
        const scenario1Lower = scenario1Bands.lower;
        
        // Scenario 2: 62 -> 72.71
        const scenario2Data = [62, 63.3, 64.7, 66.1, 67.4, 68.6, 69.7, 70.6, 71.4, 72.1, 72.71];
        const scenario2Bands = calculateUncertaintyBands(scenario2Data);
        const scenario2Upper = scenario2Bands.upper;
        const scenario2Lower = scenario2Bands.lower;
        
        // Scenario 3: 62 -> 69.88
        const scenario3Data = [62, 63.0, 64.1, 65.2, 66.3, 67.3, 68.2, 68.9, 69.5, 69.7, 69.88];
        const scenario3Bands = calculateUncertaintyBands(scenario3Data);
        const scenario3Upper = scenario3Bands.upper;
        const scenario3Lower = scenario3Bands.lower;
        
        // Scenario 4: 62 -> 68.32
        const scenario4Data = [62, 62.8, 63.7, 64.6, 65.5, 66.3, 67.0, 67.6, 68.0, 68.2, 68.32];
        const scenario4Bands = calculateUncertaintyBands(scenario4Data);
        const scenario4Upper = scenario4Bands.upper;
        const scenario4Lower = scenario4Bands.lower;

        new Chart(expenditureCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    // Main lines
                    {
                        label: 'Skenaario 1: Perusvaihtoehto',
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
                        label: 'Skenaario 2: Jäädytysten jatkaminen',
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
                        label: 'Skenaario 3: Ehdollinen indeksileikkaus',
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
                        label: 'Skenaario 4: Kokonaisvaltainen indeksileikkaus',
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

    // Display embedded data as static table
    displayDataTable();
});

// Embedded CSV data (converted from "data uusi.csv")
const embeddedData = [
    ['Momentti', 'Indeksiryhmä', 'Kuvaus', 'Lähtöarvo 2025'],
    ['28.89.31', 'Hyvinvointialueiden hintaindeksi', 'Hyvinvointialueiden ja HUS-yhtymän sosiaali- ja terveydenhuollon sekä pelastustoimen rahoitus', '26 235 003 000'],
    ['28.50.15', 'Työeläkeindeksi (TyEL)', 'Eläkkeet', '5 622 854 000'],
    ['33.40.60', 'Kansaneläkeindeksi (KEL)', 'Valtion osuus kansaneläkelaisesta ja eräistä muista laeista johtuvista menoista', '4 065 100 000'],
    ['28.90.30', 'Valtionosuusindeksi (VOS)', 'Valtionosuus kunnille peruspalvelujen järjestämiseen', '3 366 600 000'],
    ['27.10.01', 'Kuluttajahintaindeksi (KHI)', 'Puolustusvoimien toimintamenot', '2 519 809 000'],
    ['29.40.50', 'Yliopistoindeksi', 'Valtionrahoitus yliopistojen toimintaan', '2 269 102 000'],
    ['33.30.60', 'Kansaneläkeindeksi (KEL)', 'Valtion osuus sairausvakuutuslaista johtuvista menoista', '1 866 300 000'],
    ['33.10.50', 'Kuluttajahintaindeksi (KHI)', 'Perhe-etuudet', '1 626 400 000'],
    ['27.10.19', 'Toteutuneen kustannustason nousun mukaan', 'Monitoimihävittäjien hankinta', '1 852 774 000'],
    ['27.10.18', 'Teollisuuden tuottahindeksi, alaindeksin C28 (Muiden koneiden ja laitteiden valmistus)', 'Puolustusmateriaalihankinnat', '1 517 054 000'],
    ['33.20.52', 'Kansaneläkeindeksi (KEL)', 'Valtionosuus työttömyysetuuksien perusturvasta', '1 312 500 000'],
    ['33.10.54', 'Kansaneläkeindeksi (KEL)', 'Asumistuki', '1 406 300 000'],
    ['33.10.57', 'Kansaneläkeindeksi (KEL)', 'Perustoimeentulotuki', '970 200 000'],
    ['29.40.55', 'Yliopistoindeksi', 'Valtionrahoitus ammattikorkeakoulujen toimintaan', '1 020 666 000'],
    ['29.20.30', 'Ammatillisen koulutuksen indeksi', 'Valtionosuus ja -avustus ammatilliseen koulutukseen', '1 020 058 000'],
    ['29.70.55', 'Kansaneläkeindeksi (KEL)', 'Opintoraha ja asumislisä', '699 300 000'],
    ['33.40.51', 'Työeläkeindeksi (TyEL)*', 'Valtion osuus maatalousyrittäjän eläkelaisesta johtuvista menoista', '850 000 000'],
    ['29.10.30', 'Valtionosuusindeksi (VOS)', 'Valtionosuus ja -avustus esi- ja perusopetuksen ja varhaiskasvatuksen käyttökustannuksiin', '625 697 000'],
    ['33.20.50', 'Kansaneläkeindeksi (KEL)', 'Valtionosuus työttömyysetuuksien ansioturvasta ja vuorottelukorvauksesta', '539 800 000'],
    ['31.20.60', 'YLE-indeksi', 'Siirto valtion televisio- ja radiorahastoon', '609 681 000'],
    ['33.40.52', 'Työeläkeindeksi (TyEL)*', 'Valtion osuus yrittäjän eläkelaisesta johtuvista menoista', '521 800 000'],
    ['28.50.63', 'Työeläkeindeksi (TyEL)', 'Muiden eläkelaitosten vastattavaksi kuuluvat eläkemenot', '375 086 000'],
    ['29.20.35', 'Valtionosuusindeksi (VOS)', 'Valtionosuus ja -avustus lukiokoulutuksen käyttökustannuksiin', '333 411 000'],
    ['29.10.31', 'Valtionosuusindeksi (VOS)', 'Valtionosuus ja -avustus vapaan sivistystyön oppilaitosten käyttökustannuksiin', '185 445 000'],
    ['29.80.31', 'Valtionosuusindeksi (VOS)', 'Valtionosuus ja -avustus esittävän taiteen ja museoiden käyttökustannuksiin', '147 118 000'],
    ['29.80.34', 'Valtionosuusindeksi (VOS)', 'Valtionosuus ja -avustus taiteen perusopetuksen käyttökustannuksiin', '99 609 000'],
    ['29.01.52', 'Kuluttajahintaindeksi (KHI)', 'Valtion rahoitus evankelis-luterilaisen kirkon yhteiskunnallisiin tehtäviin', '105 030 000'],
    ['29.80.56', 'ATI 2/3 ja KHI 1/3 painolla', 'Valtionrahoitus kansallisten taidelaitosten toimintaan', '66 764 000'],
    ['33.40.50', 'Työeläkeindeksi (TyEL)', 'Valtion osuus merimieseläkekassan menoista', '68 000 000'],
    ['27.30.20', 'Kuluttajahintaindeksi (KHI)', 'Sotilaallisen kriisinhallinnan kalusto- ja hallintomenot', '64 920 000'],
    ['29.90.52 (29.90.30)', 'Valtionosuusindeksi (VOS)', 'Valtionosuudet kunnille ja liikunnan koulutuskeskuksille', '36 631 000'],
    ['33.50.52', 'Työeläkeindeksi (TyEL)*', 'Sotilasvammakorvaukset', '42 000 000'],
    ['33.40.53', 'Työeläkeindeksi (TyEL)', 'Valtion korvaus lapsen hoidon ja opiskelun ajalta kertyvästä eläkeestä', '27 600 000'],
    ['33.10.53', 'Kansaneläkeindeksi (KEL)', 'Sotilasavustus', '23 000 000'],
    ['29.80.16', 'Työeläkeindeksi (TyEL)', 'Ylimääräiset taiteilija- ja sanomalehtimieseläkkeet', '22 932 000'],
    ['28.50.95', 'Työeläkeindeksi (TyEL)', 'Muiden eläkelaitosten valtion puolesta maksamien eläkemenojen ja valtiolle maksamien ennakoiden korkomenot', '34 961 000'],
    ['26.40.63', 'Kansaneläkeindeksi (KEL)', 'Vastaanottotoiminnan asiakkaille maksettavat tuet', '45 890 000'],
    ['33.40.54', 'Työeläkeindeksi (TyEL)', 'Valtion osuus maatalousyrittäjien tapaturmavakuutuksen kustannuksista', '14 000 000'],
    ['30.10.42', 'TyEL/KEL', 'Luopumistuet ja -eläkkeet', '13 200 000'],
    ['29.80.30', 'Valtionosuusindeksi (VOS)', 'Valtionavustukset yleisten kirjastojen toimintaan', '9 228 000'],
    ['29.01.51', 'Kuluttajahintaindeksi (KHI)', 'Avustukset kirkolliseen ja uskonnolliseen toimintaan', '3 152 000'],
    ['28.50.16', 'Työeläkeindeksi (TyEL)', 'Ylimääräiset eläkkeet ja muut eläkemenot', '2 797 000'],
    ['33.50.50', 'Kansaneläkeindeksi (KEL)', 'Rintamalisät', '3 500 000'],
    ['33.20.55', 'Kansaneläkeindeksi (KEL)', 'Valtionosuudet Työllisyysrahastolle', '1 595 000']
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

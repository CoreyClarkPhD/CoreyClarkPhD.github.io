(function() {
    let currentChart = null;
    let currentTimeframe = '1hr';
    let metadata = null;
    let rawData = null;
    let maOptions = {
        ma1: { enabled: false, period: 7, type: 'SMA' },
        ma2: { enabled: false, period: 14, type: 'SMA' },
    };

    const maTypes = {
        SMA: { label: 'Simple Moving Average', calc: calculateSMA },
        EMA: { label: 'Exponential Moving Average', calc: calculateEMA },
    };

    function fetchData(timeframe, callback) {
        fetch(`usdc_deposit_rates_${timeframe}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                metadata = data.metadata;
                rawData = data.snapshots;
                callback(null, data.snapshots);
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error);
                callback(error, null);
            });
    }

    function calculateSMA(data, period) {
        const sma = [];
        for (let i = 0; i < data.length; i++) {
            if (i < period - 1) {
                sma.push({ x: data[i].x, y: null });
            } else {
                const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.y, 0);
                sma.push({ x: data[i].x, y: sum / period });
            }
        }
        return sma;
    }

    function calculateEMA(data, period) {
        const ema = [];
        const multiplier = 2 / (period + 1);
        for (let i = 0; i < data.length; i++) {
            if (i === 0) {
                ema.push({ x: data[i].x, y: data[i].y });
            } else {
                const prevEMA = ema[i - 1].y;
                const currentValue = data[i].y;
                const newEMA = (currentValue - prevEMA) * multiplier + prevEMA;
                ema.push({ x: data[i].x, y: newEMA });
            }
        }
        return ema;
    }

    function prepareChartData(data) {
        const chartData = data.map(item => {
            if (!item.rate) return null;
            let rawRate = parseFloat(item.rate) / 1e18;
            let annualRate = rawRate * 365 * 100;
            return { x: item.timestamp * 1000, y: annualRate };
        }).filter(item => item !== null);

        const datasets = [{
            label: `USDC Deposit Rate (APR) - ${currentTimeframe}`,
            data: chartData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 2,
            pointHoverRadius: 5
        }];

        Object.entries(maOptions).forEach(([key, option], index) => {
            if (option.enabled) {
                datasets.push({
                    label: `${option.period}-period ${option.type}`,
                    data: maTypes[option.type].calc(chartData, option.period),
                    borderColor: index === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)',
                    backgroundColor: index === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    pointRadius: 2,
                    pointHoverRadius: 5,
                    tension: 0.1,
                    fill: false
                });
            }
        });

        return datasets;
    }

    function createChart(data) {
        const datasets = prepareChartData(data);

        const ctx = document.getElementById('rateChart').getContext('2d');

        if (currentChart) {
            currentChart.destroy();
        }

        currentChart = new Chart(ctx, {
            type: 'line',
            data: { datasets },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: currentTimeframe === '24hr' ? 'day' : 'hour'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'APR (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(2) + '%';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                            }
                        }
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                                speed: 0.1,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                            drag: {
                                enabled: true,
                                backgroundColor: 'rgba(75,192,192,0.1)',
                                borderColor: 'rgb(75,192,192)',
                                borderWidth: 1,
                            },
                        },
                        limits: {
                            x: {min: 'original', max: 'original'},
                        }
                    }
                }
            }
        });
    }

    function createButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
    
        const timeframes = [
            { id: '1hr', label: '1 Hour' },
            { id: '8hr', label: '8 Hours' },
            { id: '24hr', label: '24 Hours' }
        ];
    
        timeframes.forEach(timeframe => {
            const button = document.createElement('button');
            button.textContent = timeframe.label;
            button.onclick = () => {
                currentTimeframe = timeframe.id;
                fetchData(currentTimeframe, (error, data) => {
                    if (!error && data) createChart(data);
                });
                updateButtonStyles();
            };
            button.id = timeframe.id;
            buttonContainer.appendChild(button);
        });
    
        const chartContainer = document.querySelector('.chart-container');
        chartContainer.parentNode.insertBefore(buttonContainer, chartContainer);
    
        // Add reset zoom button
        const resetZoomButton = document.createElement('button');
        resetZoomButton.id = 'resetZoom';
        resetZoomButton.textContent = 'Reset Zoom';
        resetZoomButton.onclick = () => currentChart.resetZoom();
        buttonContainer.appendChild(resetZoomButton);
    
        // Add MA toggle buttons, type dropdowns, and period inputs
        const maContainer = document.createElement('div');
        maContainer.className = 'ma-container';
    
        Object.entries(maOptions).forEach(([key, option]) => {
            const maControl = document.createElement('div');
            maControl.className = 'ma-control';
    
            const toggle = document.createElement('input');
            toggle.type = 'checkbox';
            toggle.id = `${key}Toggle`;
            toggle.className = 'ma-checkbox';
            toggle.onchange = () => {
                maOptions[key].enabled = toggle.checked;
                createChart(rawData);
            };
    
            const label = document.createElement('label');
            label.htmlFor = toggle.id;
            label.textContent = `${key.toUpperCase()}`;
    
            const typeSelect = document.createElement('select');
            typeSelect.id = `${key}Type`;
            typeSelect.className = 'ma-select';
            Object.entries(maTypes).forEach(([type, { label }]) => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = label;
                typeSelect.appendChild(option);
            });
            typeSelect.value = option.type;
            typeSelect.onchange = () => {
                maOptions[key].type = typeSelect.value;
                if (maOptions[key].enabled) {
                    createChart(rawData);
                }
            };
    
            const periodInput = document.createElement('input');
            periodInput.type = 'number';
            periodInput.id = `${key}Period`;
            periodInput.className = 'ma-input';
            periodInput.value = option.period;
            periodInput.min = 2;
            periodInput.onchange = () => {
                maOptions[key].period = parseInt(periodInput.value);
                if (maOptions[key].enabled) {
                    createChart(rawData);
                }
            };
    
            maControl.appendChild(toggle);
            maControl.appendChild(label);
            maControl.appendChild(typeSelect);
            maControl.appendChild(periodInput);
            maContainer.appendChild(maControl);
        });
    
        buttonContainer.appendChild(maContainer);
    }
    
    function updateButtonStyles() {
        const buttons = document.querySelectorAll('.button-container button');
        buttons.forEach(button => {
            if (button.id === currentTimeframe) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    function init() {
        createButtons();
        fetchData(currentTimeframe, (error, data) => {
            if (error) {
                console.error('Failed to fetch data:', error);
                return;
            }
            if (data && data.length > 0) {
                createChart(data);
                updateButtonStyles();
            } else {
                console.error('No data available to create chart');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
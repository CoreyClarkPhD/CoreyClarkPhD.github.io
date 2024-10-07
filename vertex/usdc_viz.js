(function() {
    let currentChart = null;
    let currentTimeframe = '1hr';
    let metadata = null;

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
                callback(null, data.snapshots);
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error);
                callback(error, null);
            });
    }

    function prepareChartData(data) {
        return data.map(item => {
            if (!item.rate) {
                return null;
            }

            let rawRate = parseFloat(item.rate) / 1e18; // Convert to decimal
            let annualRate = rawRate * 365 * 100; // New calculation as specified

            return {
                x: item.timestamp * 1000,
                y: annualRate
            };
        }).filter(item => item !== null);
    }

    function createChart(data) {
        const chartData = prepareChartData(data);

        const ctx = document.getElementById('rateChart').getContext('2d');

        if (currentChart) {
            currentChart.destroy();
        }

        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: `USDC Deposit Rate (APR) - ${currentTimeframe}`,
                    data: chartData,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
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
                                return `APR: ${context.parsed.y.toFixed(2)}%`;
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

        // Add reset zoom button
        let resetZoomButton = document.getElementById('resetZoom');
        if (!resetZoomButton) {
            resetZoomButton = document.createElement('button');
            resetZoomButton.id = 'resetZoom';
            resetZoomButton.textContent = 'Reset Zoom';
            const chartContainer = document.querySelector('.chart-container');
            chartContainer.appendChild(resetZoomButton);
        }
        resetZoomButton.onclick = () => {
            currentChart.resetZoom();
        };
    }

    function createButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center';
        buttonContainer.style.marginBottom = '20px';

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
            button.style.margin = '0 10px';
            button.id = timeframe.id;
            buttonContainer.appendChild(button);
        });

        const chartContainer = document.querySelector('.chart-container');
        chartContainer.parentNode.insertBefore(buttonContainer, chartContainer);
    }

    function updateButtonStyles() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.id === currentTimeframe) {
                button.style.backgroundColor = 'lightblue';
            } else {
                button.style.backgroundColor = '';
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
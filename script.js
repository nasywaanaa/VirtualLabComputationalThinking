const ctx = document.getElementById('myChart').getContext('2d');

// Membuat chart bar
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jun 12', 'Jun 13', 'Jun 14', 'Jun 15', 'Jun 16', 'Jun 17', 'Jun 18'],
        datasets: [
            {
                label: 'Correct Answer',
                data: [120, 60, 70, 50, 90, 40, 110],
                backgroundColor: '#563540',
                borderRadius: 10,
            },
            {
                label: 'Wrong Answer',
                data: [80, 70, 60, 40, 100, 60, 70],
                backgroundColor: '#a7a0a0',
                borderRadius: 10,
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += '$' + context.raw + ',00'; // Menampilkan earning dengan format dollar
                        return label;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    }
});

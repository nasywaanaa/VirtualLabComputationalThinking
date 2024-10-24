document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('tasksChart').getContext('2d');

    var tasksChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct Answer', 'Wrong Answer', 'Not Answered'],
            datasets: [{
                data: [87, 12, 4], // Data nilai untuk setiap bagian
                backgroundColor: ['#5B2245', '#AA5D71', '#C0A5A6'], // Warna untuk setiap bagian
                hoverOffset: 4 // Efek hover
            }]
        },
        options: {
            responsive: true, // Chart will be responsive
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ' : ' + tooltipItem.raw; // Menampilkan label dengan jumlah data
                        }
                    }
                }
            },
            cutout: '70%', // Membuat lingkaran dalam yang lebih besar untuk efek donat
            radius: '90%', // Mengatur radius keseluruhan donat
            elements: {
                arc: {
                    borderWidth: 2, // Mengatur lebar border di setiap slice donat
                    borderColor: '#f5f5f5' // Warna border antara setiap slice
                }
            }
        }
    });
});

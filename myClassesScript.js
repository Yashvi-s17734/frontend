window.onload = function() {
    fetch('myClassesData.json')
        .then(response => response.json())
        .then(data => {
            const subjects = data.performance.subjects;
            const marks = data.performance.marks;

            const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
            const average = totalMarks / marks.length;
            const failThreshold = 40;

            const segmentColors = marks.map(mark => {
                if (mark > average) {
                    return 'rgba(0, 153, 0, 1)'; // Green for above average
                } else if (mark < failThreshold) {
                    return 'rgba(255, 0, 0, 1)'; // Red for fail
                } else {
                    return 'rgba(255, 140, 0, 1)'; // Orange for below average
                }
            });

            var ctx = document.getElementById('myClassesChart').getContext('2d');
            var myClassesChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: subjects,
                    datasets: [{
                        label: 'Class Grades Overview',
                        data: marks,
                        borderColor: segmentColors,  // Apply segment colors to line
                        borderWidth: 4,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue for fill
                        fill: true
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                generateLabels: function(chart) {
                                    return [
                                        {
                                            text: 'Above Average (Green)',
                                            fillStyle: 'rgba(0, 153, 0, 1)',
                                            strokeStyle: 'rgba(0, 153, 0, 1)',
                                            lineWidth: 4
                                        },
                                        {
                                            text: 'Fail (Red)',
                                            fillStyle: 'rgba(255, 0, 0, 1)',
                                            strokeStyle: 'rgba(255, 0, 0, 1)',
                                            lineWidth: 4
                                        },
                                        {
                                            text: 'Below Average (Orange)',
                                            fillStyle: 'rgba(255, 140, 0, 1)',
                                            strokeStyle: 'rgba(255, 140, 0, 1)',
                                            lineWidth: 4
                                        }
                                    ];
                                }
                            }
                        }
                    },
                    elements: {
                        line: {
                            borderColor: function(context) {
                                return segmentColors[context.dataIndex];  // Line color based on segment
                            },
                            borderWidth: 4
                        },
                        point: {
                            backgroundColor: function(context) {
                                return segmentColors[context.dataIndex];  // Point color based on segment
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching the data:', error));
};

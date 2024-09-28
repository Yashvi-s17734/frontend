window.onload = function() {
    
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const months = data.performance.months; 
            const marks = data.performance.marks; 
            
        
            var ctx = document.getElementById('performanceChart').getContext('2d');
            var performanceChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months, 
                    datasets: [{
                        label: 'Student Grades',
                        data: marks, 
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: true
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

           
            loadSchedule(data.schedule);
            loadAttendanceRecords(data.attendanceRecords);
            loadAssignments(data.assignments);
            loadExams(data.exams); 
        })
        .catch(error => console.error('Error fetching the data:', error));
};

document.addEventListener('DOMContentLoaded', () => {

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadSchedule(data.schedule);
            loadAttendanceRecords(data.attendanceRecords);
            loadAssignments(data.assignments);
        })
        .catch(error => console.error('Error fetching the data:', error));
});

function loadSchedule(schedule) {
    const scheduleList = document.querySelector('.schedule-list');
    scheduleList.innerHTML = '';

    schedule.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div class="class-info">
                <h4>${item.subject}</h4>
                <p>${item.time}</p>
            </div>
            <span class="badge ${item.status === 'Present' ? 'bg-success' : 'bg-danger'}">
                ${item.status}
            </span>
        `;

        scheduleList.appendChild(li);
    });
}

function loadAttendanceRecords(attendanceRecords) {
    const attendanceTable = document.querySelector('.attendance-table tbody');
    attendanceTable.innerHTML = '';

    attendanceRecords.forEach((record) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record.subject}</td>
            <td>${record.date}</td>
            <td><span class="badge ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}">${record.status}</span></td>
        `;
        attendanceTable.appendChild(tr);
    });
}

function loadAssignments(assignments) {
    const assignmentList = document.querySelector('.assignment-list');
    assignmentList.innerHTML = '';

    assignments.forEach((assignment) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div class="assignment-info">
                <h4>${assignment.title}</h4>
                <p>Due: ${assignment.dueDate}</p>
            </div>
            <span class="badge ${assignment.status === 'Submitted' ? 'bg-success' : 'bg-warning'}">
                ${assignment.status}
            </span>
        `;
        assignmentList.appendChild(li);
    });
}

function loadExams(exams) {
    const examList = document.querySelector('.exam-list');
    examList.innerHTML = '';

    exams.forEach((exam) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div class="exam-info">
                <h4>${exam.title}</h4>
                <p>Date: ${exam.date}, Time: ${exam.time}</p>
            </div>
        `;
        examList.appendChild(li);
    });
}
const now = new Date(Date.now());
const options = { year: 'numeric', month: 'long' };
document.getElementById('date').innerHTML = now.toLocaleString(undefined, options);
// JavaScript code for search functionality
const features = [
    { name: "Working Attendance", url: "attendance.html" },
    { name: "My Classes", url: "myclasses.html" },
    { name: "Documents", url: "documents.html" },
    { name: "Messages", url: "messages.html" },
    { name: "Online Classes", url: "onlineclasses.html" },
    { name: "Schedule", url: "schedule.html" }
];

const searchInput = document.querySelector('.search-bar input');
const resultsDiv = document.getElementById('search-results');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredFeatures = features.filter(feature => feature.name.toLowerCase().includes(query));

    resultsDiv.innerHTML = ''; 
    if (filteredFeatures.length > 0 && query.length > 0) {
        resultsDiv.style.display = 'block';
        filteredFeatures.forEach(feature => {
            const link = document.createElement('a');
            link.textContent = feature.name;
            link.href = feature.url;
            
            resultsDiv.appendChild(link);
        });
    } else {
        resultsDiv.style.display = 'none';
    }
});

resultsDiv.addEventListener('mousedown', function(e) {
    e.preventDefault(); 
});

searchInput.addEventListener('blur', function() {
    setTimeout(() => resultsDiv.style.display = 'none', 200); 
});


searchInput.addEventListener('focus', function() {
    if (searchInput.value.trim().length > 0) {
        resultsDiv.style.display = 'block';
    }
});
const username = localStorage.getItem('username');
const userGreeting = document.getElementById('userGreeting');

// Update user info section with retrieved data
if (username) {
    userGreeting.textContent = Hi, `${username}!`;
} else {
    userGreeting.textContent = 'Hi, User!';
}

// Log out button click event
document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'logout.html'; // Redirect to logout page
});


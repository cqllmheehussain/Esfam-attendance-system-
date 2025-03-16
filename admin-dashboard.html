<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ESFAM Admin Dashboard</title>

    <!-- Include Firebase and Firestore -->
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"></script>

    <style>
        /* Admin Dashboard Styles */
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #003366;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .filters {
            display: flex;
            justify-content: space-between;
            margin: 20px;
            padding: 10px;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border-radius: 5px;
        }

        .filters select {
            padding: 10px;
            font-size: 1rem;
            border-radius: 5px;
            border: 1px solid #ccc;
            outline: none;
            cursor: pointer;
        }

        .filters select:focus {
            border-color: #003366;
        }

        table {
            width: 100%;
            margin: 20px 0;
            border-collapse: collapse;
        }

        table th, table td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
        }

        table th {
            background-color: #003366;
            color: white;
        }

        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        button {
            background-color: #003366;
            color: white;
            border: none;
            padding: 8px 15px;
            cursor: pointer;
            border-radius: 5px;
            text-align: center;
        }

        button:hover {
            background-color: #002244;
        }

    </style>
</head>
<body>
    <header>
        <h1>Admin Dashboard - ESFAM Attendance System</h1>
    </header>

    <div class="filters">
        <select id="filter-department">
            <option>All Departments</option>
        </select>
        <select id="filter-level">
            <option>All Levels</option>
        </select>
    </div>

    <table id="attendance-table">
        <thead>
            <tr>
                <th>Matric Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Level</th>
                <th>Attendance Percentage</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Dynamic student rows will go here -->
        </tbody>
    </table>

    <script>
        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        let allStudents = [];
        let currentFilters = {
            department: 'All Departments',
            level: 'All Levels'
        };

        // Event Listeners for Filters
        document.getElementById('filter-department').addEventListener('change', updateFilters);
        document.getElementById('filter-level').addEventListener('change', updateFilters);

        // Load Reports and Apply Filters
        async function updateFilters() {
            currentFilters = {
                department: document.getElementById('filter-department').value,
                level: document.getElementById('filter-level').value
            };
            await applyFilters();
        }

        // Fetch Students and Attendance Data
        async function loadReports() {
            try {
                const snapshot = await db.collection('students').get();
                allStudents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                populateFilters(); // Dynamically populate filters
                await applyFilters(); // Apply filters on initial load
            } catch (error) {
                console.error("Error loading reports:", error);
                alert("Failed to load student data. Please try again.");
            }
        }

        // Filter Data and Update Table
        async function applyFilters() {
            try {
                const filteredStudents = allStudents.filter(student => {
                    return (currentFilters.department === 'All Departments' || student.department === currentFilters.department) &&
                           (currentFilters.level === 'All Levels' || student.level === currentFilters.level);
                });

                await populateTable(filteredStudents);
            } catch (error) {
                console.error("Error applying filters:", error);
            }
        }

        // Populate Table with Attendance Data
        async function populateTable(students) {
            const tbody = document.querySelector('#attendance-table tbody');
            tbody.innerHTML = ''; // Clear previous entries

            const attendancePromises = students.map(async student => {
                const attendanceSnapshot = await db.collection('attendance')
                    .where('matric', '==', student.id)
                    .get();

                const attendancePercentage = ((attendanceSnapshot.size / 90) * 100).toFixed(1); // 90-day semester

                return `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.department}</td>
                        <td>${student.level}</td>
                        <td>${attendancePercentage}%</td>
                        <td><button onclick="viewDetails('${student.id}')">View Details</button></td>
                    </tr>
                `;
            });

            // Wait for all attendance data to be retrieved before updating the DOM
            const rows = await Promise.all(attendancePromises);
            tbody.innerHTML = rows.join('');
        }

        // Dynamically Populate Filters (Departments & Levels)
        function populateFilters() {
            const deptFilter = document.getElementById('filter-department');
            const levelFilter = document.getElementById('filter-level');

            const departments = [...new Set(allStudents.map(student => student.department))];
            const levels = [...new Set(allStudents.map(student => student.level))];

            deptFilter.innerHTML = `<option>All Departments</option>${departments.map(dept => `<option>${dept}</option>`).join('')}`;
            levelFilter.innerHTML = `<option>All Levels</option>${levels.map(level => `<option>${level}</option>`).join('')}`;
        }

        // View Student Details (for future implementation)
        function viewDetails(studentId) {
            alert(`View details for student with ID: ${studentId}`);
        }

        // Load the reports when the page loads
        window.onload = loadReports;
    </script>
</body>
</html>

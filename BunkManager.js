let attendedCount = 0;
let bunkedCount = 0;
let goal = 5;

// Function to load stored data
function loadData() {
    attendedCount = parseInt(localStorage.getItem('attendedCount')) || 0;
    bunkedCount = parseInt(localStorage.getItem('bunkedCount')) || 0;
    goal = parseInt(localStorage.getItem('goal')) || 65;
    document.getElementById('attended').innerText = attendedCount;
    document.getElementById('bunked').innerText = bunkedCount;
    document.getElementById('goal').innerText = goal + "%";
    document.getElementById('attendedCount').innerText = attendedCount;
    document.getElementById('bunkedCount').innerText = bunkedCount;
    updateAttendance();
}

// Function to update attendance data
function updateAttendance() {
    const totalClasses = attendedCount + bunkedCount;
    const attendancePercent = totalClasses === 0 ? 0 : (attendedCount / totalClasses) * 100;
    document.getElementById('attendancePercent').innerText = attendancePercent.toFixed(1) + '%';

    const requiredAttendance = (goal / 100) * totalClasses;
    const bunksAvailable = Math.floor(attendedCount - requiredAttendance);
    document.getElementById('bunksAvailable').innerText = bunksAvailable < 0 ? 0 : bunksAvailable;

    if (bunksAvailable < 0) {
        document.getElementById('noteText').innerText = "Note: You cannot miss the next class";
    } else {
        document.getElementById('noteText').innerText = "You have " + bunksAvailable + " bunks available";
    }

    // Store data
    localStorage.setItem('attendedCount', attendedCount);
    localStorage.setItem('bunkedCount', bunkedCount);
    localStorage.setItem('goal', goal);
}

// Event listeners for increasing/decreasing attendance and bunked counts
document.getElementById('increaseAttended').addEventListener('click', () => {
    attendedCount++;
    document.getElementById('attended').innerText = attendedCount;
    document.getElementById('attendedCount').innerText = attendedCount;
    updateAttendance();
});

document.getElementById('decreaseAttended').addEventListener('click', () => {
    if (attendedCount > 0) {
        attendedCount--;
        document.getElementById('attended').innerText = attendedCount;
        document.getElementById('attendedCount').innerText = attendedCount;
        updateAttendance();
    }
});

document.getElementById('increaseBunked').addEventListener('click', () => {
    bunkedCount++;
    document.getElementById('bunked').innerText = bunkedCount;
    document.getElementById('bunkedCount').innerText = bunkedCount;
    updateAttendance();
});

document.getElementById('decreaseBunked').addEventListener('click', () => {
    if (bunkedCount > 0) {
        bunkedCount--;
        document.getElementById('bunked').innerText = bunkedCount;
        document.getElementById('bunkedCount').innerText = bunkedCount;
        updateAttendance();
    }
});

// Goal edit functionality
document.getElementById('goalCard').addEventListener('click', () => {
    document.getElementById('goalModal').style.display = 'flex';
});

document.getElementById('saveGoal').addEventListener('click', () => {
    const newGoal = parseInt(document.getElementById('goalInput').value);
    if (newGoal >= 0 && newGoal <= 100) {
        goal = newGoal;
        document.getElementById('goal').innerText = goal + "%";
        updateAttendance();
        document.getElementById('goalModal').style.display = 'none';
    } else {
        alert("Please enter a valid goal between 0 and 100.");
    }
});

// Close goal modal on outside click
document.getElementById('goalModal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('goalModal')) {
        document.getElementById('goalModal').style.display = 'none';
    }
});

// Load initial data
loadData();

// DOM Elements
const examForm = document.getElementById('examForm');
const resultCard = document.getElementById('result');
const errorCard = document.getElementById('error');
const scheduleTableBody = document.getElementById('scheduleTableBody');
const scheduleTable = document.getElementById('scheduleTable');
const toggleScheduleBtn = document.getElementById('toggleSchedule');
const searchBtn = document.querySelector('.search-btn');

// API Base URL
const API_BASE_URL = window.location.origin;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    examForm.addEventListener('submit', handleFormSubmit);
    toggleScheduleBtn.addEventListener('click', toggleSchedule);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(examForm);
    const subject = formData.get('subject');
    const gender = formData.get('gender');
    const section = formData.get('section');
    
    if (!subject || !gender || !section) {
        showError('Please fill in all fields');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        const result = await findExamDay(subject, gender, section);
        showResult(result);
    } catch (error) {
        showError(error.message || 'An error occurred while searching');
    } finally {
        setLoadingState(false);
    }
}

// API call to find exam day
async function findExamDay(subject, gender, section) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/find-day`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, gender, section })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to find exam day');
        }
        
        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('Network error. Please check your connection.');
        }
        throw error;
    }
}

// Show result
function showResult(result) {
    // Hide error card if visible
    errorCard.style.display = 'none';
    
    // Populate result fields
    document.getElementById('resultSubject').textContent = result.subject;
    document.getElementById('resultGender').textContent = result.gender === 'M' ? 'Male' : 'Female';
    document.getElementById('resultSection').textContent = `Section ${result.section}`;
    document.getElementById('resultDay').textContent = result.day;
    
    // Show result card
    resultCard.style.display = 'block';
    
    // Scroll to result
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show error
function showError(message) {
    // Hide result card if visible
    resultCard.style.display = 'none';
    
    // Set error message
    document.getElementById('errorMessage').textContent = message;
    
    // Show error card
    errorCard.style.display = 'block';
    
    // Scroll to error
    errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Set loading state
function setLoadingState(loading) {
    if (loading) {
        searchBtn.disabled = true;
        searchBtn.classList.add('loading');
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    } else {
        searchBtn.disabled = false;
        searchBtn.classList.remove('loading');
        searchBtn.innerHTML = '<i class="fas fa-search"></i> Find Exam Day';
    }
}

// Toggle schedule table visibility
async function toggleSchedule() {
    if (scheduleTable.style.display === 'none') {
        // Show schedule and load data if not already loaded
        if (scheduleTableBody.children.length === 0) {
            await loadScheduleTable();
        }
        scheduleTable.style.display = 'block';
        toggleScheduleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Complete Schedule';
        toggleScheduleBtn.style.background = 'rgba(255,255,255,0.3)';
    } else {
        // Hide schedule
        scheduleTable.style.display = 'none';
        toggleScheduleBtn.innerHTML = '<i class="fas fa-table"></i> Show Complete Schedule';
        toggleScheduleBtn.style.background = 'rgba(255,255,255,0.2)';
    }
}

// Load schedule table
async function loadScheduleTable() {
    try {
        setLoadingState(true);
        const response = await fetch(`${API_BASE_URL}/api/schedule`);
        if (!response.ok) {
            throw new Error('Failed to load schedule');
        }
        
        const schedule = await response.json();
        populateScheduleTable(schedule);
    } catch (error) {
        console.error('Error loading schedule:', error);
        scheduleTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #666;">Failed to load schedule</td></tr>';
    } finally {
        setLoadingState(false);
    }
}

// Populate schedule table
function populateScheduleTable(schedule) {
    scheduleTableBody.innerHTML = '';
    
    schedule.forEach(exam => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exam.subject}</td>
            <td>${exam.gender === 'M' ? 'Male' : 'Female'}</td>
            <td>Section ${exam.section}</td>
            <td><strong>${exam.day}</strong></td>
        `;
        scheduleTableBody.appendChild(row);
    });
}

// Utility function to format gender display
function formatGender(gender) {
    return gender === 'M' ? 'Male' : 'Female';
}

// Utility function to format section display
function formatSection(section) {
    return `Section ${section}`;
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click to copy functionality for exam days
    const dayCells = document.querySelectorAll('tbody td:last-child');
    dayCells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.title = 'Click to copy day';
        
        cell.addEventListener('click', function() {
            const day = this.textContent;
            navigator.clipboard.writeText(day).then(() => {
                // Show temporary feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.color = '#28a745';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.color = '';
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        examForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        examForm.reset();
        resultCard.style.display = 'none';
        errorCard.style.display = 'none';
    }
});

// Add form validation feedback
const formInputs = document.querySelectorAll('.form-group select');
formInputs.forEach(input => {
    input.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#28a745';
            this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        } else {
            this.style.borderColor = '#e1e5e9';
            this.style.boxShadow = 'none';
        }
    });
});

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Export functions for potential external use
window.ExamDatesApp = {
    findExamDay,
    showResult,
    showError,
    loadScheduleTable
};

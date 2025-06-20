// Programs Data - Now loaded from Supabase
let programsData = [];

// DOM Elements
let programsGrid, filterButtons, modal, closeBtn;

// Current filter
let currentFilter = 'all';

// Initialize programs page
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Supabase to be ready
    if (window.supabaseService) {
        initializePrograms();
    } else {
        window.onFirebaseReady = initializePrograms;
    }
});

function initializePrograms() {
    // Get DOM elements
    programsGrid = document.getElementById('programsGrid');
    filterButtons = document.querySelectorAll('.filter-btn');
    modal = document.getElementById('programModal');
    closeBtn = document.querySelector('.close');

    loadProgramsFromSupabase();
    setupEventListeners();
    setupRealTimeListener();
}

// Load programs from Supabase
async function loadProgramsFromSupabase() {
    try {
        programsData = await window.supabaseService.getPrograms();
        loadPrograms();
    } catch (error) {
        console.error('Error loading programs from Supabase:', error);
        // Fallback to empty array
        programsData = [];
        loadPrograms();
    }
}

// Setup real-time listener for programs
function setupRealTimeListener() {
    if (window.supabaseService) {
        window.supabaseService.onProgramsChange((programs) => {
            programsData = programs;
            loadPrograms();
        });
    }
}

// Load programs based on current filter
function loadPrograms() {
    if (!programsGrid) return;
    
    programsGrid.innerHTML = '';
    
    const filteredPrograms = currentFilter === 'all' 
        ? programsData 
        : programsData.filter(program => program.category === currentFilter);
    
    filteredPrograms.forEach(program => {
        const programCard = createProgramCard(program);
        programsGrid.appendChild(programCard);
    });
}

// Create program card element
function createProgramCard(program) {
    const card = document.createElement('div');
    card.className = 'program-card';
    card.setAttribute('data-id', program.id);
    
    const statusClass = program.status === 'upcoming' ? 'upcoming' : 
                       program.status === 'ongoing' ? 'ongoing' : 'completed';
    
    card.innerHTML = `
        <div class="program-image">
            <img src="${program.image}" alt="${program.title}" loading="lazy">
            <div class="program-category">${program.category.charAt(0).toUpperCase() + program.category.slice(1)}</div>
        </div>
        <div class="program-content">
            <h3 class="program-title">${program.title}</h3>
            <p class="program-description">${program.description}</p>
            <div class="program-details">
                <span class="program-date">${formatDate(program.date)}</span>
                <span class="program-status ${statusClass}">${program.status.charAt(0).toUpperCase() + program.status.slice(1)}</span>
            </div>
            <div class="program-actions">
                <button class="btn btn-primary" onclick="viewProgram('${program.id}')">View Details</button>
                <button class="btn btn-secondary" onclick="registerProgram('${program.id}')">Register</button>
            </div>
        </div>
    `;
    
    return card;
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            setActiveFilter(filter);
        });
    });
    
    // Modal close
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Set active filter
function setActiveFilter(filter) {
    currentFilter = filter;
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    loadPrograms();
}

// View program details
function viewProgram(programId) {
    const program = programsData.find(p => p.id === programId);
    if (!program || !modal) return;
    
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${program.title}</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-main">
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${program.image}" alt="${program.title}">
                </div>
                <div class="modal-info">
                    <div class="info-row">
                        <span class="label">Category:</span>
                        <span class="value">${program.category.charAt(0).toUpperCase() + program.category.slice(1)}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Date:</span>
                        <span class="value">${formatDate(program.date)}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Time:</span>
                        <span class="value">${program.time}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Location:</span>
                        <span class="value">${program.location}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Status:</span>
                        <span class="value status-${program.status}">${program.status.charAt(0).toUpperCase() + program.status.slice(1)}</span>
                    </div>
                </div>
                <div class="modal-description">
                    <h3>Description</h3>
                    <p>${program.longDescription}</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" onclick="registerProgram('${program.id}')">Register Now</button>
            <button class="btn btn-secondary" onclick="shareProgram('${program.id}')">Share</button>
        </div>
    `;
    
    modal.classList.add('open');
    modal.style.display = 'flex';
    // Re-attach close event listener
    const newCloseBtn = modalContent.querySelector('.close');
    newCloseBtn.addEventListener('click', closeModal);
}

// Close modal
function closeModal() {
    if (modal) {
        modal.classList.remove('open');
        modal.style.display = 'none';
    }
}

// Register for program
function registerProgram(programId) {
    const program = programsData.find(p => p.id === programId);
    if (!program) return;
    
    alert(`Registration for "${program.title}" will be available soon!`);
    // Here you can implement actual registration logic
}

// Share program
function shareProgram(programId) {
    const program = programsData.find(p => p.id === programId);
    if (!program) return;
    
    const shareData = {
        title: program.title,
        text: program.description,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`${program.title}: ${program.description}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
}

// Add new program (for admin use)
async function addProgram(programData) {
    try {
        const newId = await window.supabaseService.addProgram(programData);
        console.log('Program added successfully with ID:', newId);
        return newId;
    } catch (error) {
        console.error('Error adding program:', error);
        throw error;
    }
}

// Update program (for admin use)
async function updateProgram(programId, programData) {
    try {
        await window.supabaseService.updateProgram(programId, programData);
        console.log('Program updated successfully');
    } catch (error) {
        console.error('Error updating program:', error);
        throw error;
    }
}

// Delete program (for admin use)
async function deleteProgram(programId) {
    try {
        await window.supabaseService.deleteProgram(programId);
        console.log('Program deleted successfully');
    } catch (error) {
        console.error('Error deleting program:', error);
        throw error;
    }
}

// Make functions globally available
window.viewProgram = viewProgram;
window.registerProgram = registerProgram;
window.shareProgram = shareProgram;
window.addProgram = addProgram;
window.updateProgram = updateProgram;
window.deleteProgram = deleteProgram; 
// Admin Panel JavaScript - Non-module version

// DOM Elements
let programsForm, publicationsForm, programsList, publicationsList, tabButtons, tabContents;

// Initialize admin page
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Supabase to be ready
    if (window.supabaseService) {
        initializeAdmin();
    } else {
        window.onFirebaseReady = initializeAdmin;
    }
});

function initializeAdmin() {
    // Get DOM elements
    programsForm = document.getElementById('programsForm');
    publicationsForm = document.getElementById('publicationsForm');
    programsList = document.getElementById('programsList');
    publicationsList = document.getElementById('publicationsList');
    tabButtons = document.querySelectorAll('.tab-btn');
    tabContents = document.querySelectorAll('.tab-content');

    setupEventListeners();
    loadData();
    setupRealTimeListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            switchTab(target);
        });
    });
    
    // Form submissions
    if (programsForm) {
        programsForm.addEventListener('submit', handleProgramSubmit);
    }
    if (publicationsForm) {
        publicationsForm.addEventListener('submit', handlePublicationSubmit);
    }
}

// Switch between tabs
function switchTab(target) {
    // Update active tab button
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-target') === target) {
            btn.classList.add('active');
        }
    });
    
    // Show target content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
            content.classList.add('active');
        }
    });
}

// Load initial data
async function loadData() {
    await loadPrograms();
    await loadPublications();
}

// Setup real-time listeners
function setupRealTimeListeners() {
    if (window.supabaseService) {
        window.supabaseService.onProgramsChange((programs) => {
            displayPrograms(programs);
        });
        
        window.supabaseService.onPublicationsChange((publications) => {
            displayPublications(publications);
        });
    }
}

// Load programs
async function loadPrograms() {
    try {
        if (!window.supabaseService) {
            console.log('Supabase service not ready yet');
            return;
        }
        const programs = await window.supabaseService.getPrograms();
        displayPrograms(programs);
    } catch (error) {
        console.error('Error loading programs:', error);
        showNotification('Error loading programs', 'error');
    }
}

// Display programs in the list
function displayPrograms(programs) {
    if (!programsList) return;
    
    programsList.innerHTML = '';
    
    programs.forEach(program => {
        const programItem = createProgramItem(program);
        programsList.appendChild(programItem);
    });
}

// Create program list item
function createProgramItem(program) {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
        <div class="item-info">
            <h4>${program.title}</h4>
            <p>${program.category} • ${formatDate(program.date)}</p>
        </div>
        <div class="item-actions">
            <button class="btn btn-small btn-edit" onclick="editProgram('${program.id}')">Edit</button>
            <button class="btn btn-small btn-delete" onclick="deleteProgram('${program.id}')">Delete</button>
        </div>
    `;
    return item;
}

// Load publications
async function loadPublications() {
    try {
        if (!window.supabaseService) {
            console.log('Supabase service not ready yet');
            return;
        }
        const publications = await window.supabaseService.getPublications();
        displayPublications(publications);
    } catch (error) {
        console.error('Error loading publications:', error);
        showNotification('Error loading publications', 'error');
    }
}

// Display publications in the list
function displayPublications(publications) {
    if (!publicationsList) return;
    
    publicationsList.innerHTML = '';
    
    publications.forEach(publication => {
        const publicationItem = createPublicationItem(publication);
        publicationsList.appendChild(publicationItem);
    });
}

// Create publication list item
function createPublicationItem(publication) {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
        <div class="item-info">
            <h4>${publication.title}</h4>
            <p>${publication.category} • ${publication.author} • ${formatDate(publication.date)}</p>
        </div>
        <div class="item-actions">
            <button class="btn btn-small btn-edit" onclick="editPublication('${publication.id}')">Edit</button>
            <button class="btn btn-small btn-delete" onclick="deletePublication('${publication.id}')">Delete</button>
        </div>
    `;
    return item;
}

// Handle program form submission
async function handleProgramSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(programsForm);
    const programData = {
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        longDescription: formData.get('longDescription'),
        image: formData.get('image'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        status: formData.get('status')
    };
    
    try {
        await window.supabaseService.addProgram(programData);
        programsForm.reset();
        showNotification('Program added successfully!', 'success');
    } catch (error) {
        console.error('Error adding program:', error);
        showNotification('Error adding program', 'error');
    }
}

// Handle publication form submission
async function handlePublicationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(publicationsForm);
    const publicationData = {
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        abstract: formData.get('abstract'),
        content: formData.get('content'),
        author: formData.get('author'),
        type: formData.get('type'),
        image: formData.get('image'),
        fileUrl: formData.get('fileUrl'),
        downloadUrl: formData.get('downloadUrl'),
        date: formData.get('date')
    };
    
    try {
        await window.supabaseService.addPublication(publicationData);
        publicationsForm.reset();
        showNotification('Publication added successfully!', 'success');
    } catch (error) {
        console.error('Error adding publication:', error);
        showNotification('Error adding publication', 'error');
    }
}

// Edit program
async function editProgram(programId) {
    try {
        const programs = await window.supabaseService.getPrograms();
        const program = programs.find(p => p.id === programId);
        if (!program) return;
        
        // Populate form with program data
        document.getElementById('programTitle').value = program.title;
        document.getElementById('programCategory').value = program.category;
        document.getElementById('programDescription').value = program.description;
        document.getElementById('programLongDescription').value = program.longDescription;
        document.getElementById('programImage').value = program.image;
        document.getElementById('programDate').value = program.date;
        document.getElementById('programTime').value = program.time;
        document.getElementById('programLocation').value = program.location;
        document.getElementById('programStatus').value = program.status;
        
        // Change form to update mode
        programsForm.setAttribute('data-edit-id', programId);
        document.querySelector('#programsForm .btn-primary').textContent = 'Update Program';
        
        showNotification('Program loaded for editing', 'info');
    } catch (error) {
        console.error('Error loading program for editing:', error);
        showNotification('Error loading program', 'error');
    }
}

// Edit publication
async function editPublication(publicationId) {
    try {
        const publications = await window.supabaseService.getPublications();
        const publication = publications.find(p => p.id === publicationId);
        if (!publication) return;
        
        // Populate form with publication data
        document.getElementById('publicationTitle').value = publication.title;
        document.getElementById('publicationCategory').value = publication.category;
        document.getElementById('publicationDescription').value = publication.description;
        document.getElementById('publicationAbstract').value = publication.abstract;
        document.getElementById('publicationContent').value = publication.content;
        document.getElementById('publicationAuthor').value = publication.author;
        document.getElementById('publicationType').value = publication.type;
        document.getElementById('publicationImage').value = publication.image;
        document.getElementById('publicationFileUrl').value = publication.fileUrl;
        document.getElementById('publicationDownloadUrl').value = publication.downloadUrl;
        document.getElementById('publicationDate').value = publication.date;
        
        // Change form to update mode
        publicationsForm.setAttribute('data-edit-id', publicationId);
        document.querySelector('#publicationsForm .btn-primary').textContent = 'Update Publication';
        
        showNotification('Publication loaded for editing', 'info');
    } catch (error) {
        console.error('Error loading publication for editing:', error);
        showNotification('Error loading publication', 'error');
    }
}

// Delete program
async function deleteProgram(programId) {
    if (!confirm('Are you sure you want to delete this program?')) return;
    
    try {
        await window.supabaseService.deleteProgram(programId);
        showNotification('Program deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting program:', error);
        showNotification('Error deleting program', 'error');
    }
}

// Delete publication
async function deletePublication(publicationId) {
    if (!confirm('Are you sure you want to delete this publication?')) return;
    
    try {
        await window.supabaseService.deletePublication(publicationId);
        showNotification('Publication deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting publication:', error);
        showNotification('Error deleting publication', 'error');
    }
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Make functions globally available
window.editProgram = editProgram;
window.editPublication = editPublication;
window.deleteProgram = deleteProgram;
window.deletePublication = deletePublication;

// Diagnostic function
window.runDiagnostic = async function() {
    console.log('Running diagnostic...');
    
    if (window.diagnoseSupabase) {
        await window.diagnoseSupabase();
    } else {
        console.log('Diagnostic function not available');
    }
    
    // Test basic operations
    try {
        console.log('Testing basic operations...');
        
        if (window.supabaseService) {
            console.log('✅ Supabase service is available');
            
            // Test getting programs
            try {
                const programs = await window.supabaseService.getPrograms();
                console.log('✅ Get programs works:', programs.length, 'programs found');
            } catch (error) {
                console.error('❌ Get programs failed:', error);
            }
            
            // Test getting publications
            try {
                const publications = await window.supabaseService.getPublications();
                console.log('✅ Get publications works:', publications.length, 'publications found');
            } catch (error) {
                console.error('❌ Get publications failed:', error);
            }
        } else {
            console.error('❌ Supabase service is not available');
        }
    } catch (error) {
        console.error('Diagnostic failed:', error);
    }
    
    showNotification('Diagnostic complete - check console for details', 'info');
};
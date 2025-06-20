// Publications Data - Now loaded from Supabase
let publicationsData = [];

// DOM Elements
let publicationsGrid, filterButtons, modal, closeBtn;

// Current filter
let currentFilter = 'all';

// Initialize publications page
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Supabase to be ready
    if (window.supabaseService) {
        initializePublications();
    } else {
        window.onFirebaseReady = initializePublications;
    }
});

function initializePublications() {
    // Get DOM elements
    publicationsGrid = document.getElementById('publicationsGrid');
    filterButtons = document.querySelectorAll('.filter-btn');
    modal = document.getElementById('publicationModal');
    closeBtn = document.querySelector('.close');

    loadPublicationsFromSupabase();
    setupEventListeners();
    setupRealTimeListener();
}

// Load publications from Supabase
async function loadPublicationsFromSupabase() {
    try {
        publicationsData = await window.supabaseService.getPublications();
        loadPublications();
    } catch (error) {
        console.error('Error loading publications from Supabase:', error);
        // Fallback to empty array
        publicationsData = [];
        loadPublications();
    }
}

// Setup real-time listener for publications
function setupRealTimeListener() {
    if (window.supabaseService) {
        window.supabaseService.onPublicationsChange((publications) => {
            publicationsData = publications;
            loadPublications();
        });
    }
}

// Load publications based on current filter
function loadPublications() {
    if (!publicationsGrid) return;
    
    publicationsGrid.innerHTML = '';
    
    const filteredPublications = currentFilter === 'all' 
        ? publicationsData 
        : publicationsData.filter(publication => publication.category === currentFilter);
    
    filteredPublications.forEach(publication => {
        const publicationCard = createPublicationCard(publication);
        publicationsGrid.appendChild(publicationCard);
    });
}

// Create publication card element
function createPublicationCard(publication) {
    const card = document.createElement('div');
    card.className = 'publication-card';
    card.setAttribute('data-id', publication.id);
    
    card.innerHTML = `
        <div class="publication-image">
            <img src="${publication.image}" alt="${publication.title}" loading="lazy">
            <div class="publication-category">${publication.category.charAt(0).toUpperCase() + publication.category.slice(1)}</div>
        </div>
        <div class="publication-content">
            <h3 class="publication-title">${publication.title}</h3>
            <p class="publication-description">${publication.description}</p>
            <div class="publication-details">
                <span class="publication-date">${formatDate(publication.date)}</span>
                <span class="publication-author">By ${publication.author}</span>
            </div>
            <div class="publication-actions">
                <button class="btn btn-primary" onclick="viewPublication('${publication.id}')">Read More</button>
                <button class="btn btn-secondary" onclick="downloadPublication('${publication.id}')">Download</button>
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
    
    loadPublications();
}

// View publication details
function viewPublication(publicationId) {
    const publication = publicationsData.find(p => p.id === publicationId);
    if (!publication || !modal) return;
    
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${publication.title}</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-main">
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${publication.image}" alt="${publication.title}">
                </div>
                <div class="modal-info">
                    <div class="info-row">
                        <span class="label">Category:</span>
                        <span class="value">${publication.category.charAt(0).toUpperCase() + publication.category.slice(1)}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Date:</span>
                        <span class="value">${formatDate(publication.date)}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Author:</span>
                        <span class="value">${publication.author}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Type:</span>
                        <span class="value">${publication.type}</span>
                    </div>
                </div>
                <div class="modal-description">
                    <h3>Abstract</h3>
                    <p>${publication.abstract}</p>
                    <h3>Content</h3>
                    <div class="publication-content-text">${publication.content}</div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" onclick="downloadPublication('${publication.id}')">Download PDF</button>
            <button class="btn btn-secondary" onclick="sharePublication('${publication.id}')">Share</button>
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

// Download publication
function downloadPublication(publicationId) {
    const publication = publicationsData.find(p => p.id === publicationId);
    if (!publication) return;
    
    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = publication.downloadUrl || publication.fileUrl;
    link.download = `${publication.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Share publication
function sharePublication(publicationId) {
    const publication = publicationsData.find(p => p.id === publicationId);
    if (!publication) return;
    
    const shareData = {
        title: publication.title,
        text: publication.description,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`${publication.title}: ${publication.description}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
}

// Make functions globally available
window.viewPublication = viewPublication;
window.downloadPublication = downloadPublication;
window.sharePublication = sharePublication; 
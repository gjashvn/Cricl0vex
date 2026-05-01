const linkForm       = document.getElementById('linkForm');
const linksContainer = document.getElementById('linksContainer');
const formPanel      = document.getElementById('formPanel');
const toggleIcon     = document.getElementById('toggleIcon');
const toggleText     = document.getElementById('toggleText');
const linkCountLabel = document.getElementById('linkCount');

// ── Predefined WhatsApp number (country code + number, no spaces or +) ──
const WA_NUMBER = '918597849566';

let savedLinks = JSON.parse(localStorage.getItem('vaultPages')) || [];

// ── Toggle form panel ──────────────────────────────────────────────────────
function toggleVault() {
    const isCollapsed = formPanel.classList.toggle('collapsed');
    toggleText.innerText = isCollapsed ? 'Open Editor' : 'Close Editor';
    toggleIcon.className = isCollapsed ? 'fas fa-plus' : 'fas fa-times';
}

// ── Render all saved cards ─────────────────────────────────────────────────
function displayLinks() {
    linksContainer.innerHTML = '';
    linkCountLabel.innerText = savedLinks.length;

    if (savedLinks.length === 0) {
        linksContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>No pages saved yet. Open the editor to add one!</p>
            </div>`;
        return;
    }

    savedLinks.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <div class="page-name">${item.pageName}</div>
                <div class="followers-badge"><i class="fas fa-users"></i> ${item.followers}</div>
            </div>
            <div class="card-links">
                <a href="${item.pageLink}" target="_blank" class="link-row">
                    <i class="fas fa-link"></i>
                    <span>Page Link</span>
                    <i class="fas fa-external-link-alt link-arrow"></i>
                </a>
                <a href="${item.reelLink}" target="_blank" class="link-row reel">
                    <i class="fas fa-film"></i>
                    <span>1st Reel</span>
                    <i class="fas fa-external-link-alt link-arrow"></i>
                </a>
            </div>
            <div class="card-footer">
                <button onclick="shareCard(${index})" class="icon-btn wa-share" title="Send to WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </button>
                <div>
                    <button onclick="editLink(${index})" class="icon-btn" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteLink(${index})" class="icon-btn delete" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        linksContainer.appendChild(card);
    });
}

// ── Build WhatsApp message: all fields ───────────────────────────────────
function buildWAMessage(pageName, pageLink, followers, reelLink) {
    return `*Page Name* - ${pageName}\n*Page Link* - ${pageLink}\n*Followers* - ${followers}\n*1st Reel Link* - ${reelLink}`;
}

// ── Send from form (uses predefined WA number) ────────────────────────────
function sendToWhatsApp() {
    const pageName  = document.getElementById('pageName').value.trim();
    const pageLink  = document.getElementById('pageLink').value.trim();
    const followers = document.getElementById('followers').value.trim();
    const reelLink  = document.getElementById('reelLink').value.trim();

    if (!pageName || !pageLink || !followers || !reelLink) {
        alert('Please fill in all fields before sending to WhatsApp.');
        return;
    }

    const msg = buildWAMessage(pageName, pageLink, followers, reelLink);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── Share a saved card via WhatsApp ───────────────────────────────────────
window.shareCard = (index) => {
    const item = savedLinks[index];
    const msg  = buildWAMessage(item.pageName, item.pageLink, item.followers, item.reelLink);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

// ── Save / Update on form submit ──────────────────────────────────────────
linkForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const pageName  = document.getElementById('pageName').value.trim();
    const followers = document.getElementById('followers').value.trim();
    const pageLink  = document.getElementById('pageLink').value.trim();
    const reelLink  = document.getElementById('reelLink').value.trim();
    const editIndex = document.getElementById('editIndex').value;

    const entry = { pageName, followers, pageLink, reelLink };

    if (editIndex === '') {
        savedLinks.unshift(entry);
    } else {
        savedLinks[editIndex] = entry;
        document.getElementById('editIndex').value = '';
    }

    localStorage.setItem('vaultPages', JSON.stringify(savedLinks));

    // Auto-send to WhatsApp on every save
    const msg = buildWAMessage(pageName, pageLink, followers, reelLink);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');

    linkForm.reset();
    displayLinks();
    toggleVault();
});

// ── Delete ────────────────────────────────────────────────────────────────
window.deleteLink = (index) => {
    if (confirm('Delete this page entry?')) {
        savedLinks.splice(index, 1);
        localStorage.setItem('vaultPages', JSON.stringify(savedLinks));
        displayLinks();
    }
};

// ── Edit ──────────────────────────────────────────────────────────────────
window.editLink = (index) => {
    const item = savedLinks[index];
    document.getElementById('pageName').value  = item.pageName;
    document.getElementById('followers').value = item.followers;
    document.getElementById('pageLink').value  = item.pageLink;
    document.getElementById('reelLink').value  = item.reelLink;
    document.getElementById('editIndex').value = index;
    if (formPanel.classList.contains('collapsed')) toggleVault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Init ──────────────────────────────────────────────────────────────────
displayLinks();

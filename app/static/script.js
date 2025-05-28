// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadCard = document.getElementById('uploadCard');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const detectBtn = document.getElementById('detectBtn');
const detectForm = document.getElementById('detectForm');
const loading = document.getElementById('loading');
const resultSection = document.getElementById('resultSection');

fileInput.addEventListener('change', handleFileChange);

function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) {
            alert('Ukuran file terlalu besar. Maksimal 10MB.');
            return;
        }
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewContainer.classList.add('show');
            detectBtn.classList.add('show');
            const uploadText = uploadCard.querySelector('.upload-text');
            const uploadSubtext = uploadCard.querySelector('.upload-subtext');
            uploadText.textContent = 'Gambar berhasil dipilih';
            uploadSubtext.textContent = 'Klik "Mulai Deteksi" untuk menganalisis';
        };
        reader.readAsDataURL(file);
    }
}

uploadCard.addEventListener('dragover', e => {
    e.preventDefault();
    uploadCard.classList.add('dragover');
});
uploadCard.addEventListener('dragleave', e => {
    e.preventDefault();
    uploadCard.classList.remove('dragover');
});
uploadCard.addEventListener('drop', e => {
    e.preventDefault();
    uploadCard.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const dt = new DataTransfer();
        dt.items.add(files[0]);
        fileInput.files = dt.files;
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
    }
});

detectForm.addEventListener('submit', e => {
    loading.classList.add('show');
    detectBtn.style.display = 'none';
    if (resultSection) resultSection.style.display = 'none';
    loading.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

function resetForm() {
    fileInput.value = '';
    previewContainer.classList.remove('show');
    detectBtn.classList.remove('show');
    loading.classList.remove('show');
    uploadCard.querySelector('.upload-text').textContent = 'Pilih atau seret gambar tanaman padi';
    uploadCard.querySelector('.upload-subtext').textContent = 'Format: JPG, PNG, GIF (Maks. 10MB)';
    detectBtn.style.display = 'none';
    if (resultSection) resultSection.style.display = 'none';
}

function toggleDesc() {
    const descCard = document.getElementById('descCard');
    descCard.classList.toggle('expanded');
    const btn = descCard.querySelector('.more-btn');
    btn.textContent = descCard.classList.contains('expanded') ? 'Tampilkan Lebih Sedikit' : 'Selengkapnya';
}

function addResetButton() {
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'detect-btn';
    resetBtn.innerHTML = '<i class="fas fa-redo"></i> Deteksi Ulang';
    resetBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    resetBtn.onclick = resetForm;
    if (resultSection) resultSection.appendChild(resetBtn);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    if (resultSection && resultSection.style.display !== 'none') addResetButton();
});

document.addEventListener('DOMContentLoaded', function() {
    const descText = document.getElementById('descText');
    const moreBtn = document.querySelector('.more-btn');
    if (descText && moreBtn) {
        if (descText.scrollHeight > descText.clientHeight + 5) {
            moreBtn.classList.add('show');
        }
    }
});

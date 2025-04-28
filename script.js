// Data Website dan Fitur
const dataWebsite = {
    "Website Utama": ["Halaman Beranda", "Tentang Kami", "Kontak"],
    "Website Login Anggota": ["Halaman Login", "Reset Password"],
    "Website Daftar Anggota": ["Formulir Daftar", "Halaman Utama"],
    "Website Formulir Absen": ["Isi Formulir", "Lihat Absensi"],
    "Website Spesifikasi Absen": ["Halaman Utama", "Cari Data Kehadiran"]
};

// Inisialisasi Dropdown
const websites = Object.keys(dataWebsite);
const saranWebsiteSelect = document.getElementById('saran-website');
const kritikWebsiteSelect = document.getElementById('kritik-website');
const rateWebsiteSelect = document.getElementById('rate-website');

// Populate Website Dropdown
websites.forEach(site => {
    saranWebsiteSelect.innerHTML += `<option value="${site}">${site}</option>`;
    kritikWebsiteSelect.innerHTML += `<option value="${site}">${site}</option>`;
    rateWebsiteSelect.innerHTML += `<option value="${site}">${site}</option>`;
});

// Populate Fitur berdasarkan Website
function populateFitur(mode) {
    let websiteSelect = mode === 'saran' ? saranWebsiteSelect : kritikWebsiteSelect;
    let fiturSelect = mode === 'saran' ? document.getElementById('saran-fitur') : document.getElementById('kritik-fitur');
    let selectedWebsite = websiteSelect.value;

    fiturSelect.innerHTML = `<option value="">Pilih Fitur</option>`; // Reset

    if (dataWebsite[selectedWebsite]) {
        dataWebsite[selectedWebsite].forEach(fitur => {
            fiturSelect.innerHTML += `<option value="${fitur}">${fitur}</option>`;
        });
    }
}

// Navigasi antar Halaman
function showPage(page) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('saran-page').classList.add('hidden');
    document.getElementById('kritik-page').classList.add('hidden');
    document.getElementById('rate-page').classList.add('hidden');

    document.getElementById(`${page}-page`).classList.remove('hidden');

    const title = document.getElementById('page-title');
    const btnLeft = document.getElementById('switch-btn-left');
    const btnRight = document.getElementById('switch-btn-right');

    btnLeft.classList.remove('hidden');
    btnRight.classList.remove('hidden');

    if (page === 'saran') {
        title.innerText = "Saran";
        btnLeft.innerText = "Kritik";
        btnLeft.onclick = () => showPage('kritik');
        btnRight.innerText = "Rate Us";
        btnRight.onclick = () => showPage('rate');
    } else if (page === 'kritik') {
        title.innerText = "Kritik";
        btnLeft.innerText = "Saran";
        btnLeft.onclick = () => showPage('saran');
        btnRight.innerText = "Rate Us";
        btnRight.onclick = () => showPage('rate');
    } else if (page === 'rate') {
        title.innerText = "Rate Us";
        btnLeft.innerText = "Saran";
        btnLeft.onclick = () => showPage('saran');
        btnRight.innerText = "Kritik";
        btnRight.onclick = () => showPage('kritik');
    }
}

// Bintang Rating
const starContainer = document.getElementById('star-container');
const ratingInput = document.getElementById('rating-value');

// Generate 5 SVG Stars
for (let i = 1; i <= 5; i++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("class", "star");
    star.setAttribute("data-value", i);
    star.setAttribute("viewBox", "0 0 24 24");
    star.innerHTML = `<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.172L12 18.896l-7.336 3.86 1.402-8.172L.132 9.21l8.2-1.192z"/>`;
    starContainer.appendChild(star);
}

// Event untuk Bintang
const stars = document.querySelectorAll('.star');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-value');
        ratingInput.value = rating;
        highlightStars(rating);
    });

    star.addEventListener('mouseover', () => {
        const rating = star.getAttribute('data-value');
        highlightStars(rating);
    });

    star.addEventListener('mouseout', () => {
        highlightStars(ratingInput.value);
    });
});

function prepareSaranData() {
    const website = document.getElementById('saran-website').value;
    const fitur = document.getElementById('saran-fitur').value;
    const pesan = document.getElementById('saran-pesan').value;

    const fullMessage = `
Website: ${website}
Fitur: ${fitur}
Pesan: ${pesan}
    `.trim();

    document.getElementById('saran-full-message').value = fullMessage;

    return true; // Biar form tetap submit
}

// Fungsi highlight bintang
function highlightStars(rating) {
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}
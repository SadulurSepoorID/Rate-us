// Data Website dan Fitur
const dataWebsite = {
    "Website Utama": ["Tampilan Halaman", "Isi Informasi Halaman", "Tentang Kami", "Profil", "Struktur Kepengurusan", "Akun Media Sosial", "Contact us"],
    "Website Login Anggota": ["Tampilan Halaman", "Isi Informasi Halaman", "Reset Password", "Kegiatan", "Absensi", "Berita Terbaru", "Pencarian Tentang Perkeretaapian", "Kuis", "Ulang Tahun Anggota", "Merchandise"],
    "Website Daftar Anggota": ["Tampilan Halaman", "Isi Informasi Halaman", "Daftar Anggota", "Data Pribadi"],
    "Website Formulir Absen": ["Tampilan Halaman", "Isi Informasi Halaman", "Hadir/Izin"],
    "Website Spesifikasi Absen": ["Tampilan Halaman", "Isi Informasi Halaman", "Cari Nama", "Cari Lokasi/Kegiatan", "Statistik", "Nominasi Terbaik"]
};

// Inisialisasi Dropdown
const saranWebsiteSelect = document.getElementById('saran-website');
const kritikWebsiteSelect = document.getElementById('kritik-website');
const rateWebsiteSelect = document.getElementById('rate-website');

Object.keys(dataWebsite).forEach(site => {
    const option = `<option value="${site}">${site}</option>`;
    saranWebsiteSelect.innerHTML += option;
    kritikWebsiteSelect.innerHTML += option;
    rateWebsiteSelect.innerHTML += option;
});

// Populate fitur saat pilih website
function populateFitur(mode) {
    const websiteSelect = mode === 'saran' ? saranWebsiteSelect : kritikWebsiteSelect;
    const fiturSelect = mode === 'saran' ? document.getElementById('saran-fitur') : document.getElementById('kritik-fitur');
    const selectedWebsite = websiteSelect.value;

    fiturSelect.innerHTML = `<option value="">Pilih Fitur</option>`;
    if (dataWebsite[selectedWebsite]) {
        dataWebsite[selectedWebsite].forEach(fitur => {
            fiturSelect.innerHTML += `<option value="${fitur}">${fitur}</option>`;
        });
    }
}

// Navigasi antar halaman
function showPage(page) {
    ['main-menu', 'saran-page', 'kritik-page', 'rate-page'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(`${page}-page`).classList.remove('hidden');

    const title = document.getElementById('page-title');
    const btnLeft = document.getElementById('switch-btn-left');
    const btnRight = document.getElementById('switch-btn-right');

    btnLeft.classList.remove('hidden');
    btnRight.classList.remove('hidden');

    const pageConfig = {
        saran: { title: "Saran", left: "Kritik", right: "Rate" },
        kritik: { title: "Kritik", left: "Saran", right: "Rate" },
        rate: { title: "Rate Us", left: "Saran", right: "Kritik" }
    };

    title.innerText = pageConfig[page].title;
    btnLeft.innerText = pageConfig[page].left;
    btnRight.innerText = pageConfig[page].right;
    btnLeft.onclick = () => showPage(pageConfig[page].left.toLowerCase());
    btnRight.onclick = () => showPage(pageConfig[page].right.toLowerCase());

    // Inisialisasi halaman Rate Us saat beralih ke halaman Rate
    if (page === 'rate') {
        initRatePage();  // Pastikan Rate Us terisi dengan benar
    }
}

// Inisialisasi halaman Rate Us
function initRatePage() {
    // Kalau dropdown kosong (hanya "Pilih Website"), populate ulang
    if (rateWebsiteSelect.options.length <= 1) {
        Object.keys(dataWebsite).forEach(site => {
            const option = document.createElement('option');
            option.value = site;
            option.textContent = site;
            rateWebsiteSelect.appendChild(option);
        });
    }

    // Pastikan bintang rating terbuat
    if (document.querySelectorAll('#star-container .star').length === 0) {
        for (let i = 1; i <= 5; i++) {
            const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            star.setAttribute("class", "star");
            star.setAttribute("data-value", i);
            star.setAttribute("viewBox", "0 0 24 24");
            star.innerHTML = `<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.172L12 18.896l-7.336 3.86 1.402-8.172L.132 9.21l8.2-1.192z"/>`;
            starContainer.appendChild(star);
        }

        // Pasang event listener ke bintang setelah dibuat
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.getAttribute('data-value');
                ratingInput.value = rating;
                highlightStars(rating);
            });
            star.addEventListener('mouseover', () => {
                highlightStars(star.getAttribute('data-value'));
            });
            star.addEventListener('mouseout', () => {
                highlightStars(ratingInput.value);
            });
        });
    }
}

// Bintang Rating
const starContainer = document.getElementById('star-container');
const ratingInput = document.getElementById('rating-value');

// Fungsi highlight bintang
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Validasi WhatsApp menggunakan Regex
function isNomorIndonesiaValid(nomor) {
    const cleaned = nomor.replace(/\D/g, '');
    return /^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(cleaned);
}

// Gabungkan data sebelum kirim saran
async function prepareSaranData() {
    const nomorWa = document.querySelector('#saran-page input[name="Nomor WhatsApp"]').value.trim();
    if (!isNomorIndonesiaValid(nomorWa)) {
        alert('Nomor WhatsApp tidak valid atau bukan nomor Indonesia.');
        return false;
    }
    const website = document.getElementById('saran-website').value;
    const fitur = document.getElementById('saran-fitur').value;
    const pesan = document.getElementById('saran-pesan').value;

    document.getElementById('saran-full-message').value = `
Website: ${website}
Fitur: ${fitur}
Pesan: ${pesan}
    `.trim();
    return true;
}

// Gabungkan data sebelum kirim kritik
async function prepareKritikData() {
    const nomorWa = document.querySelector('#kritik-page input[name="Nomor WhatsApp"]').value.trim();
    if (!isNomorIndonesiaValid(nomorWa)) {
        alert('Nomor WhatsApp tidak valid atau bukan nomor Indonesia.');
        return false;
    }
    const website = document.getElementById('kritik-website').value;
    const fitur = document.getElementById('kritik-fitur').value;
    const pesan = document.getElementById('kritik-pesan').value;

    document.getElementById('kritik-full-message').value = `
Website: ${website}
Fitur: ${fitur}
Pesan: ${pesan}
    `.trim();
    return true;
}

// Handler Submit Form
async function handleSubmitSaran(event) {
    event.preventDefault();
    const success = await prepareSaranData();
    if (success) {
        event.target.submit();
    }
}

async function handleSubmitKritik(event) {
    event.preventDefault();
    const success = await prepareKritikData();
    if (success) {
        event.target.submit();
    }
}

// Pasang event listener ke form
document.getElementById('form-saran').addEventListener('submit', handleSubmitSaran);
document.getElementById('form-kritik').addEventListener('submit', handleSubmitKritik);
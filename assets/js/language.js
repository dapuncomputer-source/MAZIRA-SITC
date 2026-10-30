// AMBIL SEMUA TOMBOL BAHASA
const languageButtons = document.querySelectorAll("[data-language]");


// FUNGSI MEMBACA KEY JSON BERTINGKAT
function getTranslation(translations, key) {
    // Pecah key berdasarkan tanda "."
    const keys = key.split(".");

    // Mulai dari seluruh data JSON
    let value = translations;

    // Telusuri tiap tingkat objek
    for (const part of keys) {
        // Jika key tidak ditemukan
        if (
            value == null ||
            typeof value !== "object" ||
            !(part in value)
        ) {
            return undefined;
        }

        // Masuk ke object berikutnya
        value = value[part];
    }

    // Kembalikan teks yang ditemukan
    return value;
}


// ===================================
// FUNGSI PENGGANTI BAHASA
// ===================================
async function changeLanguage(language) {
    try {
        // ambil file JSON sesui dengan yang dipilih
        const response = await fetch (
            `assets/lang/${language}.json`
        );
        
        // Periksa apakah file berhasil di temukan
        if (!response.ok) {
            throw new Error("File bahasa tidak ditemukan.");
        }
        
        // Ubah File JSON menjadi data JS
        const translations = await response.json();
        
        // ===================================
        // GANTI TEXT PADA HTML
        // ===================================
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            // Ambil key dari atribut data-i18n
            const key = element.dataset.i18n;
            
            // Cari text berdasarkan key bertingkat
            const translatedText = getTranslation(
                translations,
                key
            );
            
            // Ganti text bila terjemah sudah ditemukan
            if (typeof translatedText === "string") {
                element.textContent = translatedText;
            }
        });
        
        
        // ===================================
        // ATUR BAHASA DAN ARAH TULISAN
        // ===================================
        document.documentElement.lang = language;

        // Bahasa arab dari kanan ke kiri (RTL)
        // Bahasa indonesia dan inggris dari kiri ke kanan (LTR)
        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr"

        
        // PERBARUI TOMBOL BAHASA AKTIF
        languageButtons.forEach((button) => {
            const isActive =
                button.dataset.language === language;

            // Tambahkan atau hapus class active
            button.classList.toggle("active", isActive);

            // Perbarui status tombol untuk aksebilitas
            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });


        // ===================================
        // SIMPAN BAHASA YANG DI PILIH
        // ===================================
        localStorage.setItem("mazira-language", language);
        
    } catch (error) {
        // Tampilkan pesan jika terjadi kesalahan
        console.error("Gagal mengganti bahasa:", error);
    }
}




// ===================================
// AKTIFKAN TOMBOL BAHSA
// ===================================
languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.language);
    });
});



// ===================================
// BUAT BAHASA TERAKHIR YANG DIPILIH
// ===================================

// Ambil pilihan bahasa dari localStorage
const savedLanguage = localStorage.getItem("mazira-language");

// Jika belum pernah memilih, gunakan bahasa Indonesia
changeLanguage(savedLanguage || "id");



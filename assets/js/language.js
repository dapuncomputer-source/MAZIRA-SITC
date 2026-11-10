
// ===================================
// AMBIL SEMUA TOMBOL BAHASA
// ===================================
const languageButtons = document.querySelectorAll("[data-language]");


// ===================================
// FUNGSI MEMBACA KEY JSON BERTINGKAT
// ===================================
function getTranslation(translations, key) {
    const keys = key.split(".");
    let value = translations;

    for (const part of keys) {
        if (
            value == null ||
            typeof value !== "object" ||
            !(part in value)
        ) {
            return undefined;
        }

        value = value[part];
    }

    return value;
}


// ===================================
// FUNGSI PENGGANTI BAHASA
// ===================================
async function changeLanguage(language) {
    try {

        // Ambil file JSON sesuai bahasa
        const response = await fetch(
            `assets/lang/${language}.json`
        );

        if (!response.ok) {
            throw new Error("File bahasa tidak ditemukan.");
        }

        // Ubah JSON menjadi objek JavaScript
        const translations = await response.json();


        // ===================================
        // GANTI TEKS HTML
        // ===================================
        document.querySelectorAll("[data-i18n]").forEach((element) => {

            const key = element.dataset.i18n;

            const translatedText = getTranslation(
                translations,
                key
            );

            if (typeof translatedText === "string") {
                element.textContent = translatedText;
            }
        });


        // ===================================
        // TERJEMAHKAN PLACEHOLDER INPUT
        // ===================================
        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {

            const key = element.dataset.i18nPlaceholder;

            const translatedText = getTranslation(
                translations,
                key
            );

            if (typeof translatedText === "string") {
                element.setAttribute("placeholder", translatedText);
            }
        });


        // ===================================
        // ATUR BAHASA DAN ARAH DOKUMEN
        // ===================================
        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";


        // ===================================
        // PERBARUI TOMBOL BAHASA AKTIF
        // ===================================
        languageButtons.forEach((button) => {

            const isActive =
                button.dataset.language === language;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });


        // ===================================
        // SIMPAN BAHASA YANG DIPILIH
        // ===================================
        localStorage.setItem("mazira-language", language);

    } catch (error) {

        console.error("Gagal mengganti bahasa:", error);

    }
}


// ===================================
// AKTIFKAN TOMBOL BAHASA
// ===================================
languageButtons.forEach((button) => {

    button.addEventListener("click", () => {
        changeLanguage(button.dataset.language);
    });

});


// ===================================
// GUNAKAN BAHASA TERAKHIR DIPILIH
// ===================================
const savedLanguage =
    localStorage.getItem("mazira-language");

changeLanguage(savedLanguage || "id");

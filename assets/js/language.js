
const languageButtons = document.querySelectorAll("[data-language]");

async function changeLanguage(language) {
    try {
        const response = await fetch(`assets/lang/${language}.json`);

        if (!response.ok) {
            throw new Error("File bahasa tidak ditemukan.");
        }

        const translations = await response.json();

        // Ganti teks berdasarkan data-i18n
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;

            if (translations[key] !== undefined) {
                element.textContent = translations[key];
            }
        });

        // Atur bahasa dan arah tulisan
        document.documentElement.lang = language;
        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";

        // Perbarui tombol bahasa yang aktif
        languageButtons.forEach((button) => {
            const isActive = button.dataset.language === language;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        // Simpan pilihan pengguna
        localStorage.setItem("mazira-language", language);

    } catch (error) {
        console.error("Gagal mengganti bahasa:", error);
    }
}

// Aktifkan tombol bahasa
languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.language);
    });
});

// Gunakan bahasa yang terakhir dipilih
const savedLanguage = localStorage.getItem("mazira-language");
changeLanguage(savedLanguage || "id");

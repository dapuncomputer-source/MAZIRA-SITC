
// ========================================
// ANIMASI SCROLL BERULANG MAZIRA SITC
// ========================================

document.documentElement.classList.add("js-motion");

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    // Elemen masuk layar: tampilkan
                    entry.target.classList.add("is-visible");

                } else {

                    // Elemen keluar layar: sembunyikan kembali
                    entry.target.classList.remove("is-visible");

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });

}

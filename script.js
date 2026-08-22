// =====================================================
// GALERIE - LIGHTBOX
// =====================================================

function openLightbox(element) {

    const image = element.querySelector("img");

    const lightbox = document.getElementById("imageLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    if (!image || !lightbox || !lightboxImage) {
        console.error("Élément de galerie introuvable");
        return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");

    document.body.classList.add("lightbox-open");
}


// =====================================================
// FERMER LA GALERIE
// =====================================================

function closeLightbox(event) {

    // Si on clique sur l'image elle-même,
    // on ne ferme pas la fenêtre.
    if (
        event &&
        event.target &&
        event.target.id === "lightboxImage"
    ) {
        return;
    }

    const lightbox =
        document.getElementById("imageLightbox");

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");

    document.body.classList.remove("lightbox-open");
}


// =====================================================
// FERMER AVEC ESC
// =====================================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const lightbox =
            document.getElementById("imageLightbox");

        if (lightbox) {

            lightbox.classList.remove("active");

            document.body.classList.remove(
                "lightbox-open"
            );
        }
    }

});


// =====================================================
// FORMULAIRE CONTACT
// =====================================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const nom =
                document.getElementById("nom").value;

            const email =
                document.getElementById("email").value;

            const message =
                document.getElementById("message").value;


            try {

                const response =
                    await fetch("/api/contact", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            nom,
                            email,
                            message
                        })

                    });


                const data =
                    await response.json();


                if (response.ok) {

                    alert(
                        data.message ||
                        "Votre demande a été envoyée avec succès."
                    );

                    contactForm.reset();

                } else {

                    alert(
                        data.message ||
                        "Erreur lors de l'envoi."
                    );

                }

            } catch (error) {

                console.error(
                    "Erreur fetch :",
                    error
                );

                alert(
                    "Impossible de contacter le serveur."
                );
            }

        }
    );

}
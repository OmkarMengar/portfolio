document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll("nav a, .hero-actions a");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // 2. Interactive Project Demo Modal
    const modal = document.getElementById("demo-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalIframe = document.getElementById("modal-iframe");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalContent = modal.querySelector(".modal-content");
    let lastFocusedElement = null;

    const closeModal = () => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        modalIframe.src = "";
        modalIframe.srcdoc = "";
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    const demoButtons = document.querySelectorAll(".btn-demo");
    demoButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            lastFocusedElement = button;
            const projectCard = button.closest(".project-card");
            const title = projectCard.querySelector("h3").innerText;
            const description = projectCard.querySelector(".project-desc").innerText;
            const demoUrl = button.getAttribute("data-demo-url");

            modalTitle.innerText = title;
            modalDescription.innerText = description;
            
            if (demoUrl && demoUrl !== "#") {
                modalIframe.src = demoUrl;
            } else {
                modalIframe.srcdoc = `
                    <body style="font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:90vh; color:#555;">
                        <div style="text-align:center;">
                            <h2>${title}</h2>
                            <p>Live interactive preview loading...</p>
                        </div>
                    </body>
                `;
            }

            modal.style.display = "flex";
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
            closeModalBtn.focus();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            closeModal();
            return;
        }
        if (e.key !== "Tab") return;
        const focusable = [...modal.querySelectorAll('button, iframe, [href], [tabindex="-1"]')]
            .filter(element => !element.disabled);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 3. Tech Stack Badge Hover Animations
    const techItems = document.querySelectorAll(".tech-card");
    techItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "translateY(-5px) scale(1.02)";
            item.style.transition = "transform 0.2s ease";
        });
        item.addEventListener("mouseleave", () => {
            item.style.transform = "translateY(0) scale(1)";
        });
    });
});

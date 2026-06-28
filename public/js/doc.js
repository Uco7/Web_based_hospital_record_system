document.addEventListener("DOMContentLoaded", () => {

    // ─── Element References ───────────────────────────────────────────────
    const appointmentBtn       = document.getElementById("appointmentBtn");
    const appointmentBtnMobile = document.getElementById("appointmentBtnMobile");
    const doctorFormBtn        = document.getElementById("doctorFormBtn");
    const doctorFormBtnMobile  = document.getElementById("doctorFormBtnMobile");

    const appointmentPanel = document.getElementById("appointmentsPanel");
    const doctorFormPanel  = document.getElementById("docFormPanel");
    const treatTable       = document.querySelector(".treatp-table");

    const closeAppointmentBtn = document.getElementById("closeAppointmentsBtn");
    const closeFormBtn        = document.getElementById("closeFormBtn");
    const closeFormBtnHeader  = document.getElementById("closeFormBtnHeader");

    const menuBtn    = document.getElementById("mobileMenuToggle");
    const closeBtn   = document.getElementById("mobileMenuClose");
    const mobileMenu = document.getElementById("mobileSidenav");
    const overlay    = document.getElementById("sidebarOverlay");

    const customSearchBox = document.getElementById("customSearchBox");

    // ─── Panel Control ────────────────────────────────────────────────────

    function hideAll() {
        // Hide both panels
        if (appointmentPanel) {
            appointmentPanel.classList.remove("is-open");
            appointmentPanel.style.display = "none";
        }
        if (doctorFormPanel) {
            doctorFormPanel.classList.remove("is-open");
            doctorFormPanel.style.display = "none";
        }
        // Show the main table
        if (treatTable) treatTable.style.display = "";
    }

    function showPanel(panel) {
        // First hide everything
        hideAll();

        // Then open only the requested panel
        if (panel) {
            panel.style.display = "block";
            panel.classList.add("is-open");
            // Hide main table
            if (treatTable) treatTable.style.display = "none";
            // Scroll into view smoothly
            setTimeout(() => {
                panel.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
        // Close mobile menu if open
        closeMobileMenu();
    }

    function togglePanel(panel) {
        if (!panel) return;
        const isCurrentlyOpen = panel.classList.contains("is-open");
        if (isCurrentlyOpen) {
            hideAll();
        } else {
            showPanel(panel);
        }
    }

    // ─── Wire Up Sidebar Buttons ──────────────────────────────────────────

    if (appointmentBtn) {
        appointmentBtn.addEventListener("click", (e) => {
            e.preventDefault();
            togglePanel(appointmentPanel);
        });
    }

    if (appointmentBtnMobile) {
        appointmentBtnMobile.addEventListener("click", (e) => {
            e.preventDefault();
            togglePanel(appointmentPanel);
        });
    }

    if (doctorFormBtn) {
        doctorFormBtn.addEventListener("click", (e) => {
            e.preventDefault();
            togglePanel(doctorFormPanel);
        });
    }

    if (doctorFormBtnMobile) {
        doctorFormBtnMobile.addEventListener("click", (e) => {
            e.preventDefault();
            togglePanel(doctorFormPanel);
        });
    }

    // ─── Wire Up Close Buttons ────────────────────────────────────────────

    if (closeAppointmentBtn) closeAppointmentBtn.addEventListener("click", hideAll);
    if (closeFormBtn)        closeFormBtn.addEventListener("click", hideAll);
    if (closeFormBtnHeader)  closeFormBtnHeader.addEventListener("click", hideAll);

    // ─── Initialize: hide panels on load ─────────────────────────────────
    if (appointmentPanel) appointmentPanel.style.display = "none";
    if (doctorFormPanel)  doctorFormPanel.style.display  = "none";

    // ─── Mobile Sidebar ───────────────────────────────────────────────────

    function openMobileMenu() {
        mobileMenu?.classList.add("is-open");
        overlay?.classList.add("is-visible");
        document.body.classList.add("nav-open");
    }

    function closeMobileMenu() {
        mobileMenu?.classList.remove("is-open");
        overlay?.classList.remove("is-visible");
        document.body.classList.remove("nav-open");
    }

    menuBtn?.addEventListener("click", openMobileMenu);
    closeBtn?.addEventListener("click", closeMobileMenu);
    overlay?.addEventListener("click", closeMobileMenu);

    // ─── Live Search ──────────────────────────────────────────────────────

    if (customSearchBox) {
        customSearchBox.addEventListener("input", () => {
            const query = customSearchBox.value.toLowerCase().trim();
            document.querySelectorAll(".data-table tbody tr").forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        });
    }

    // ─── Active Link Highlight ────────────────────────────────────────────

    const currentPath = window.location.pathname;
    document.querySelectorAll(".sidebar__nav a, .mobile-sidenav nav a").forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.closest("li")?.classList.add("active");
        }
    });

});
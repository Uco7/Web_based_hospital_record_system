document.addEventListener("DOMContentLoaded", () => {

    // ─── Element References ───────────────────────────────────────────────
    const appointmentBtn        = document.getElementById("appointmentBtn");
    const appointmentBtnMobile  = document.getElementById("appointmentBtnMobile");
    const appointmentPanel      = document.getElementById("appointmentsPanel");
    const closeAppointmentsBtn  = document.getElementById("closeAppointmentsBtn");

    // All content tables that get hidden when appointment panel opens
    const contentTables = document.querySelectorAll(
        ".all-tb, .card-tb, .prec-tb, .regp-tb, .regs-tb, .tables-grid, #mainTablesGrid"
    );

    const menuBtn    = document.getElementById("mobileMenuToggle");
    const closeBtn   = document.getElementById("mobileMenuClose");
    const mobileMenu = document.getElementById("mobileSidenav");
    const overlay    = document.getElementById("sidebarOverlay");

    const customSearchBox = document.getElementById("customSearchBox");

    // ─── Appointment Panel Control ────────────────────────────────────────

    function hideAppointmentPanel() {
        if (appointmentPanel) {
            appointmentPanel.style.display = "none";
            appointmentPanel.classList.remove("is-open", "panel-animate");
        }
        // Restore content tables
        contentTables.forEach(el => { if (el) el.style.display = ""; });
    }

    function showAppointmentPanel() {
        // Hide content tables while panel is open
        contentTables.forEach(el => { if (el) el.style.display = "none"; });

        if (appointmentPanel) {
            appointmentPanel.style.display = "block";
            appointmentPanel.classList.add("is-open", "panel-animate");
            setTimeout(() => {
                appointmentPanel.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
        closeMobileMenu();
    }

    function toggleAppointmentPanel() {
        if (!appointmentPanel) return;
        if (appointmentPanel.classList.contains("is-open")) {
            hideAppointmentPanel();
        } else {
            showAppointmentPanel();
        }
    }

    // Initialize hidden on page load
    if (appointmentPanel) appointmentPanel.style.display = "none";

    // Wire up buttons
    appointmentBtn?.addEventListener("click", (e) => { e.preventDefault(); toggleAppointmentPanel(); });
    appointmentBtnMobile?.addEventListener("click", (e) => { e.preventDefault(); toggleAppointmentPanel(); });
    closeAppointmentsBtn?.addEventListener("click", hideAppointmentPanel);

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

    // ─── Active Sidebar Link ──────────────────────────────────────────────

    const currentPath = window.location.pathname;
    document.querySelectorAll(".sidebar__nav a, .mobile-sidenav nav a").forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.closest("li")?.classList.add("active");
        }
    });

});
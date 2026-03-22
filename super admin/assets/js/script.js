/**
 * Warana University — Super Admin
 * Charts (Chart.js) + table filters
 */

(function () {
  "use strict";

  var chartColors = {
    primary: "#3A2359",
    secondary: "#5A3A82",
    light: "rgba(90, 58, 130, 0.25)",
    muted: "#94a3b8",
    pie: ["#3A2359", "#5A3A82", "#7c5fa3", "#a894c4", "#d4c9e8"],
  };

  function initAdmissionsChart() {
    var el = document.getElementById("chartAdmissions");
    if (!el || typeof Chart === "undefined") return;

    new Chart(el, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Admissions",
            data: [42, 55, 48, 62, 71, 65, 58, 88, 95, 82, 76, 90],
            borderColor: chartColors.primary,
            backgroundColor: chartColors.light,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: chartColors.primary,
            pointBorderColor: "#fff",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(58, 35, 89, 0.06)" },
            ticks: { color: chartColors.muted },
          },
          x: {
            grid: { display: false },
            ticks: { color: chartColors.muted },
          },
        },
      },
    });
  }

  function initDistributionChart() {
    var el = document.getElementById("chartDistribution");
    if (!el || typeof Chart === "undefined") return;

    new Chart(el, {
      type: "doughnut",
      data: {
        labels: [
          "Engineering",
          "Science",
          "Commerce",
          "Arts",
          "Management",
        ],
        datasets: [
          {
            data: [32, 22, 18, 15, 13],
            backgroundColor: chartColors.pie,
            borderWidth: 2,
            borderColor: "#fff",
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#475569",
              padding: 14,
              usePointStyle: true,
            },
          },
        },
        cutout: "58%",
      },
    });
  }

  function initStudentFilters() {
    var tbody = document.getElementById("studentsTableBody");
    if (!tbody) return;

    var selCollege = document.getElementById("filterCollege");
    var selDept = document.getElementById("filterDepartment");
    var search = document.getElementById("filterSearch");

    function rowMatches(row) {
      var college = (selCollege && selCollege.value) || "";
      var dept = (selDept && selDept.value) || "";
      var q = (search && search.value ? search.value : "").trim().toLowerCase();

      if (college && row.getAttribute("data-college") !== college)
        return false;
      if (dept && row.getAttribute("data-department") !== dept) return false;
      if (q) {
        var hay = row.getAttribute("data-search") || "";
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }

    function apply() {
      var rows = tbody.querySelectorAll("tr[data-student-row]");
      rows.forEach(function (row) {
        row.style.display = rowMatches(row) ? "" : "none";
      });
    }

    if (selCollege) selCollege.addEventListener("change", apply);
    if (selDept) selDept.addEventListener("change", apply);
    if (search) search.addEventListener("input", apply);
  }

  function initCollegeActions() {
    document.body.addEventListener("click", function (e) {
      var del = e.target.closest("[data-delete-college]");
      if (del) {
        e.preventDefault();
        var name = del.getAttribute("data-delete-college") || "this college";
        if (window.confirm("Delete " + name + "? This is a demo UI only.")) {
          var tr = del.closest("tr");
          if (tr) tr.remove();
        }
      }
    });
  }

  function initMobileSidebar() {
    var wrap = document.querySelector(".wu-wrapper");
    var openBtn = document.getElementById("wuSidebarOpen");
    if (!wrap || !openBtn) return;

    var closeBtn = document.getElementById("wuSidebarClose");
    var backdrop = document.getElementById("wuSidebarBackdrop");

    function setOpen(open) {
      wrap.classList.toggle("wu-sidebar-open", open);
      document.body.classList.toggle("wu-sidebar-open", open);
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (backdrop) backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }

    openBtn.addEventListener("click", function () {
      setOpen(true);
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        setOpen(false);
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setOpen(false);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    wrap.querySelectorAll(".wu-nav-link").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 991.98px)").matches) setOpen(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 992px)").matches) setOpen(false);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initAdmissionsChart();
    initDistributionChart();
    initStudentFilters();
    initCollegeActions();
    initMobileSidebar();
  });
})();

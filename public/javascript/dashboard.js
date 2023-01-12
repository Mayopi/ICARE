const dashboardNav = document.querySelector(".main-menu");
const dashboardNavbarToggle = document.querySelector(".dashboard-navbar-toggle");
const arrow = document.getElementById("arrow");

dashboardNavbarToggle.addEventListener("click", () => {
  if (dashboardNav.classList.contains("expanded")) {
    arrow.className = "bi bi-caret-right-fill";
    dashboardNav.classList.remove("expanded");
    arrow.style.color = "#eaeaea";
  } else {
    arrow.className = "bi bi-caret-left-fill";
    dashboardNav.classList.add("expanded");
    arrow.style.color = "#34b3f1";
  }
});

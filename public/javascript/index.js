const navbar = document.querySelector(".navbar");
const navLink = document.querySelector(".nav-link");
const background_bridge = document.querySelector(".background-bridge");
const sectionContact = document.querySelector(".contact");

// change navbar style when approaching contact section
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        navbar.classList.remove("observe");
      } else {
        navbar.classList.add("observe");
      }
    });
  },
  {
    threshold: 0,
  }
);

observer.observe(background_bridge);

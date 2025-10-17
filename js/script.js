// Global variables
let isMenuOpen = false;
let scrolled = false;
let currentSlide = 0;
let darkMode = false;

// Benefits data for carousel
const benefits = [
  {
    icon: "target",
    title: "Misiunea Noastră",
    description:
      "Să revoluționăm accesul la servicii locale în România, conectând oameni cu profesioniști de top printr-o platformă intuitivă și tehnologie avansată.",
    color: "from-rose-400 to-red-600",
  },
  {
    icon: "users",
    title: "Beneficii Utilizatori",
    description:
      "Găsește rapid servicii verificate, compară prețuri transparente, citește recenzii reale și rezervă instant - totul optimizat pentru nevoile tale zilnice.",
    color: "from-indigo-400 to-blue-700",
  },
  {
    icon: "rocket",
    title: "Creștere Business",
    description:
      "Mărește vizibilitatea afacerii tale cu profiluri premium, management eficient și tool-uri de promovare care atrag clienți loiali.",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: "heart",
    title: "Impact Comunitar",
    description:
      "Susținem economia locală, promovăm antreprenori români și simplificăm viața cotidiană prin inovație tehnologică accesibilă tuturor.",
    color: "from-yellow-400 to-orange-500",
  },
];

// Function to scroll to a section smoothly
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    isMenuOpen = false;
    updateMenu();
  }
}

// Function to update mobile menu visibility
function updateMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuToggle = document.getElementById("menuToggle");
  if (isMenuOpen) {
    mobileMenu.style.display = "block";
    menuToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
  } else {
    mobileMenu.style.display = "none";
    menuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
  }
  lucide.createIcons();
}

// Function to toggle dark mode
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  localStorage.setItem("darkMode", darkMode);
  const toggleBtn = document.getElementById("darkModeToggle");
  toggleBtn.textContent = darkMode ? "☀️" : "🌙";
}

// Function to update navbar on scroll
function updateNavbar() {
  const navbar = document.getElementById("navbar");
  if (scrolled) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Function to move to next slide in carousel
function nextSlide() {
  currentSlide = (currentSlide + 1) % benefits.length;
  updateCarousel();
}

// Function to move to previous slide in carousel
function prevSlide() {
  currentSlide = (currentSlide - 1 + benefits.length) % benefits.length;
  updateCarousel();
}

// Function to update carousel content and dots
function updateCarousel() {
  const container = document.getElementById("carouselContainer");
  const benefit = benefits[currentSlide];
  container.innerHTML = `
        <div class="bg-gradient-to-br ${benefit.color} rounded-3xl p-8 sm:p-12 md:p-16 min-h-[300px] flex flex-col items-center justify-center text-center shadow-2xl">
            <div class="mb-8">
                <i data-lucide="${benefit.icon}" class="w-12 h-12"></i>
            </div>
            <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">${benefit.title}</h3>
            <p class="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl leading-relaxed">
                ${benefit.description}
            </p>
        </div>
    `;
  lucide.createIcons();

  const dots = document.getElementById("dotsIndicator");
  dots.innerHTML = "";
  benefits.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `transition-all duration-300 rounded-full ${
      currentSlide === index
        ? "bg-primary w-8 sm:w-12 h-2 sm:h-3"
        : "bg-gray-600 w-2 sm:w-3 h-2 sm:h-3 hover:bg-gray-500"
    }`;
    dot.onclick = () => {
      currentSlide = index;
      updateCarousel();
    };
    dots.appendChild(dot);
  });
}

// Event listeners on DOM load
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Mobile menu toggle
  document.getElementById("menuToggle").addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    updateMenu();
  });

  // Dark mode from local storage
  const savedDark = localStorage.getItem("darkMode");
  if (savedDark === "true") {
    toggleDarkMode();
  }
  document
    .getElementById("darkModeToggle")
    .addEventListener("click", toggleDarkMode);

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    scrolled = window.scrollY > 50;
    updateNavbar();
  });
  updateNavbar(); // Initial call

  // Carousel setup
  document.getElementById("prevSlide").addEventListener("click", prevSlide);
  document.getElementById("nextSlide").addEventListener("click", nextSlide);
  updateCarousel();
  setInterval(nextSlide, 5000); // Auto slide every 5 seconds

  // Contact form submission
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const message = document.getElementById("formMessage");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          form.style.display = "none";
          message.style.display = "block";
        } else {
          alert("A apărut o eroare la trimiterea formularului.");
        }
      } catch (error) {
        console.error(error);
        alert("Eroare de conexiune.");
      }
    });
  });
});

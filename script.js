const featuredOffers = [
  {
    category: "Outdoor Living",
    title: "Free Estimates",
    business: "Patio Creations",
    details: ["Contact: patioCreations@gmail.com", "Label shown: COMPANY – Tagline Here"]
  },
  {
    category: "Cleaning",
    title: "$10 Off Any Job",
    business: "Carpet Cleaning",
    details: ["Contact: carpetcleaning.com"]
  },
  {
    category: "Home Improvement",
    title: "Free Installation",
    business: "Business Name Coming Soon",
    details: ["Phone: 507-888-8888", "Email: thisemail@gmail.com"]
  },
  {
    category: "Therapy",
    title: "Free Consultation",
    business: "Balance",
    details: ["Contact: therapy@gmail.com"]
  },
  {
    category: "Window Cleaning",
    title: "10% Off Any Cleaning",
    business: "MN Window Cleaning",
    details: ["Contact: MNWindowCleaning.com"]
  },
  {
    category: "HVAC",
    title: "Free Filter Upgrade",
    business: "MN HVAC",
    details: ["Phone: 507-888-8888", "Website: mnHVAC.com"]
  },
  {
    category: "Gutter Services",
    title: "$20 Off Any Cleaning",
    business: "Top Gutter Installation & Service",
    details: ["Phone: 507-888-8888", "Email: GutterCleaning@gmail.com"]
  },
  {
    category: "Countertops",
    title: "Free Estimates",
    business: "MN Counter Tops",
    details: ["Contact: MNCounterTops.com"]
  },
  {
    category: "Business 9",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  },
  {
    category: "Business 10",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  },
  {
    category: "Business 11",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  },
  {
    category: "Business 12",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  },
  {
    category: "Business 13",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  },
  {
    category: "Business 14",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  },
  {
    category: "Business 15",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  },
  {
    category: "Business 16",
    title: "Offer Coming Soon",
    business: "Business Name Coming Soon",
    details: ["Details will be updated from the current card."]
  }
];

function initializeMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initializeCardViewer() {
  const card = document.getElementById("community-card");
  const flipButton = document.getElementById("flip-card-button");
  const sideButtons = document.querySelectorAll(".card-side-button");

  if (!card || !flipButton || !sideButtons.length) {
    return;
  }

  const updateCardSide = (side) => {
    const isBack = side === "back";
    card.dataset.side = side;
    card.classList.toggle("is-back", isBack);
    flipButton.setAttribute("aria-pressed", String(isBack));

    sideButtons.forEach((button) => {
      const selected = button.dataset.side === side;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-selected", String(selected));
    });
  };

  flipButton.addEventListener("click", () => {
    const nextSide = card.dataset.side === "front" ? "back" : "front";
    updateCardSide(nextSide);
  });

  sideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateCardSide(button.dataset.side);
    });
  });
}

function renderFeaturedOffers() {
  const offersContainer = document.getElementById("featured-offers");

  if (!offersContainer) {
    return;
  }

  offersContainer.innerHTML = featuredOffers
    .map(
      (offer) => `
        <article class="offer-card">
          <span class="offer-meta">${offer.category}</span>
          <p class="offer-business-label">Business</p>
          <h3 class="offer-business">${offer.business}</h3>
          <p class="offer-title-label">Offer</p>
          <p class="offer-title">${offer.title}</p>
          <ul class="offer-details">
            ${offer.details.map((detail) => `<li>${detail}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function initializeContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const accessKey = formData.get("access_key");

    status.className = "form-status";

    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      status.textContent = "Add your Web3Forms access key in contact.html before submitting the form.";
      status.classList.add("is-error");
      return;
    }

    status.textContent = "Sending your message...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        status.textContent = "Message sent successfully. MedCity Community Card will be in touch soon.";
        status.classList.add("is-success");
      } else {
        status.textContent = "Unable to send the message right now. Please try again or email directly.";
        status.classList.add("is-error");
      }
    } catch (error) {
      status.textContent = "Network error. Please try again later or contact by email or phone.";
      status.classList.add("is-error");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMobileNavigation();
  initializeCardViewer();
  renderFeaturedOffers();
  initializeContactForm();
});

// Made with Bob

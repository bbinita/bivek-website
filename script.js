// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links
  const navLinks = document.querySelectorAll(
    "header nav a:not(.resume-button)"
  );

  // Get all content sections
  const sections = document.querySelectorAll("section");



  // Function to set active navigation link
  function setActiveNavLink(id) {
    // Remove active class from all links
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to the current link
    const currentLink = document.querySelector(`header nav a[href="#${id}"]`);
    if (currentLink) {
      currentLink.classList.add("active");
    }
  }

  // Function to show section and hide others
  function showSection(id) {
    // Hide all sections
    sections.forEach((section) => {
      section.style.display = "none";
    });

    // Show the current section
    const currentSection = document.getElementById(id);
    if (currentSection) {
      currentSection.style.display = "block";
    }
  }

  // Handle nav link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get section id from the href attribute
      const sectionId = this.getAttribute("href").substring(1);

      // Update URL hash without page jump
      history.pushState(null, null, `#${sectionId}`);

      // Set active nav link
      setActiveNavLink(sectionId);

      // Show selected section
      showSection(sectionId);
    });
  });

  // Handle page load and hash changes
  function handleHashChange() {
    // Get current hash (remove the # symbol)
    let currentHash = window.location.hash.substring(1);

    // If no hash, default to first section
    if (!currentHash && sections.length > 0) {
      currentHash = sections[0].id;
    }

    // Set active nav link
    setActiveNavLink(currentHash);

    // Show selected section
    showSection(currentHash);
  }

  // Handle hash changes
  window.addEventListener("hashchange", handleHashChange);

  // Handle initial page load
  handleHashChange();

  // Add scroll event listener for highlighting nav items based on scroll position
  window.addEventListener("scroll", function () {
    // Only execute if not responding to a manual navigation
    if (!window.manualNavigation) {
      let currentSectionId = "";
      let smallestDistance = Infinity;

      // Find the section closest to the top of the viewport
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const distance = Math.abs(sectionTop - window.scrollY);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          currentSectionId = section.id;
        }
      });

      // Update active nav link
      if (currentSectionId) {
        setActiveNavLink(currentSectionId);
      }
    }
  });
  // Add this to your existing JavaScript file
document.addEventListener("DOMContentLoaded", function() {
  // Find all CV/resume buttons 
  const cvButtons = document.querySelectorAll(".cv-button, .resume-button");
  
  cvButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Get the href attribute (path to the CV)
      const cvPath = this.getAttribute("href");
      
      // Check if it's a PDF (you can add more file types if needed)
      if(cvPath.toLowerCase().endsWith(".pdf")) {
        // Open CV in a new tab with the PDF viewer
        const viewerUrl = `cv-viewer.html?file=${encodeURIComponent(cvPath)}`;
        window.open(viewerUrl, "_blank");
      } else {
        // For non-PDF files, open in a new tab directly
        window.open(cvPath, "_blank");
      }
    });
  });
});
});

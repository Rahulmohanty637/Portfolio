const section = document.querySelector(".scroll-section");

    // Set initial background color and scroll position
    let lastScrollTop = 300;
    let bgColor = "#1fa0ff"; // Default color

    // Add an event listener for the scroll event on the specific section
    window.addEventListener("scroll", () => {
      // Get the current scroll position
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Check if scrolling up or down
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down, change the section's background color
        section.style.backgroundColor = "#FFCC70";
      } else {
        // Scrolling up, change the section's background color
        section.style.backgroundColor = "#1fa0ff";
      }

      // Store the current scroll position for the next comparison
      lastScrollTop = currentScrollTop;
    });
// Get a reference to the body element
const body = document.body;

// Set the initial background color
let bgColor = "#3498db"; // Default color

// Add an event listener for the scroll event
window.addEventListener("scroll", () => {
    // Calculate the scroll percentage
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Change the background color based on the scroll percentage
    if (scrollPercentage > 50) {
        bgColor = "#e74c3c"; // Change to a different color when scrolling more than 50%
    } else {
        bgColor = "#3498db"; // Revert to the default color when scrolling less than 50%
    }

    // Update the background color
    body.style.backgroundColor = bgColor;
});

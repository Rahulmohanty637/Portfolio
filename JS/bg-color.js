const scrollingDiv = document.querySelector('.scrolling-div');

window.addEventListener('scroll', () => {
    // Calculate the scroll position as a percentage of the page height
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Set the background color based on the scroll percentage
    scrollingDiv.style.backgroundColor = `#1fa0ff(${scrollPercentage}, 50%, 50%)`;
});

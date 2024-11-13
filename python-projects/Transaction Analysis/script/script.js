// Toggle entire sidebar on small screens
document.querySelector(".toggle-btn").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("active");
  });
  
  // Function to toggle subsections
  function toggleSubsection(id) {
    const subsection = document.getElementById(id);
    const parentItem = subsection.parentElement;
  
    // Toggle 'active' class to show/hide subsection
    parentItem.classList.toggle("active");
  
    // Close other open subsections (optional)
    document.querySelectorAll(".sidebar li.active").forEach(item => {
      if (item !== parentItem) {
        item.classList.remove("active");
      }
    });
  }
  
  // Add event listeners to sidebar links for subsection toggle
  document.querySelectorAll('.sidebar ul li > a').forEach(link => {
    link.addEventListener('click', function(event) {
      const targetSubsection = this.getAttribute("onclick")?.match(/'([^']+)'/)[1];
      if (targetSubsection) {
        event.preventDefault(); // Prevent scrolling for parent links
        toggleSubsection(targetSubsection); // Toggle the relevant subsection
      }
    });
  });
  
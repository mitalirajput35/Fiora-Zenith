// // drop down Section js------------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", function () {
//     const dropdownToggle = document.querySelector(".dropdownToggle");
//     const dropdownSection = document.querySelector(".dropdownSection");

//     // Toggle dropdown visibility
//     dropdownToggle.addEventListener("click", function (event) {
//         event.preventDefault();
//         dropdownSection.classList.toggle("show");
//         console.log("clicked")
//     });

//     // Hide dropdown if clicking outside
//     document.addEventListener("click", function (event) {
//         if (!dropdownToggle.contains(event.target) && !dropdownSection.contains(event.target)) {
//             dropdownSection.classList.remove("show");
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".manageProducts").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let parent = this.parentElement;
            parent.classList.toggle("active");
            let dropdown = parent.querySelector(".dropdownSection");
            if (dropdown.style.display === "block") {
                dropdown.style.display = "none";
            } else {
                dropdown.style.display = "block";
            }
        });
    });
});

// category secion dropdown---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".categorySection").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let parent = this.parentElement;
            parent.classList.toggle("active");
            let dropdown = parent.querySelector(".dropdownSection");
            if (dropdown.style.display === "block") {
                dropdown.style.display = "none";
            } else {
                dropdown.style.display = "block";
            }
        });
    });
});

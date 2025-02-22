document.addEventListener("DOMContentLoaded", function () {
    const rightSidebar = document.getElementById("rightSidebar");
    const toggleBtn = document.getElementById("toggleRightSidebar");
    const closeBtn = document.getElementById("closeRightSidebar");
    const overlay = document.getElementById("overlay");

    function toggleSidebar() {
        if (rightSidebar.style.right === "0px") {
            rightSidebar.style.right = "-300px";
            overlay.style.display = "none";
            toggleBtn.classList.remove('clicked');
        } else {
            rightSidebar.style.right = "0";
            overlay.style.display = "block";
            toggleBtn.classList.add('clicked');
        }
    }

    toggleBtn.addEventListener("click", toggleSidebar);
    closeBtn.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);
});

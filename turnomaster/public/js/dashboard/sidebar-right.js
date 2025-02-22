document.addEventListener("DOMContentLoaded", function () {
    const rightSidebar = document.getElementById("rightSidebar");
    const toggleBtn = document.getElementById("toggleRightSidebar");
    const closeBtn = document.getElementById("closeRightSidebar");
    const overlay = document.getElementById("overlay");

    function openSidebar() {
        rightSidebar.style.right = "0";
        overlay.style.display = "block";
    }

    function closeSidebar() {
        rightSidebar.style.right = "-300px";
        overlay.style.display = "none";
    }

    toggleBtn.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
});

let toggled = false;
const sidebar = document.querySelector(".navbar");
const main = document.querySelector("main");

const toggleSidebar = () => {
    console.log(toggled)
    if (!toggled) {
        console.log("toggle");
        sidebar.style.width = "12rem";
        main.style.marginLeft = "12rem";
        toggled = true;
    } else if (toggled) {
        sidebar.style.width = "3.25rem";
        main.style.marginLeft = "3.25rem";
        toggled = false; 
    }
}
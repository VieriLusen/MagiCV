// Vendor
import "./app/js/all.js";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

// Main CSS
import "./app/css/all.css";
import "./home.css";


// Pick Theme Button
const pickThemeBtn = document.querySelector(".pick-theme");
pickThemeBtn.addEventListener("click", function (event) {
    const offsetYThemeList = document.querySelector("#theme-list").offsetTop;
    window.scrollTo(0, offsetYThemeList - 90);
})

// Cek Device Mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    document.onreadystatechange = function () {
        myModal.show();
    };
}

// Theme
// const Theme = require("./app/js/classes/ThemeClasses.js");
// const theme = new Theme();
// const themeName = theme.themeName;

// var listTheme = document.getElementById('theme-list');
// let htmlListTheme = "";

// for (let i = 0; i < themeName.length; i++) {
//     htmlListTheme += `<a href="theme/${themeName[i]}"> ${themeName[i]} </a><br>`;
// }

// listTheme.innerHTML = htmlListTheme;






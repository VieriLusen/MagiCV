import './all.js';
import 'normalize.css';
import 'paper-css/paper.min.css';


// Main CSS
import '../css/all.css'
import "../css/theme.css";

// CDN
function addScript(url) {
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = url;
    document.body.appendChild(script);
}
addScript('https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js');


// Get Started Button
const getStartedBtn = document.querySelector(".get-started");
getStartedBtn.addEventListener("click", function (event) {
    const offsetYContainerSheet = document.querySelector(".container-sheet").offsetTop;
    window.scrollTo(0, offsetYContainerSheet - 20);
})

// Export PDF
const pagePdf = document.querySelector(".pagePdf");
const btnExport = document.querySelector(".exportPdf");
const optPdf = {
    margin: 0,
    filename: 'myCV.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
        dpi: 192,
        scale: 4,
        letterRendering: true,
        useCORS: true,
        scrollX: 0, scrollY: 0,
    },
};
btnExport.addEventListener("click", function () {
    html2pdf().set(optPdf).from(pagePdf).save();
})

// Back To Top Button
const toTopButton = document.querySelector(".backToTop");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 450) {
        toTopButton.classList.add("active");
        toTopButton.addEventListener("click", () => {
            window.scrollTo(0, 0)
        })
    } else {
        toTopButton.classList.remove("active");
    }
})

// window.addEventListener("beforeunload", function (e) {
//     var confirmationMessage = "Cokkkkkk";
//     /* Do you small action code here */
//     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//     return confirmationMessage;                            //Webkit, Safari, Chrome
// });




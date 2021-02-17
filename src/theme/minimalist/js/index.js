import $ from 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../../app/js/theme.js';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/beagle.css';
import MediumEditor from 'medium-editor/dist/js/medium-editor';
import AutoList from 'medium-editor-autolist';
import '../css/style.css';

const inputImage = document.querySelector("#inputImage");
const btnChangeImage = document.querySelector(".btn-img");
const previewImage = document.querySelector(".avatar");

// Jika Button Image diklik, trigger input image
btnChangeImage.addEventListener("click", function () {
    inputImage.click();
})

// Jika Input Image
inputImage.addEventListener("change", function () {
    const fileName = inputImage.value;
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    // Cek Extensi File
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
        const fileImage = URL.createObjectURL(event.target.files[0]);
        previewImage.style.backgroundImage = "url(" + fileImage + ")"; //Tampilkan photo
    } else {
        //Notif file harus berupa gambar
        const myModalImage = new bootstrap.Modal(document.getElementById("modalImage"), {});
        myModalImage.show();
    }
})

// Setting Height Body CV (Harus Menggunakan JS agar pas)
const profileElement = document.querySelector(".profile");
const pagePdfElement = document.querySelector(".pagePdf");
const bodyCVElement = document.querySelector(".body-cv");
const heightProfileElm = profileElement.offsetHeight;
const heightPagePdfElm = pagePdfElement.offsetHeight;
const heightBodyCVElm = heightPagePdfElm - heightProfileElm;
bodyCVElement.style.height = heightBodyCVElm + "px";


// Setting Height About 
const aboutElm = document.querySelector('.about');
const heightAboutElm = aboutElm.offsetHeight;
aboutElm.addEventListener("keydown", (event) => {
    const newHeightAboutElm = aboutElm.offsetHeight;
    if (newHeightAboutElm > heightAboutElm) {
        event.preventDefault();
        event.target.removeChild(event.target.lastChild);
    }

    if (event.target.children[0].textContent.length >= 220 && event.keyCode != 8) {
        event.preventDefault();
    }
})

// Medium Editor Multi
var autolist = new AutoList();
const editorMulti = new MediumEditor('.multi-line', {
    buttonLabels: 'fontawesome',
    extensions: {
        'autolist': autolist
    },
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'unorderedlist', 'orderedlist'],
    },
    paste: {
        forcePlainText: true,
        cleanPastedHTML: true,
    },
    autoLink: false
});

// const interval = setInterval(function () {
//     const containerContent = document.querySelector(".container-content");
//     if (containerContent) {
//         console.log(containerContent.offsetHeight);
//         clearInterval()
//     }
// }, 1000)


// Cegah Input Teks Lebih dari tinggi Element // Multi Line Setting
const containerContents = document.querySelectorAll(".container-content")
const heightContainerCV = document.querySelector(".container-cv").offsetHeight;
containerContents.forEach(containerContent => {
    containerContent.addEventListener("keydown", function (event) {
        const heightContainerContent = containerContent.offsetHeight;
        if (heightContainerContent >= heightContainerCV && event.keyCode != 8) {
            event.target.removeChild(event.target.lastChild);
            event.preventDefault();
        }
    });
});

// Cegah Paste Teks Lebih dari tinggi Element // Multi Line Setting
editorMulti.subscribe('editablePaste', function (event, editable) {
    const heightContainerContent = document.querySelector(".container-content").offsetHeight;
    if (heightContainerContent + 20 >= heightContainerCV) {
        event.target.removeChild(event.target.lastChild);
    }
});

// Medium Editor SIngle
const editorSingle = new MediumEditor('.single-line', {
    buttonLabels: 'fontawesome',
    toolbar: {
        buttons: ['bold', 'italic', 'underline'],
    },
    paste: {
        forcePlainText: true,
        cleanPastedHTML: true,
        doPaste: function () {

        }
    },
    autoLink: false,
    disableReturn: true,
});


const newBlockHtml = `
<div class="col">
  <div class="header single-line" max-input="24">
    <h1>Header</h1>
  </div>
  <div class="body multi-line">
    <p>Lorem ipsum dolor sit amet consectetur</p>
  </div>
</div>
<div class="options-list">
    <span class="badge rounded-pill text-dark text-white delete-block"><i
    class="fas fa-minus"></i></span>
</div>`;

// Add New Block Center CV Content
const addNewBlockBtnCenter = document.querySelector('.center-cv .add-new-block');
const containerContentCenter = document.querySelector('.center-cv .container-content');

addNewBlockBtnCenter.addEventListener("click", function (event) {
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = newBlockHtml;
    div.style.visibility = "hidden";
    containerContentCenter.appendChild(div);

    if (containerContentCenter.offsetHeight <= heightContainerCV) {
        div.style.visibility = "visible";
        // Reset Medium Editor
        editorSingle.destroy();
        editorMulti.destroy();
        setTimeout(() => {
            editorSingle.setup();
            editorMulti.setup();
        }, 500)
    } else {
        div.remove();
        const myModalBox = new bootstrap.Modal(document.getElementById("modalBox"), {});
        myModalBox.show();
    }

})

// Add New Block Side CV Content
const addNewBlockBtnSide = document.querySelector('.sidebar-cv .add-new-block');
const containerContentSide = document.querySelector('.sidebar-cv .container-content');
addNewBlockBtnSide.addEventListener("click", function (event) {
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = newBlockHtml;
    div.style.visibility = "hidden";
    containerContentSide.appendChild(div);

    if (containerContentSide.offsetHeight <= heightContainerCV) {
        div.style.visibility = "visible";
        // Reset Medium Editor
        editorSingle.destroy();
        editorMulti.destroy();
        setTimeout(() => {
            editorSingle.setup();
            editorMulti.setup();
        }, 500)
    } else {
        div.remove();
        const myModalBox = new bootstrap.Modal(document.getElementById("modalBox"), {});
        myModalBox.show();
    }
})

// Single Line Setting
containerContentSide.addEventListener('DOMNodeInserted', () => {
    const singleLine = document.querySelectorAll(".single-line");
    for (let index = 0; index < singleLine.length; index++) {
        singleLine[index].addEventListener('keydown', (event) => {
            const maxTextInput = singleLine[index].getAttribute('max-input');
            if (event.target.children[0].textContent.length === 0 && event.keyCode === 8) {
                event.preventDefault();
            } else if (event.target.children[0].textContent.length >= maxTextInput && event.keyCode != 8) {
                event.preventDefault();
            }
        });
    }
})

// Delete Block CV Content
containerContentSide.addEventListener('DOMNodeInserted', () => {
    const deleteBlockBtns = document.querySelectorAll('.delete-block');
    deleteBlockBtns.forEach(deleteBlockBtn => {
        deleteBlockBtn.addEventListener("click", () => {
            deleteBlockBtn.parentElement.parentElement.remove();
        })
    })
})










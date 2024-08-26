document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById("popup-form");
    var openPopupBtn = document.getElementById("open-popup");
    var closePopupBtn = document.getElementsByClassName("close-popup")[0];

    var popupManipulador = document.getElementById("popup-form-manipulador");
    var openPopupBtnManipulador = document.getElementById("open-popup-manipulador");
    var closePopupBtnManipulador = document.getElementsByClassName("close-popup-manipulador")[0];

    if (openPopupBtn) {
        openPopupBtn.onclick = function () {
            popup.style.display = "block";
        }
    }

    if (closePopupBtn) {
        closePopupBtn.onclick = function () {
            popup.style.display = "none";
        }
    }

    if (openPopupBtnManipulador) {
        openPopupBtnManipulador.onclick = function () {
            popupManipulador.style.display = "block";
        }
    }

    if (closePopupBtnManipulador) {
        closePopupBtnManipulador.onclick = function () {
            popupManipulador.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        } else if (event.target == popupManipulador) {
            popupManipulador.style.display = "none";
        }
    }
});

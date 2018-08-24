// Write Javascript code!
var isInitialized = false;
var cropper = '';
var file = '';

// Initialize Slider
initZoomSlider();

var _URL = window.URL || window.webkitURL;
$(document).on("change", "#cropperfile", function (e) {
    var img;
    if (file = this.files[0]) {
        img = new Image();
        img.onload = function () {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file);
            oFReader.onload = function () {
                // Destroy the old cropper instance
                $("#cropper-img").attr('src', this.result);
                $('#cropper-img').addClass('ready');
                if (isInitialized == true) {
                    $('#zoom-slider').val(0);
                    cropper.destroy();
                }
                initCropper();
            }
        };
        img.onerror = function () {
        };
        img.src = _URL.createObjectURL(file);
    }
});

function initZoomSlider() {
    console.log('zoom called');
    $("#zoom-slider").slider({
        orientation: "horizontal",
        range: "min",
        max: 1,
        min: 0,
        value: 0,
        step: 0.0001,
        slide: function () {
            if (isInitialized == true) {
                if (cropper.canvasData.naturalWidth < 611 || cropper.canvasData.naturalHeight < 418) {
                    event.preventDefault();
                } else {
                    var currentValue = $("#zoom-slider").slider("value");
                    var zoomValue = parseFloat(currentValue);
                    cropper.zoomTo(zoomValue.toFixed(4));
                }
            }
        },
        change: function () {
            if (isInitialized == true) {
                if (cropper.canvasData.naturalWidth < 611 || cropper.canvasData.naturalHeight < 418) {
                    event.preventDefault();
                } else {
                    var currentValue = $("#zoom-slider").slider("value");
                    var zoomValue = parseFloat(currentValue);
                    cropper.zoomTo(zoomValue.toFixed(4));
                }
            }
        }
    });
}

function initCropper() {
    var vEl = document.getElementById('cropper-img');
    cropper = new Cropper(vEl, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1.5,
        checkOrientation: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        guides: false,
        highlight: false,
        ready: function (e) {
            var cropper = this.cropper;
            cropper.zoomTo(0);

            var imageData = cropper.getImageData();
            var minSliderZoom = imageData.width / imageData.naturalWidth;

            $(".cr-slider-wrap").show();
            $("#zoom-slider").slider("option", "max", 1);
            $("#zoom-slider").slider("option", "min", minSliderZoom);
            $("#zoom-slider").slider("value", minSliderZoom);
        }
    });
    isInitialized = true;
}
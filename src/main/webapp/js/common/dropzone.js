$(".dropZone").on('dragover', function (event) {
    const types = event.originalEvent.dataTransfer.types;

    if(types.includes("Files")){    // * file을 드래그한 경우에만 동작
        const timeout = window.dropZoneTimeout;
        const targetInput = $(".drop-form input");
        const dragBg = $(".drag-bg");

        if (timeout) {
            clearTimeout(timeout);
        }

        targetInput.css("display", "block")
        dragBg.removeClass("none")

        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            targetInput.css("display", "none")
            dragBg.addClass("none")
        }, 100);
    }
});

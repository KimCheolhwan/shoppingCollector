$(".toggle").on("click", function () {
    const toggleContainer = $('#toggle-container');
    const toggleButton = $('.toggle-button');
    const on = $(this).is(":last-child")

    if(on){
        toggleButton.data("label", "on")

        toggleContainer.css("clipPath", "inset(0 50% 0 0)");
        toggleContainer.css("backgroundColor", "dodgerblue");

    }else{
        toggleButton.data("label", "off")

        toggleContainer.css("clipPath", "inset(0 0 0 50%)");
        toggleContainer.css("backgroundColor", "#D74046");
    }
})
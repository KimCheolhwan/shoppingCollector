$(document).on('click', ".more-container .more-btn", (event) => {   // ? 이벤트 버블링 캡처링 (https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/) 참조
    const target = event.target;    // 이벤트 대상
    const container = $(target).closest(".more-container"); // 아벤트 대상과 가장 가까운 'more-container'

    // 이벤트 대상과 가장 가까운 'more-container'의 형제들은 모두 more menu가 보이지 않도록 함
    container.closest("li").siblings("li").find(".more-container").removeClass('show-more-menu');

    // 아벤트 대상과 가장 가까운 'more-container'과 하위 element인 '.more-menu'의 속성을 toggle 시켜 기존에 보이지 않았다면 보이게, 보였다면, 보이지 않게 상태를 바꿔줌
    container.css("z-index", 3);    // * 클릭된 more-container의 z-index를 다른 more-container보다 높게 설정하여, 다른 more-container의 display 속성이 block 되어도 가려지도록 함.
    container.toggleClass("none")
    container.toggleClass('show-more-menu');
});

$(document).on('blur', ".more-container .more-btn", () => { // * 포커스가 해제된 경우 모든 more menu가 보이지 않도록 함
    const container = $(".more-container")

    container.addClass("none")
    container.removeClass('show-more-menu');
});

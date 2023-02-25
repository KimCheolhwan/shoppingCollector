(function($) {
    $(document).on("click", ".data-expands", (event) => {
        const target = event.target;
        const dataExpands = $(target).closest(".data-expands"); // ! .data-expands 하위의 element에도 click 이벤트가 발생해서 가장 가까운 .data-expands를 기준으로 잡고 하위 element 또는 상위 element의 클래스를 toggle하기 위해 closeest를 사용했음

        const tableRow = dataExpands.parent(".table-row");
        const expandable = dataExpands.parent().find('.expandable');
        const rowToggle = dataExpands.find('.row-toggle');

        if(expandable.find(".addition-row").length > 0){    // * 추가 row가 있는 경우에만 (해당 조건문이 없으면 추가 row가 없음에도 클릭시 배경색이 변함)
            tableRow.toggleClass('row-active'); // * .parent()는 어떤 요소의 부모 요소를 선택.
            expandable.toggleClass('row-open');
            rowToggle.toggleClass('row-toggle-twist');
        }
    })
})(jQuery);
function activeTab(liElem){ // * 인자로 전달된 li 태그에 해당하는 탭을 활성화
    $('#accordian ul li').removeClass("active");
    liElem.addClass('active');

    var activeWidthVerticalHeight = liElem.innerHeight();
    var activeWidthVerticalWidth = liElem.innerWidth();
    var itemPosVerticalTop = liElem.position();
    var itemPosVerticalLeft = liElem.position();
    $(".selector-active").css({
        "top":itemPosVerticalTop.top + "px",
        "left":itemPosVerticalLeft.left + "px",
        "height": activeWidthVerticalHeight + "px",
        "width": activeWidthVerticalWidth + "px"
    });
}
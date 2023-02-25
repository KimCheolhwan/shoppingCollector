$(document).ready(function initialize() {
    updateAllOrderCollectInfo();   // 주문 수집 정보 갱신
    addStripeToShopTable(); // shopTable에 줄무늬 추가
})

function addStripeToShopTable(){    // data-shop-name-en이 동일한 쇼핑몰을 하나의 row로 분류하고, 홀수번째 row에 data-even 속성에 even 값을 부여하여, 홀수, 짝수 row의 배경색이 서로 다르도록 함.
    const shopNameList = [];

    const $shopTableRow =$(".shop-table tbody tr");

    $shopTableRow.each((index, item) => {   // 각 tr 태그의 data-shop-name-en 속성을 추출하여, 주문 수집 가능한 쇼핑몰명 리스트를 생성
        shopNameList.push(item.dataset.shopNameEn);
    })

    shopNameList.forEach((shopName, index) =>{  // data-shop-name-en이 shopName인 row의 data-even 속성에 true 값을 넣어줌
        const $curTableRow = $shopTableRow.filter(`[data-shop-name-en = '${shopName}']`);

        if((index + 1) % 2 !== 0){  // 홀수번째 쇼핑몰인 경우
            // ? data 속성을 이용하여 홀수 row임을 나타냄 (jquery의 data("even", "true")로 하면 [data-even='true']로 select되지 않길래 attr()을 씀. https://stackoverflow.com/questions/7261619/jquery-data-vs-attr 참조)
            $curTableRow.attr("data-even", "true");
        }
    })
}

function updateRowOrderCollectInfo($tableRow, shopCollectInfo) { // * shopCollectInfo를 이용하여 주문 수집 정보를 tableRowELem에 기록
    const $errorTd = $tableRow.children("td.error")   // table의 row중 에러 유무를 나타내는 td 요소

    $errorTd.empty();   // error가 발생한 경우 에러 메시지를 띄우는 button을 append 하므로, 내용을 비움

    if(shopCollectInfo.error){  // 에러가 발생한 경우
        const $errorBtn = $("<button class = 'btn btn-dark'>내용 확인</button>").on(eventNames.CLICK, function () {   // 버튼 생성 및 버튼 클릭시 에러 메시지를 띄우는 이벤트 리스너 등록
            swalAlert({ // ? https://sweetalert2.github.io/ 참조
                icon: 'error',
                text: shopCollectInfo.errorMessage,  // 주문 수집 에러 메시지
            })
        })
        $errorTd.append($errorBtn);  // 버튼 추가
    }else{  // 에러가 발생하지 않은 경우
        $errorTd.text("없음");    // 버튼 없이 '성공' 텍스트만 추가
    }

    $tableRow.children(".shop-table td.shop-id").text(shopCollectInfo.shopId);
    $tableRow.children(".shop-table td.collect-date").text(shopCollectInfo.collectDate);
    $tableRow.children(".shop-table td.total-order-num").text((shopCollectInfo.totalOrderNum == null) ? xMark : shopCollectInfo.totalOrderNum);
    $tableRow.children(".shop-table td.order-confirm-num").text((shopCollectInfo.orderConfirmNum == null) ? xMark : shopCollectInfo.orderConfirmNum);
    $tableRow.children(".shop-table td.total-new-order-num").text((shopCollectInfo.totalNewOrderNum == null) ? xMark : shopCollectInfo.totalNewOrderNum);
    $tableRow.children(".shop-table td.order-confirmed").text((shopCollectInfo.orderConfirmed === null) ? xMark : ((shopCollectInfo.orderConfirmed === true)) ? "성공": "실패"); // null인 경우 "X", true인 경우 "성공", false인 경우 "실패"
}

function updateAllOrderCollectInfo(){
    $.ajax({
        url : "/collect/order/info",    // 최근 주문 수집 정보 요청
        type : "GET",
        beforeSend : beforeAjaxSend,
        success : function (collectInfoList) {
            const updateShopList = collectInfoList.map((collectInfo) => {
                return collectInfo.shopName;
            }); // 응답에서 쇼핑몰 이름만 추출

            const userUniqueShopList = Array.from(new Set(updateShopList)); // 쇼핑몰명에서 중복을 제거 (유저가 하나의 쇼핑몰에 여러개의 아이디를 등록한 경우 중복 제거가 필요)

            const $shopTable = $(".shop-table");
            $shopTable.find("tbody td").removeAttr("rowspan");    // tbody td의 rowspan 속성 모두 제거
            $shopTable.find(".additional-row").remove();  // 추가된 row 모두 삭제 (하나의 쇼핑몰에 두개 이상의 계정이 등록된 경우 추가한 row)
            $shopTable.find("td.recent-collect-info").text(xMark)    // 최근 주문 수집 정보에 모두 x 표시

            for(let shopName of userUniqueShopList){ // 유저가 주문 수집 정보를 가지고 있는 쇼핑몰에 대해서 반복
                const curShopCollectInfoList = collectInfoList.filter((collectInfo) => {
                    return (collectInfo.shopName === shopName); // 쇼밍몰명이 같은 주문 수집 정보를 묶음
                })

                const $curTableRow = $shopTable.find(`tr[data-shop-name-en='${shopName}']`);

                if(curShopCollectInfoList.length === 1){    // 해당 쇼핑몰의 주문 수집 정보가 하나인 경우
                    const curShopCollectInfo = curShopCollectInfoList[0];
                    updateRowOrderCollectInfo($curTableRow, curShopCollectInfo); // 주문 수집 정보 update
                }else if(curShopCollectInfoList.length > 1){    // 해당 쇼핑몰의 주문 수집 정보가 하나 이상인 경우
                    $curTableRow.children("td").not(".recent-collect-info").attr("rowspan", curShopCollectInfoList.length); // 주문 수집 정보를 나타내지 않는 td element의 rowspan을 지정하여 테이블이 split 되도록 한다.

                    updateRowOrderCollectInfo($curTableRow, curShopCollectInfoList[0]);  // 주문 수집 정보 중 하나는 기존 row에 작성

                    for(let i = 1; i < curShopCollectInfoList.length; i++){ // 그 외 나머지 주문 수집 정보는 추가 row에 작성
                        const $cloneTableRow = $curTableRow.clone();  // 주문 수집 정보를 update하려는 row를 복사
                        $cloneTableRow.addClass("additional-row")    // 추가된 테이블임을 나타내는 clsss를 추가
                        $cloneTableRow.children("td").not(".recent-collect-info").remove(); // 주문 수집 정보가 아닌 column은 지움
                        $curTableRow.after($cloneTableRow)    // 기존 row 뒤에 추가
                        updateRowOrderCollectInfo($cloneTableRow, curShopCollectInfoList[i]);   // 주문 수집 정보 update
                    }
                }
            }
        },
        error : function (xhr) {
            const timeout = sessionTimeoutCheck(xhr);
            if(!timeout) swalAlert({icon : "error", html : "주문수집 정보 요청 실패!"});
        }
    })
}

function shopTableMouseEventHandler(event) { // * shopTable의 mouseenter, mouseleave 이벤트에 대한 핸들러
    const $targetRowShopNm = $(this).data("shopNameEn"); // 이벤트가 발생한 table row에 해당하는 쇼핑몰 명(영문)
    const eventSelector = event.handleObj.selector // jquery의 on 함수에 전달된 selector

    const eventType = event.type;   // event의 type
    const $sameShopNmRow = $(eventSelector).filter(`[data-shop-name-en = '${$targetRowShopNm}']`); // 이벤트가 발생한 row와 동일한 data-shop-name-en 속성을 가진 row elem

    if (eventType === eventNames.MOUSE_ENTER)   // mouseenter 이벤트인 경우
        $sameShopNmRow.addClass("hover");    // 이벤트가 발생한 row와 동일한 data-shop-name-en 속성을 가진 row들에 hover 클래스를 추가 (같은 쇼핑몰명을 가진 row들을 하나의 row처럼 표현하기 위해)
    else if (eventType === eventNames.MOUSE_LEAVE){ // mouseleave 이벤트인 경우
        $sameShopNmRow.removeClass("hover");    // 이벤트가 발생한 row와 동일한 data-shop-name-en 속성을 가진 row들의 hover 클래스를 제거 (같은 쇼핑몰명을 가진 row들을 하나의 row처럼 표현하기 위해)
    }
}

$(document).on("mouseenter", ".shop-table tbody tr", shopTableMouseEventHandler)    // * shopTable의 mouseenter 이벤트에 대한 핸들러
$(document).on("mouseleave", ".shop-table tbody tr", shopTableMouseEventHandler)    // * shopTable의 mouseleave 이벤트에 대한 핸들러

$(".collect-option-table__collect-mode").on("click", async function () {
    const collectMode = $(this).data("mode");
    const $checkedShopList = $(".shop-table tbody input[type = 'checkbox']:checked");    // 체크된 쇼핑몰 목록
    const checkedShopNum = $checkedShopList.length;  // 체크한 쇼핑몰의 개수
    let collectReqCompleteNum = 0;    // 완료된 주문 수집 요청의 수

    if($checkedShopList.length === 0){
        swalAlert({icon : "error", html : "주문 수집 대상 쇼핑몰을 선택해주세요!"});
        return;
    }

    loading(true);  // 로딩창 생성

    for(let checked of $checkedShopList){    // 체크한 쇼핑몰 각각에 대해서 반복
        const $parentTableRow = checked.closest("tr");
        const shopNameEn = $parentTableRow.dataset.shopNameEn;   // 쇼핑몰명(영문)
        const shopNameKo = $parentTableRow.dataset.shopNameKo;   // 쇼핑몰명

        $.ajax({
            url : `/collect/order?mode=${collectMode}&shopName=${shopNameEn}`,   // 주문 수집 요청
            type : "GET",
            beforeSend : beforeAjaxSend,
            success : function (res) {
                const apiResponse = res.apiResponse;
                const result = apiResponse.result
                const apiErrorMessage = apiResponse.errorMessage

                if(result){   // 크롤링 결과 확인
                    const fileExist = res.fileExist;    // 다운로드 받을 파일 유무
                    if(fileExist){
                        const fileId = res.fileId
                        fileDownload({
                            fileId : fileId,
                            errorMessage : `${shopNameKo} zip 파일 다운로드 실패!`
                        })
                    }
                }else{
                    alert(`${shopNameKo} : ${apiErrorMessage}`)   // ! ajax 결과에 대한 메시지는 swalAlert가 아닌 alert로 하여 모두 확인 할 수 있도록 함.
                }
                updateAllOrderCollectInfo();   // 주문 수집 정보 갱신
            },
            error : function (xhr) {
                const timeout = sessionTimeoutCheck(xhr);
                if(!timeout) alert(`${shopNameKo} 주문 수집 실패!`)
            },
            complete : function () {
                collectReqCompleteNum++;
            }
        })
    }

    while(true){
        if(checkedShopNum === collectReqCompleteNum){
            loading(false); // 체크된 쇼핑몰의 주문 수집 요청이 모두 완료된 경우 로딩창 제거
            break;
        }
        await delay(300);
    }
});

$(".option-desc").click(function () {
    swalAlert({
            icon : "question",
            title : "주문 수집 프로세스",
            width : "560px",
            html : `<strong>신규 : </strong>신규 주문 수집 <strong>-></strong> 발주확인 <br>
                    <strong>전체 : </strong>발주확인 <strong>-></strong> 배송준비중 주문 수집 <br>
                    <strong>신규 + 전체 : </strong>신규 주문 수집 <strong>-></strong> 발주확인 <strong>-></strong> 배송준비중 주문 수집`,
    })
})

$(".collect-info-desc").click(function () {
    swalAlert({
        icon : "question",
        width : "450px",
        html : `<strong>X</strong>는 확인되지 않은 정보를 의미합니다.<br><br>
                <strong>총 주문 개수</strong>는 발주확인한 후의 전체 주문 개수입니다.<br><br>
                <strong>발주확인 개수</strong>는 추가 구매한 상품이 같이 발주처리되어 신규 주문 개수보다 적을 수 있습니다.`,
    })
})
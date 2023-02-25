const optionApplyButton = $(".option-apply");
const optionSwitch = $(".option-switch input[type='checkbox']");

$(document).ready(function initialize() {
    optionSwitchCheck(false) // 옵션 여부 switch의 상태를 바꾸어 이벤트가 발생하도록 하여 입력 폼을 생성하도록 함
});

function optionSwitchCheck(check){    // check가 true이면 옵션 스위치를 체크, false이면 체크 해제
    optionSwitch.prop('checked',check).trigger('change');    // 옵션 여부 swtich를 활성화하여 입력 폼을 생성하도록 함
                                                             // * trigger("change")로 인해 property를 변경해도 change 이벤트가 발생하도록 함.
}

optionSwitch.on("change", async function () {  // 옵션 여부 swtich 상태 변경 시
    const option = optionSwitch.prop("checked");   // 옵션 적용 여부

    await addCategoryOption("select[data-label = 'category']")  // 각 카테고리를 select 태그의 옵션에 추가

    if(option){ // * 옵션을 설정한 경우
        $("div[data-option='on']").removeClass("none");
        $("div[data-option='off']").addClass("none");
    }else{  // * 옵션을 설정하지 않은 경우
        $("div[data-option='off']").removeClass("none");
        $("div[data-option='on']").addClass("none");

        addUnitOption("div[data-option='off'] select[data-label = 'unit']");    // 단위 선택 요소에 가능한 단위를 추가함
    }
})

$(document).on("click", ".add-option", () => {    // * 옵션 추가 버튼 클릭시
    const optionListElem = $(".option-wrap");   // * 옵션 리스트
    const optionLength = optionListElem.length;  // * 옵션 리스트 개수
    const lastOptionElem = optionListElem.last();   // * 마지막 옵션
    let cloneOptionElem = lastOptionElem.clone(true);   // * 이벤트도 clone 하기 위해 true를 전달

    cloneOptionElem.find(".input-wrap").find(".input-wrap__input-header, .empty-area").remove();    // row를 추가하면서 필요하지 않은 header와 empty 태그는 삭제
    cloneOptionElem.find("input").val("");  // 입력된 값 지움

    optionApplyButton.prop("disabled", true);  // '목록으로 적용'버튼 disable

    // 마지막 옵션의 추가 버튼 제거
    lastOptionElem.find(".add-option").remove();

    if(optionLength === 1){   // * 옵션의 개수가 1개일 때 추가를 누른 경우
        // 삭제 버튼 추가
        cloneOptionElem.find(".add-option").parent().css("flex-direction", "row");  // 버튼 추가의 부모 요소인 input-wrap의 flex-direction 속성을 row로 변경하여, 버튼이 가로로 배치되도록 함.
        cloneOptionElem.find(".add-option").before('<button type="button" class="btn btn-danger delete-option">삭제</button>');   // 옵션 삭제 버튼 추가
    }

    lastOptionElem.after(cloneOptionElem)   // 복사한 마지막 옵션을 붙여넣음
})

$(document).on("click", ".delete-option", (event) => {  // * 옵션 삭제 버튼 클릭시
    const target = event.target;
    const isLast = $(target).closest(".option-wrap").is(":last-of-type");

    $(target).closest(".option-wrap").remove(); // * 해당 옵션 삭제

    if(isLast){ // * 삭제하는 옵션이 마지막 옵션이었다면
        const optionListElem = $(".option-wrap");   // * 옵션 리스트
        const lastOptionElem = optionListElem.last();   // * 마지막 옵션

        lastOptionElem.find(".input-wrap").last().append('<button type="button" class="btn btn-success add-option">추가</button>') // 삭제 후, 마지막 옵션에 추가 버튼 추가
    }
})

function optionInputCheck(){    // * 옵션 정보를 입력하는 모든 input 태그에 값이 입력 여부에 따라 '목록으로 적용'버튼 disable 또는 enable
    const optionInfoInputElem = $("div[data-option='on'] .option-input-list input");  // 옵션 정보를 입력받는 input 태그 select
    let allOptionFilled = true;

    optionInfoInputElem.each((index, item) => { // 옵션 정보를 입력하는 각각의 input의 값을 확인하여, 모두 입력되었는지 확인
        if(!item.value){    // 값이 입력되지 않은 input이 있는 경우
            allOptionFilled = false;   // flag를 false로 수정
        }
    })

    if(allOptionFilled) { // 옵션 정보를 입력하는 모든 input 태그에 값이 입력된 경우
        optionApplyButton.prop("disabled", false);  // '목록으로 적용'버튼 enable
    }else{
        optionApplyButton.prop("disabled", true);  // '목록으로 적용'버튼 disable
    }
}

$(document).on("click", ".delete-option", optionInputCheck);    // * 옵션 삭제시에도 남아있는 옵션 정보가 모두 입력되었는지 확인
$(document).on("propertyChange keyup paste focus input", "div[data-option='on'] .option-input-list input", optionInputCheck) // * 옵션 정보를 입력받는 input 태그에 입력될 때 입력 여부에 따라 '목록으로 적용' 버튼을 disable 또는 enable

optionApplyButton.on("click", function () { // * 옵션 목록으로 적용 버튼 클릭시
    const productName = $("div[data-option='on'] input[data-label = 'productName']").val().trim(); // 상품명 (양쪽 공백 제거)

    if(!productName){    // * 상품명이 입력되지 않은 경우
        swalAlert({icon : "error", html : "상품명을 입력해주세요."})
        return;
    }else{
        const optionValueElem = $("div[data-option='on'] .option-input-list input[data-label='optionValue']")   // 옵션값을 입력받는 input 태그 select
        const optionValueGroupList = [];

        optionValueElem.each((index, item) => { // 각 옵션값 input 태그에 대해서 함수 실행
            const optionValue = item.value; 
            const optionValueGroup = optionValue.split(",").map((optionValue) => {
                return optionValue.trim();
            }).filter((optionValue) => {    // 공백인 옵션값은 제거
                if(optionValue)
                    return optionValue;
            })// input 태그의 값을 ','으로 분리하고, 각 옵션값의 양쪽 공백을 제거
            
            optionValueGroupList.push(optionValueGroup);
        })

        const noDupOptionValueGroupList = removeDupOf2D(optionValueGroupList);  // 옵션값의 중복을 제거
        const allCase = makeAllCaseOf2d(noDupOptionValueGroupList)   // 옵션의 모든 경우의 수

        const productNameList = allCase.map((optionValue) => {
            return productName + " " + optionValue; // * 상품명과 각 옵션값을 연결
        })

        $(".table-resizable tbody tr").remove();    // 테이블의 기존 row 삭제

        if(productNameList.length !== 0){   // 테이블에 추가할 상품이 존재하는 경우
            $(".product-info-container .no-product").addClass("none");  // 상품이 없음을 나타내는 요소 삭제
        }

        for(let productName of productNameList){
            const productRow = [
                `<tr>`,
                    `<td><label class="checkbox"> <input type="checkbox" name="chkProd"> <span class="icon"></span></label></td>`,
                    `<td data-label = "productName" contenteditable>${productName}</td>`,
                    `<td data-label = "amount"></td>`,
                    `<td data-label = "unit"></td>`,
                    `<td data-label = "warehouseDate"></td>`,
                    `<td><button type="button" class="delete-row">삭제</button></td>`,
                `</tr>`].join("")

            $(".table-resizable tbody").append(productRow)
        }
    }
})

$(document).on("click", ".delete-row", (event) => { // * 상품 목록 삭제 버튼 클릭시
    const target = event.target;
    deleteProductTableRow($(target).closest("tbody tr"))    // 해당 상품 삭제
})

$(document).on("click", ".delete-all-row", () => {  // * 상품 목록 선택 삭제 버튼 클릭시
    const checked = $(".table-resizable input[type='checkbox']:checked");
    deleteProductTableRow(checked.closest("tbody tr"))  // 선택된 상품 목록 삭제
    checked.prop("checked", false)  // 체크되었던 체크 박스 모두 체크 해제
})

function deleteProductTableRow(selector) {
    $(selector).remove();    // selector에 해당하는 row 삭제
    const productNum = $(".table-resizable tbody tr").length;   // 테이블 내에 추가된 상품 개수

    if(productNum === 0){   // 상품 삭제 후, 남아있는 상품이 없다면
        $(".product-info-container .no-product").removeClass("none");
    }
}

$(document).on("click", "td[data-label='unit']", (event) => {inputUnit(event.target)})  // * 단위를 입력받는 테이블의 셀 클릭시
$(".table-resizable th .blanket-apply[data-label = 'unit']").on("click", () => {inputUnit(".table-resizable tbody td[data-label='unit']")})     // * 단위 일괄적용 버튼 클릭시

function inputUnit(selector){
    const html = [
        `<label class = 'swal2-input-label'>단위</label>`,
        `<select class = 'swal2-select swal2-input' data-label = "unit" style = "display: flex"></select>`
    ].join("");

    swalConfirm({
        html : html,
        preConfirm : () => {
            const selectedUnit = $(".swal2-select[data-label = 'unit']").val()  // 사용자가 선택한 상품 단위
            $(selector).text(selectedUnit)    // * 클릭된 셀에 기록
        }, onOpen : ()=> {
        addUnitOption(".swal2-select[data-label = 'unit']") // * selector에 해당하는 요소에 상품 단위 option을 추가해준다.
        }
    });
}

$(document).on("click", "td[data-label='warehouseDate']", (event) => {inputWarehouseDate(event.target)}) // * 입고일을 입력받는 테이블의 셀 클릭시
$(".table-resizable th .blanket-apply[data-label = 'warehouseDate']").on("click", () => {inputWarehouseDate(".table-resizable tbody td[data-label='warehouseDate']")})     // * 입고일 일괄적용 버튼 클릭시

function inputWarehouseDate(selector){
    const html = [
        `<label class = 'swal2-input-label'>입고일</label>`,
        `<input class="swal2-input" data-label = "warehouseDate" type="date" style="display: flex">`
    ].join("");

    swalConfirm({
        html : html,
        preConfirm : () => {
            const warehouseUnit = $(".swal2-input[data-label = 'warehouseDate']").val()  // 사용자가 선택한 상품 단위

            $(selector).text(warehouseUnit)    // * 클릭된 셀에 기록
        }
    });
}

$(document).on("click", "td[data-label='amount']", (event) => {inputAmount(event.target)})     // * 재고수량을 입력받는 테이블의 셀 클릭시
$(".table-resizable th .blanket-apply[data-label = 'amount']").on("click", () => {inputAmount(".table-resizable tbody td[data-label='amount']")})     // * 재고수량 일괄적용 버튼 클릭시


function inputAmount(selector) {    // 상품 수량을 입력 받아 selector의 text에 기록
    const html = [
        `<label class = 'swal2-input-label'>수량</label>`,
        `<input class = "swal2-input" data-label = "amount" placeholder="재고수량 입력" type="text" inputmode="numeric" style="display: flex">`
    ].join("");

    swalConfirm({
        html : html,
        preConfirm : () => {
            const amount = $(".swal2-input[data-label = 'amount']").val()  // 사용자가 선택한 상품 단위

            $(selector).text(amount)    // * 클릭된 셀에 기록
        }
    });
}

$(".confirm-button").on("click", function () {   // 확인 버튼 클릭시
    const productInfoList = []; // 등록할 상품들의 정보를 담는 list

    const option = optionSwitch.prop("checked");   // 옵션 적용 여부
    const tabElem = $(`div[data-option='${(option) ? "on" : "off"}']`);  // 옵션이 적용된 경우 data-option이 'on' 하위의 element들에 대해서 동작, 옵션이 적용되지 않은 경우 'off' 하위의 element들에 대해서 동작

    const categorySelectElem = tabElem.find("select[data-label = 'category']"); //   카테고리 선택 element
    const categoryName = categorySelectElem.children("option:selected").val();  // 카테고리명
    const manufacturer = tabElem.find("input[data-label = 'manufacturer']").val();


    if(!categoryName){  // 선택된 카테고리가 없는 경우
        swalAlert({icon : "error", html : "카테고리를 선택해주세요!"})
        return;
    }

    if(option){   // 옵션을 설정한 경우
        const productTable = $(".product-info-table");   // 상품 등록 테이블
        const productInfoRow = productTable.find("tbody tr");
        const productNum = productInfoRow.length;   // 등록할 상품 개수

        if(productNum === 0){
            swalAlert({icon : "error", html : "추가할 상품 정보가 없습니다."})
            return;
        }

        productInfoRow.each((index, productInfo) => {
            const productName = $(productInfo).find("td[data-label = 'productName']").text(); // 상품명
            const amount = $(productInfo).find("td[data-label = 'amount']").text();
            const unit = $(productInfo).find("td[data-label = 'unit']").text();
            const warehouseDate = $(productInfo).find("td[data-label = 'warehouseDate']").text();

            productInfoList.push({
                categoryName : categoryName,
                name : productName,
                amount : amount.replace(/,/gi, ""),
                unit : unit,
                warehouseDate : warehouseDate,
                manufacturer : manufacturer
            })
        })
    }else{  // 옵션을 설정하지 않은 경우
        const productName = tabElem.find("input[data-label = 'productName']").val();
        const amount = tabElem.find("input[data-label = 'amount']").val();
        const unit = tabElem.find("select[data-label = 'unit']").val();
        const warehouseDate = tabElem.find("input[data-label = 'warehouseDate']").val();

        if(!productName){    // 상품명을 입력하지 않은 경우
            swalAlert({icon : "error", html : "상품명을 입력해주세요!"})
            return;
        }

        productInfoList.push({
            categoryName : categoryName,
            name : productName,
            amount : amount.replace(/,/gi, ""),
            unit : unit,
            warehouseDate : warehouseDate,
            manufacturer : manufacturer
        })
    }

    manipulateProduct({
        type : "POST",
        successObj : {
            message : "상품 추가 성공",
            preConfirm : () => {
                $(window).off("beforeunload");  // * 상품 추가에 성공하여 페이지를 이동하는 경우에는 확인 대화 상자 표시하지 않음.
                location.href = inventoryManageUrl; // * 상품 추가 성공 후, alert 창에서 확인 버튼을 클릭하면 재고관리 페이지로 이동.
            }
        },
        errorObj : {
            message : "추가 실패!",
        },
        data : productInfoList
    })
})


$(".cancel-button").on("click", function () {   // 취소 버튼 클릭시
    location.href = inventoryManageUrl;
})

$(window).on("beforeunload", function() {    // * 페이지 이동시 confirm창 띄움
    return beforeUnloadMessage;
});

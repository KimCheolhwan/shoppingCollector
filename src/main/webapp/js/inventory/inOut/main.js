const values = [{name : "in", text : "입고"}, {name : "out", text : "출고"}];
const IN_OUT_MIN_VAL = 1;

$(document).ready(function initialize() {
    addSearchResultToList("")   // 상품 전체를 상품 정보 리스트에 추가
})
$("input[name = 'in-out-radio']").on("click", function (){
    const pickerProdNmElem = $(".product-picker .product-row__product-name");

    pickerProdNmElem.each((index, item) => {    // 상품 선택 목록의 각 상품의 입/출고 수량을 업데이트
        const prodNm = $(item).text();
        updateVariation(prodNm);
    })
})

$(".uploadExcelForm__input").on("change", function () { // * 입출고 엑셀 업로드
    const validFileType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];  // 업로드 가능한 파일 형식 (각각 xlsx, xls를 나타냄) TODO : 변경시 file input 태그의 accept도 변경
    const validFileExtension = ["xlsx", "xls"];

    const file = $(this).prop("files")[0];
    $(this).val("") // * input 태그의 값을 비워서 같은 파일을 선택해도 이벤트가 동작하도록 함.

    const inOutRadioElem = $(".in-out-container input[name = 'in-out-radio']:checked")  // 입/출고 선택 radio 버튼
    const inOutName = inOutRadioElem.val();  // 입/출고 radio 버튼 중 선택된 값
    const inOutTxt = getTxtFromName(values, inOutName);  // 입/출고 radio 버튼 중 선택된 값을 text로 변환
    
    if(file){   // 파일이 선택된 경우
        const filename = file.name;

        if(!validFileType.includes(file.type)){ // ! 지원하는 파일 형식이 아닌 경우
            swalAlert({
                icon : "error",
                html : `지원하는 파일 형식이 아닙니다. <br> <strong>(지원 확장자 : ${validFileExtension.join(", ")})</strong>`
            });
        }else{
            swalConfirm({
                html : `<strong>'${filename}'</strong>의 내용을<br> <strong>${inOutTxt}</strong> 처리하시겠습니까?`,
                preConfirm : () => {
                    const reader = new FileReader();

                    reader.onload = async function(){
                        try{
                            const fileData = reader.result;
                            const inOutInfoList = [];   // 입/출고 상품 정보

                            const wb = XLSX.read(fileData, {type : 'binary'});
                            const firstSheetNm = wb.SheetNames[0]
                            const firstSheet = wb.Sheets[firstSheetNm];  // * 첫번째 sheet만 입/출고

                            const rowList =XLSX.utils.sheet_to_json(firstSheet);  //  ? https://eblo.tistory.com/83 참조
                            const prodNmHeader = "상품명"; // 입/출고할 상품 정보를 추출할 열 이름.

                            const header = getHeaderRow(firstSheet);    // 엑셀 파일에서 헤더명만 추출

                            if(!header.includes(prodNmHeader)){ // 엑셀 파일에 입/출고 정보를 추출할 헤더명이 존재하지 않는 경우
                                swalAlert({icon : "error", html : `엑셀 파일에 <strong>'${prodNmHeader}'</strong> 헤더가 없습니다.`});
                                return;
                            }

                            const categoryName = "전체";  // * 상품 전체를 대상으로 검색
                            const query = "";
                            const useProdInfoList = await getProducts(categoryName, query); // 사용자의 상품 정보 요청
                            const selectedProductList = getSelectedProdNmList();

                            for(let row of rowList){    // excel 파일의 각 row 순회
                                const index = row["__rowNum__"];    // 현재 행 번호 (__rowNum__은 헤더를 제외하고 1부터 시작)
                                const rowValue = row[prodNmHeader].trim();    // '상품명'열의 행 값
                                let inoutInfoStrList = rowValue.split(","); // 행 값을 ','를 구분자로 분리

                                if(rowValue === ""){ // * 행의 값이 공백인 경우 건너뜀 (위 코드에서 trim()을 호출함으로써 여러개의 공백이 연결되어 있는 행도 건너뛸 수 있음)
                                    break;
                                }

                                for(let inOutInfoValStr of inoutInfoStrList){
                                    const inoutInfo = inOutInfoValStr.split("/");   // '/'를 구분자로 분리
                                    const prodNm = (inoutInfo[0]) ? inoutInfo[0].trim() : inoutInfo[0]; // 상품명이 존재하는 경우 양쪽 공백 제거
                                    let variation = (inoutInfo[1]) ? inoutInfo[1].trim() : inoutInfo[1]; // 입/출고 수량이 존재하는 경우 양쪽 공백 제거

                                    if(!(prodNm && variation)){
                                        swalAlert({icon : "error", html : `<strong>'${inOutInfoValStr}'</strong>에서 ${inOutTxt} 수량을 찾을 수 없습니다. (${index + 1}행)`});  // * __rowNum__은 헤더를 제외하고 1부터 시작하므로 index + 1
                                        return;
                                    }

                                    if(isNaN(parseInt(variation))){    // 입/출고 수량이 정수가 아닌 경우
                                        swalAlert({icon : "error", html : `'<strong>${variation}</strong>'은(는) 정수가 아닙니다. (${index + 1}행)`})
                                        return;
                                    }else{
                                        variation = parseInt(variation);    // 입/출고 수량을 정수로 변환
                                    }

                                    let categoryNm = null;

                                    if(selectedProductList.includes(prodNm)){   // 입/출고할 상품의 이름이 선택된 상품 목록에 이미 포함된 경우
                                        swalAlert({icon : "error", html : `<strong>'${prodNm}'</strong>은(는) 이미 선택된 상품 목록에 포함되어 있습니다. (${index + 1}행)`})
                                        return;
                                    }

                                    for(let useProdInfo of useProdInfoList){    // 입/출고할 상품의 이름이 등록되어 있는지 확인
                                        if(useProdInfo.name === prodNm){    // 입/출고할 상품의 이름이 등록되어 있다면   
                                            categoryNm = useProdInfo.categoryName;  // 해당 상품의 카테고리를 추출
                                        }
                                    }

                                    if(categoryNm === null){    // 입/출고할 상품의 이름이 등록되어 있지 않아 카테고리를 찾지 못한 경우
                                        swalAlert({icon : "error", html : `<strong>'${prodNm}'</strong>은(는) 등록된 상품이 아닙니다. (${index + 1}행)`})
                                        return;
                                    }

                                    let duplicateProd = false;  // 중복된 상품명인지 나타내는 flag

                                    inOutInfoList.forEach((inoutInfo) => {
                                        if(inoutInfo.prodNm === prodNm){    // 입/출고 정보 목록 중에 상품명이 prodNm인 상품이 이미 있는 경우
                                            inoutInfo.variation += variation;   // 입/출고 수량을 더해줌
                                            duplicateProd = true;
                                        }
                                    })

                                    if(!duplicateProd)  // 입/출고 상품 목록에 상품명이 prodNm인 상품이 없는 경우
                                        inOutInfoList.push({categoryNm : categoryNm, prodNm : prodNm, variation : variation})   // 입/출고 상품 목록에 추가 
                                }
                            }

                            for(let inOutInfo of inOutInfoList){    // 입/출고할 상품들을 선택된 상품 목록에 추가
                                appendProductToPickedList(inOutInfo.categoryNm, inOutInfo.prodNm, inOutInfo.variation)
                            }
                        }catch(err){
                            swalAlert({icon : "error", html : `엑셀 등록 실패!`});
                            return;
                        }
                    };

                    reader.readAsBinaryString(file);
                }
            })
        }
    }
})

$(document).on("click", ".product-picker .product-list__product-row", function (event) {    // * 상품 목록의 상품을 클릭한 경우
    const target = event.target;
    const pickerProdRowElem = $(target).closest(".product-picker .product-list__product-row"); // 클릭된 상품 elem

    const active = pickerProdRowElem.hasClass("active");    // 클릭된 상품이 선택 상태인지, 선택 해제 상태인지 확인
    const prodNm = pickerProdRowElem.children(".product-row__product-name").text(); // 클릭된 상품의 이름

    if(!active){ // * 선택된 경우
        const categoryNm = pickerProdRowElem.children(".product-row__category").text();
        appendProductToPickedList(categoryNm, prodNm, IN_OUT_MIN_VAL)   // 선택된 상품 목록에 상품 정보 추가
    }else{  // * 선택 해제된 경우
        releaseSelectedProduct(prodNm) // 상품명이 productName인 상품 선택 해제
    }
})

function appendProductToPickedList(categoryNm, prodNm, variation){ // 선택된 상품 목록에 상품 정보 추가
    const prodRowElem = $(
                        `<div class="product-list__product-row">
                            <button class="kakao-btn btn-del"><span class="kakao-ico ico-del"></span></button>
                            <input class="product-row__variation" type="number" value=${variation} min=${IN_OUT_MIN_VAL}/>
                            <div class="product-row__product-name">${prodNm}</div>
                            <div class="product-row__category">${categoryNm}</div>
                        </div>`)
    const pickedProdListElem = $(".picked-product .product-list");   // 선택된 상품 list elem

    pickedProdListElem.append(prodRowElem);    //  선택된 상품 목록에 추가
    activePickerProd(true, prodNm) // 상품 선택 목록에서 상품명이 prodNm인 상품을 활성화

    updatePickedSummary()   // 선택된 총 상품의 수량, 총 입/출고 수량을 나타내는 요소를 업데이트
    updateVariation(prodNm)    // 상품 선택 목록의 입/출고 수량 업데이트
}

$(document).on("propertyChange keyup paste input", ".picked-product .product-row__variation", (event) => {   // * 증감수량 입력 시
    const target = event.target;
    const prodRowElem = $(target).closest(".product-list__product-row");
    const prodNm = prodRowElem.children(".product-row__product-name").text();
    const targetInputValue = parseInt(target.value);  // 이벤트가 발생한 input 요소의 값.

    if(!(Number.isInteger(targetInputValue) && targetInputValue >= IN_OUT_MIN_VAL)){ // 입/출고 최소 수량보다 작거나 정수가 아닌 경우
        target.value = "";  // 입력값을 비움
    }

    updatePickedSummary() // 선택된 총 상품의 수량, 총 입/출고 수량을 나타내는 요소를 업데이트
    updateVariation(prodNm)    // 상품 선택 목록의 입/출고 수량 업데이트
})

function getTotalVariation(){   // * 총 입/출고 수량 반환
    const pickedProdListElem = $(".picked-product .product-list");   // 선택된 상품 list elem
    const variationInputElem = pickedProdListElem.find(".product-row__variation");    // 입/출고 수량을 입력받는 요소
    let totalVariation = 0;

    variationInputElem.each((index, item) => {
        const variation = parseInt(item.value);
        if(Number.isInteger(variation)) // 공백인 경우 NaN 출력하므로 정수인지 다시 한 번 체크
            totalVariation += variation;   // 입/출고 수량 모두 더함
    })

    return totalVariation;
}

function updatePickedSummary(){ // 선택된 총 상품의 수량, 총 입/출고 수량을 나타내는 요소를 업데이트
    updateTotalProductCount(); // 총 상품 수량을 나타내는 요소를 업데이트
    updateTotalVariation(); // 총 입/출고 수량을 나타내는 요소를 업데이트
}

function updateTotalVariation(){  // * 총 입/출고 수량을 나타내는 요소를 업데이트
    let totalVariation = getTotalVariation();

    const totalVariationElem = $(".picked-summary__variation");
    totalVariationElem.text(totalVariation);    // 총 입/출고 수량 업데이트
}

$(document).on("click", ".picked-product .product-list__product-row .btn-del", function (event) {   // * 선택된 상품 목록해서 삭제 버튼을 클릭한 경우
    const target = event.target;
    const prodRow = $(target).closest(".product-list__product-row")  // 클릭된 삭제 버튼 상위의 product-row elem
    const prodNm = prodRow.children(".product-row__product-name").text();   // 해당 product-row elem 하위의 상품명을 나타내는 elem로부터 삭제하려는 상품의 이름을 추출

    releaseSelectedProduct(prodNm) // 상품명이 productName인 상품 선택 해제
})

function getTotalProductCount(){
    const pickedProdListElem = $(".picked-product .product-list");   // 선택된 상품 list elem
    return pickedProdListElem.children(".product-list__product-row").length   // 선택된 상품 수량;
}

function updateTotalProductCount(){  // 총 상품 수량을 나타내는 요소을 업데이트
    const productCount = getTotalProductCount()   // 선택된 상품 수량
    const productCountElem = $(".picked-summary__product-count");

    productCountElem.text(productCount);    // 총 상품 수량 업데이트
}

function releaseSelectedProduct(releaseProdNm){    // * 상품명이 productName인 상품 선택 해제
    const pickedProdListElem = $(".picked-product .product-list");   // 선택된 상품 list elem

    pickedProdListElem.find(".product-row__product-name").each((index, item) => {   // * 선택된 상품 list에서 상품명이 releaseProductName인 상품을 제거한다. TODO : 상품 테이블 구조 변경시 수정 필요(상품명이 기본키가 아닌 경우)
        const curProductName = item.textContent;
        if(curProductName === releaseProdNm){
            $(item).closest(".product-list__product-row").remove();
        }
    })

    activePickerProd(false, releaseProdNm) // 상품 선택 목록에서 상품명이 releaseProdNm인 상품을 비활성화
    updatePickedSummary();    // 선택된 총 상품의 수량, 총 입/출고 수량을 나타내는 요소를 업데이트
    updateVariation(releaseProdNm)    // 상품 선택 목록의 입/출고 수량 업데이트
}

function activePickerProd(active, prodNm){  // 상품 선택 목록의 상품을 활성화 또는 비활성화
    const pickerProdListElem = $(".product-picker .product-list");   // 상품 목록 list elem

    pickerProdListElem.find(".product-row__product-name").each((index, item) => {   // * 상품 선택 목록에서 각각의 상품들의 상품명을 확인 TODO : 상품 테이블 구조 변경시 수정 필요(상품명이 기본키가 아닌 경우)
        const curProductName = item.textContent;
        if(curProductName === prodNm){
            if(active)  // 활성화하는 경우
                $(item).closest(".product-list__product-row").addClass("active");
            else    // 비활성화 하는 경우
                $(item).closest(".product-list__product-row").removeClass("active");
        }
    })
}

function getSelectedProdNmList(){   // * 현재 선택된 상품들의 이름을 반환
    const pickedProdListElem = $(".picked-product .product-list");   // 선택된 상품 list elem
    const prodNmList = [];

    pickedProdListElem.find(".product-row__product-name").each((index, item) => {
        prodNmList.push(item.textContent);
    })

    return prodNmList;
}

$(document).on("submit", ".search-form", (event) => {   // * 상품 검색 submit시
    const target = event.target;
    searchFormSubmitHandler(event);

    const tableUpdate = $(target).data("tableUpdate");
    const searchInputElem = $(target).children(".search-form__search-input");

    if(tableUpdate){    // * table-update 속성이 true인 경우 테이블을 업데이트
        const query = searchInputElem.val();
        addSearchResultToList(query);  // 검색 결과를 상품 정보 리스트에 반영
    }
})

async function addSearchResultToList(query = ""){
    const categoryName = "전체";  // * 상품 전체를 대상으로 검색
    const productListElem = $(".product-picker .product-list");
    const productInfoList = await getProducts(categoryName, query);
    const noProductElem = $(".no-product");

    productListElem.children(".product-list__product-row").remove()    // 기존 검색 정보 삭제

    if(productInfoList === null)
        return;

    if(productInfoList.length === 0){   // query에 해당하는 상품 정보가 없는 경우
        noProductElem.removeClass("none");   // * 상품 정보가 없음을 표시
        return;
    }else{
        noProductElem.addClass("none");
    }

    const selectedProdNmList = getSelectedProdNmList()  // * 현재 선택된 상품들의 이름을 반환

    for(const product of productInfoList) {
        const categoryName = product.categoryName;
        const productName = product.name;
        const amount = product.amount;

        const productRowElem = $([
            `<div class = "product-list__product-row">`,
                `<span class = "product-row__variation">0</span>`,
                `<div class = "product-row__product-name">${productName}</div>`,
                `<div class = "product-row__amount">${amount}</div>`,
                `<div class = "product-row__category">${categoryName}</div>`,
            `</div>`
        ].join(""));

        if(selectedProdNmList.includes(productName))    // * 선택된 상품명 목록에 현재 추가할 상품의 이름이 포함된 경우 active 클래스를 추가하여 선택된 상품임을 표시
            productRowElem.addClass("active");  // TODO : 상품 테이블 구조 변경시 수정 필요(상품명이 기본키가 아닌 경우)

        productListElem.append(productRowElem);
        updateVariation(productName)    // 상품 선택 목록의 입/출고 수량 업데이트
    }
}

function updateVariation(targetProdNm){ // 상품 선택 목록의 입/출고 수량을 업데이트
    const pickedProdListElem = $(".picked-product .product-list");   // 선택된 상품 목록 elem
    const pickedProdRowElem = pickedProdListElem.children(".product-list__product-row"); // 선택된 상품 elem

    const pickerProdRowElem = $(".product-picker .product-list__product-row"); // 클릭된 상품 elem

    const inOutRadioElem = $(".in-out-container input[name = 'in-out-radio']:checked")  // 입/출고 선택 radio 버튼
    const inOutName = inOutRadioElem.val();  // 입/출고 radio 버튼 중 선택된 값
    let pickedVariation = 0;

    pickedProdRowElem.each((index, pickedProdRowItem) => {   // 각각의 선택된 상품애 대해서
        const curPickedProdNm = $(pickedProdRowItem).children(".product-row__product-name").text(); // 선택된 상품명

        if(curPickedProdNm === targetProdNm){   // 선택된 상품 목록 중에서 상품명이 targetProdNm인 상품의 입/출고 수량을 추출
            pickedVariation = $(pickedProdRowItem).children(".product-row__variation").val();
        }
    })

    pickerProdRowElem.each((index, pickerProdRowItem) => {
        const pickerProdNm = $(pickerProdRowItem).children(".product-row__product-name").text();

        if(pickerProdNm === targetProdNm){  // 상품 선택 목록 중에서 상품명이 targetProdNm인 상품의 입/출고 수량을 변경
            const pickerVariationElem =  $(pickerProdRowItem).children(".product-row__variation");

            if(inOutName === "in"){ // 입고인지 출고인지에 따라 입/출고 수량에 plus, minus class를 부여하여 색상과 기호를 다르게함.
                pickerVariationElem.removeClass("minus");
                pickerVariationElem.addClass("plus");
            }else{
                pickerVariationElem.addClass("minus");
                pickerVariationElem.removeClass("plus");
            }

            pickerVariationElem.text(pickedVariation);  // * 입/출고 수량을 변경 (선택된 상품 목록에서 targetProdNm에 해당하는 상품을 찾지 못한 경우 variation을 0으로 설정)
        }
    })
}

$(".upload-excel-btn").on("click", () => {  // * 엑셀 업로드 버튼 클릭 시
    $(".uploadExcelForm__input").click();
});

$(".upload-excel-desc").on("click", () => {
    const html = [
        `<div style = "text-align: left">`,
            "- 파일을 드래그하여 기능을 이용하실 수 있습니다.<br>",
            "- <strong>'상품명'</strong> 헤더가 있어야 합니다.<br>",
            "- 상품명 헤더 아래의 각 행에 입/출고 정보를 작성해주시면 됩니다.<br>",
            "- 각 상품명은 재고에 등록된 상품명이어야합니다.<br>",
            "- 엑셀 파일에 중복으로 작성된 상품명은 입/출고 수량이 합산됩니다.<br>",
            '- <strong>ex. "상품명1/50, 상품명2/100, 상품명3/10"</strong><br>',
        `</div>`,
    ].join("")
    swalAlert({width : "530px", html : html})
})


$(".confirm-button").on("click", () => {    // * 확인 버튼 클릭 시
    const inOutRadioElem = $(".in-out-container input[name = 'in-out-radio']:checked")  // 입/출고 선택 radio 버튼
    const inOutName = inOutRadioElem.val();  // 입/출고 radio 버튼 중 선택된 값
    const inOutTxt = getTxtFromName(values, inOutName);  // 입/출고 radio 버튼 중 선택된 값을 text로 변환
    const totalProdCnt = getTotalProductCount();  // 선택된 총 상품 수량
    const totalVar = getTotalVariation();   // 총 입/출고 수량

    if(totalProdCnt <= 0){  // * 선택된 총 상품 수량이 0인 경우
        swalAlert({icon : "error", html : `선택된 상품이 없습니다.`});
        return;
    }

    if(totalVar <= 0){  // * 총 입/출고 수량이 0인 경우
        swalAlert({icon : "error", html : `${inOutTxt} 수량이 입력되지 않았습니다.`});
        return;
    }

    swalConfirm({
        html : `총 <strong>${totalProdCnt}</strong>개 상품의 <strong>${totalVar}</strong>개를 <strong>${inOutTxt}</strong> 처리하시겠습니까?`,
        preConfirm : () => {
            const pickedProdListElem = $(".picked-product .product-list");   // 선택된 상품 list elem
            const pickedProdElem = pickedProdListElem.children(".product-list__product-row")
            const inOutInfoList = [];
            const userMemo = $(".in-out-container__in-out-memo").val();

            pickedProdElem.each((index, item) =>{
                const productName = $(item).children(".product-row__product-name").text();
                const variation = $(item).children(".product-row__variation").val();

                inOutInfoList.push({
                    memo : userMemo,
                    prodNm : productName,
                    var : variation
                })
            })

            productInOut({  // * 상품의 입/출고 처리
                type : inOutName,
                successObj : {message : `${inOutTxt} 성공!`},
                errorObj : {message : `${inOutTxt} 실패!`},
                completeFunc : () => {
                    const productNameElem = $(".picked-product .product-list .product-row__product-name");
                        
                    productNameElem.each((index, item) => { // 선택된 상품 모두 선택 해제
                        const productName = item.textContent;
                        releaseSelectedProduct(productName);
                        addSearchResultToList("")   // 상품 전체를 상품 정보 리스트에 추가 (입/출고 반영한 결과를 화면에 출력하기 위해)
                    })
                },
                data : inOutInfoList
            })
        }
    })
});

function productInOut(setting){    // * 상품의 입/출고 처리   TODO : manipulateProduct와 합치던지 manipulateProduct의 함수명을 바꾸는게 좋을듯하다.
    $.ajax({
        url : `/inventory/in-out?type=${setting.type}`,
        type : "PUT",
        contentType: 'application/json',
        data : JSON.stringify(setting.data),
        beforeSend : beforeAjaxSend,
        success : function (response){
            manipulateSuccessHandler(response, setting.successObj, setting.errorObj)
        }, error : function (xhr){
            const timeout = sessionTimeoutCheck(xhr);
            if(!timeout) swalAlert({icon : "error", html : setting.errorObj.message})
        },
        complete : setting.completeFunc
    })
}

$(".cancel-button").on("click", () => { // * 취소 버튼 클릭 시
    location.href = inventoryManageUrl; // 재고관리 페이지로 이동;
});

$(window).on("beforeunload", function (){
    return beforeUnloadMessage;
})

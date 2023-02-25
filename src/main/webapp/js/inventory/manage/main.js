const openRowElem = `<span class = "row-toggle"><span class="horizontal"></span><span class="vertical"></span></span>`;

$(document).ready(function initialize() {    // 페이지 로드시 페이지를 구성할 데이터를 불러오거나 초기 설정을 위한 함수
    updateCategoryList();
})

$(".mod-prodNm").on("click", function () {
    modCommon({
        enableMultiMod : false, // 다중 수정 옵션
        multiModMsg : "<strong>상품명</strong>은 한번에 하나의 상품만 수정 가능합니다.",
        swalOption : {
            label : "상품명",
            placeholder : "상품명 입력",
            inputTag : "input",
            inputType : "text",
            disableSwalConfirmBtn : true,   // swal confirm open시 확인 버튼 disable 유무
            preConfirm : (parentProdInfo, childProdInfo, newProdNm) => {
                const oldProdNm = parentProdInfo.concat(childProdInfo)[0].prodNm // 체크된 상품 중 가장 첫번째 상품을 수정
                const data = {oldProdNm : oldProdNm,newProdNm : newProdNm}
                manipulateProd({type : "PUT", data : data, param : {targetColumn : "name"}})  // 상품명 수정
            }
        }
    })
})

$(".del-all-prod").on("click", function (){
    const parentProdInfoList = getCheckedProd(true) // 체크된 상위 상품 정보 반환
    const parentProdCnt = parentProdInfoList.length // 체크된 상위 상품의 개수
    const html = [`<strong>${parentProdCnt}</strong>개의 상품 정보를 삭제하시겠습니까?`].join("");

    modParentProdOnly({
        swalOption : {
            html : html,
            preConfirm : () => {
                const prodNmList = parentProdInfoList.map((parentProdInfo) => {
                    return parentProdInfo.prodNm
                });
                manipulateProd({type : "DELETE", data : prodNmList})
            },
        }
    })
})

$(".add-all-childProd").on("click", function (){    // * 구성 상품 추가
    const html = [
        `<form class="search-form" data-table-update = "false" data-range = "all">`,    // ! data-table-update는 false, data-range는 'all'
            `<button type="submit" class = "kakao-btn btn-search"><span class="kakao-ico ico-search"></span></button>`,
            `<input type = "search" value="" placeholder="상품명 검색" class="search-form__search-input necessary-input" data-last-input = "0"/>`,
            `<button class = "kakao-btn btn-cancel"><span class="kakao-ico ico-cancel"></span></button>`,
            `<div class = "search-form__suggestions" data-selected = "0"></div>`,
        `</form>`,
    ].join("");

    modParentProdOnly({
        swalOption : {
            html : html,
            preConfirm : (parentProdInfoList, childProdNm) => {
                const data = [];
                for(let parentProdInfo of parentProdInfoList){
                    const parentProdNm = parentProdInfo.prodNm
                    data.push({
                        parentProdNm : parentProdNm,
                        childProdNm : childProdNm
                    })
                }
                manipulateProdLink({type : "POST", data : data})
            },
            disableSwalConfirmBtn : true,   // swal confirm open시 확인 버튼 disable 유무
        }
    })
})

$(".mod-all-manufacturer").on("click", function (){ // * 제조사 수정 버튼 클릭
    modCommon({
        enableMultiMod : true, // 다중 수정 옵션
        swalOption : {
            label : "제조사",
            inputTag : "input",    // 입력을 받는 tag 설정
            placeholder : "제조사 입력",
            inputType : "text",
            disableSwalConfirmBtn : true,   // swal confirm open시 확인 버튼 disable 유무
            preConfirm : (parentProdInfo, childProdInfo, newManufacturer) => {
                const allCheckedProdInfo = parentProdInfo.concat(childProdInfo) // 체크된 상위 상품 정보와 구성 상품 정보를 합침
                const data = [];

                for(let ProdInfo of allCheckedProdInfo){
                    const prodNm = ProdInfo.prodNm // 체크된 상품의 상품명
                    data.push({
                        prodNm : prodNm,
                        newManufacturer : newManufacturer   // 상품의 새로운 제조사
                    })
                }
                manipulateProd({type : "PUT", data : data, param : {targetColumn : "manufacturer"}})  // 제조사 수정
            },
        }
    })
})

$(".mod-all-warehouseDt").on("click", function (){
    modCommon({
        enableMultiMod : true, // 다중 수정 옵션
        swalOption : {
            label : "입고일",
            inputTag : "input",    // 입력을 받는 tag 설정
            inputType : "date",
            disableSwalConfirmBtn : true,   // swal confirm open시 확인 버튼 disable 유무
            preConfirm : (parentProdInfo, childProdInfo, newWarehouseDt) => {
                const allCheckedProdInfo = parentProdInfo.concat(childProdInfo) // 체크된 상위 상품 정보와 구성 상품 정보를 합침
                const data = [];

                for(let ProdInfo of allCheckedProdInfo){
                    const prodNm = ProdInfo.prodNm // 체크된 상품의 상품명
                    data.push({
                        prodNm : prodNm,
                        newWarehouseDt : newWarehouseDt   // 상품의 새로운 입고일
                    })
                }
                manipulateProd({type : "PUT", data : data, param : {targetColumn : "warehouseDate"}})  // 입고일 수정
            },
        }
    })
})

$(".mod-all-category").on("click", function (){
    modCommon({
        enableMultiMod : true, // 다중 수정 옵션
        swalOption : {
            label : "카테고리",
            inputTag : "select",    // 입력을 받는 tag 설정
            disableSwalConfirmBtn : false,   // swal confirm open시 확인 버튼 disable 유무
            preConfirm : (parentProdInfo, childProdInfo, newCategory) => {
                const allCheckedProdInfo = parentProdInfo.concat(childProdInfo) // 체크된 상위 상품 정보와 구성 상품 정보를 합침
                const data = [];

                for(let ProdInfo of allCheckedProdInfo){
                    const prodNm = ProdInfo.prodNm // 체크된 상품의 상품명
                    data.push({
                        prodNm : prodNm,
                        newCategoryNm : newCategory   // 상품의 새로운 카테고리
                    })
                }
                manipulateProd({type : "PUT", data : data, param : {targetColumn : "category"}})  // 카테고리 수정
            },
            onOpen : async () =>{
                await addCategoryOption(".swal2-container .swal2-select");    // unit을 입력받는 select 태그에 단위 목록 추가
            }
        }
    })
})

$(".mod-all-unit").on("click", function (){   // * 상위 상품 단위 모두 수정
    modCommon({
        enableMultiMod : true, // 다중 수정 옵션
        swalOption : {
            label : "단위",
            inputTag : "select",    // 입력을 받는 tag 설정
            disableSwalConfirmBtn : false,   // swal confirm open시 확인 버튼 disable 유무
            preConfirm : (parentProdInfo, childProdInfo, newUnit) => {
                const allCheckedProdInfo = parentProdInfo.concat(childProdInfo) // 체크된 상위 상품 정보와 구성 상품 정보를 합침
                const data = [];

                for(let ProdInfo of allCheckedProdInfo){    
                    const prodNm = ProdInfo.prodNm // 체크된 상품의 상품명
                    data.push({ 
                        prodNm : prodNm,
                        newUnit : newUnit   // 상품의 새로운 단위
                    })
                }
                manipulateProd({type : "PUT", data : data, param : {targetColumn : "unit"}})  // 단위 수정
            },
            onOpen : () =>{
                addUnitOption(".swal2-container .swal2-select");    // unit을 입력받는 select 태그에 단위 목록 추가
            }
        }
    })
})

$(".release-all-childProd").on("click", function() {
    const childProdInfoList = getCheckedProd(false) // 체크된 구성 상품 정보 반환
    const childProdCnt = childProdInfoList.length // 체크된 구성 상품의 개수
    const html = [`<strong>${childProdCnt}</strong>개의 구성 상품 정보를 삭제하시겠습니까?`].join("");

    modChildProdOnly({
        swalOption : {
            html : html,
            preConfirm : () => {
                const data = [];

                for(let childProdInfo of childProdInfoList){
                    const parentProdNm = childProdInfo.parent.prodNm
                    const childProdNm = childProdInfo.prodNm;
                    data.push({parentProdNm:  parentProdNm,childProdNm : childProdNm})
                }
                
                manipulateProdLink({type : "DELETE", data : data})
            },
        }
    })
})

function updateCheckedProd(){   // 체크된 상품의 개수를 업데이트
    const parentProdInfoList = getCheckedProd(true) // 체크된 상위 상품 정보 반환
    const childProdInfoList = getCheckedProd(false) // 체크된 구성 상품 정보 반환

    const checkInfoList = [ // 상위 상품과, 구성 상품의 체크 정보0
        {$checkInfo : $(".check-info__parent-info"),checkedCnt : parentProdInfoList.length},    // 각각 체크된 상품의 개수를 표시할 elem와 체크된 상품의 개수를 나타냄
        {$checkInfo : $(".check-info__child-info"), checkedCnt : childProdInfoList.length}]
    
    for(let checkInfo of checkInfoList){    // 각각의 체크 정보를 이용하여 해당 정보를 표시함
        const $prodCnt = checkInfo.$checkInfo.children(".cnt-box__cnt");  // 체크된 상품의 개수를 표시할 elem
        $prodCnt.text(checkInfo.checkedCnt) // 체크된 상품 개수 표시

        if(checkInfo.checkedCnt > 0){   // 체크된 상위 상품의 개수가 1개 이상일 떄만 표시
            checkInfo.$checkInfo.removeClass("none")
        }else{
            checkInfo.$checkInfo.addClass("none")
        }
    }
}

$(document).on("change", "input.chkProd:checkbox", updateCheckedProd)   // * 상품 체크 change 이벤트 

$(".download-inventory-status").on("click", () => { // * 재고 현황 다운로드 버튼 클릭
    const errorMessage = "엑셀 파일 다운로드 실패!"
    $.ajax({
        url : "/inventory/download/inventory-status",
        type : "GET",
        success : function (res){
            const apiResponse = res.apiResponse;
            const result = apiResponse.result
            const apiErrorMessage = apiResponse.errorMessage

            if(result){   // 크롤링 결과 확인
                const fileExist = res.fileExist;
                const fileId = res.fileId
                if(fileExist){
                    fileDownload({
                        fileId : fileId,
                        errorMessage : errorMessage
                    })
                }
            }else{
                swalAlert({icon : "error", html : apiErrorMessage});
            }
        },error : function (xhr){
            const timeout = sessionTimeoutCheck(xhr);
            if(!timeout) alert(errorMessage)
        }
    })
})

$(document).on("submit", ".search-form", (event) => {   // * 상품 검색 submit시
    const target = event.target;

    searchFormSubmitHandler(event);

    const tableUpdate = $(target).data("tableUpdate");
    const searchInputElem = $(target).children(".search-form__search-input");

    if(tableUpdate){    // * table-update 속성이 true인 경우 테이블을 업데이트
        const activedCategory = $("#accordian li.active").data("label");    // 현재 활성화된 카테고리
        const query = searchInputElem.val();

        updateProductTable(activedCategory, query);  // 상품 테이블 업데이트
    }
})

$(document).on("click", "#accordian ul li", (event) =>{ // 카테고리를 클릭한 경우
    const target = event.target;
    const closestLiElem = $(target).closest("li");

    $(".search-form[data-table-update='true'] .search-form__search-input").val(""); // 검색을 통해 테이블을 업데이트 시키는 상품 검색창의 입력 값을 비움

    if(target === closestLiElem[0] || target === closestLiElem.children("a")[0]){  // ! li 태그 또는 자식인 a 태그가 클릭 되었을 때만 동작하도록 해서, 이벤트 위임으로 인해 더보기 버튼(.more-container)을 클릭해도 카테고리가 변경되는 현상을 해결
        activeTab(closestLiElem);   // * a 태그와 가장 가까운 li 태그를 활성화시킴

        const categoryName = closestLiElem.data("label");
        updateProductTable(categoryName) // 테이블의 상품 정보 업데이트
    }
})

$(".add-category").click(() => {    // * 카테고리 추가
    const html = [
        `<label class = 'swal2-input-label'>카테고리명 ${necessaryIconTag}</label>`,
        `<input class = "swal2-input necessary-input" placeholder="카테고리 입력" type="text" style="display: flex">`
    ].join("");

    const preConfirm = () => {
        const categoryName = $(".swal2-container .swal2-input").val();   // 유저가 입력한 카테고리명
        manipulateCategory({type : "POST", param : {categoryName : categoryName}})
    };

    const onOpen = () => {
        disableSwalConfirmBtn(true);
    };

    swalConfirm({html :html, preConfirm :preConfirm, onOpen : onOpen});
})

$(document).on("mousedown", ".category-list .mod-category", (event) => {   // * click event가 일어나기 전에 blur event가 먼저 발생하여 click event가 발생하기 전에 검색어 링크가 dom 에서 삭제된다. click event 대신에 mousedown event를 활용하면 blur event 발동과 무관하게 원하는 로직을 사용할 수 있다.
                                                            // ? https://p-iknow.netlify.app/front-end/mouse-blur-event-order 참조
    const target = event.target;
    const oldCategoryName = $(target).closest("#accordian > ul > li").data("label");   // 가장 가까운 li태그 (수정 전 카테고리명)

    const preConfirm = () => {
        const newCategoryName = $(".swal2-container .swal2-input").val();   // 유저가 입력한 카테고리명
        manipulateCategory({type : "PUT", param : {oldCategoryName : oldCategoryName, newCategoryName : newCategoryName}})
    };
    const onOpen = () => {
        if(!oldCategoryName) {   // * li 태그의 data-label 속성에서 추출한 categoryName이 문자열이 아닌 경우
            disableSwalConfirmBtn(true);
        }else{  // * 문자열인 경우
            $(".swal2-container .swal2-input").val(oldCategoryName);    // input 태그에 수정하려는 카테고리명을 입력
        }
    }

    const html = [`<label class = 'swal2-input-label'>카테고리명 ${necessaryIconTag}</label>`,
                  `<input class = "swal2-input necessary-input" placeholder="카테고리 입력" type="text" style="display: flex">` ].join("")

    swalConfirm({html : html, preConfirm : preConfirm, onOpen : onOpen})
})

$(document).on("mousedown", ".del-category", (event) => {   // * 카테고리 삭제
    const target = event.target;
    const categoryName = $(target).closest("#accordian > ul > li").data("label");   // 가장 가까운 li태그

    swalConfirm({
        title : "카테고리 삭제",
        html : `<span class="red">해당 카테고리에 속한 모든 상품 정보가 삭제됩니다.</span><br> <strong>'${categoryName}'</strong>카테고리를 삭제하시겠습니까?`,
        preConfirm : () =>{
            manipulateCategory({type : "DELETE", param : {categoryName : categoryName}})
        }
    });
})

$(".btn-refresh").on("click", function () { // * 새로고침
    const activatedCategory = $("#accordian li.active").data("label");    // * 현재 활성회된 카테고리명
    const query = $(".search-form[data-table-update='true'] .search-form__search-input").val(); // 상품명을 검색한 경우, 새로고침을 해도 유지 될 수 있도록 상품 검색을 통해 테이블을 업데이트 할 수 있는 input 태그의 값을 확인

    updateProductTable(activatedCategory, query);
})

function makeProductRow(productInfo, isChild){
    const productName = productInfo.name;   // 상품명
    const amount = productInfo.amount;  // 수량
    const unit = productInfo.unit;  // 단위
    const manufacturer = productInfo.manufacturer;  // 제조사
    const warehouseDate = productInfo.warehouseDate;    // 입고일
    const categoryName = productInfo.categoryName;    // 입고일
    const childExist = ((isChild === true) ? false : productInfo.childProductList.length > 0); // 구성품이 있는 경우 true

    const contentStringList = [
        `<div class="col col-3"><label class = "checkbox"> <input type='checkbox' class = "chk chkProd" name = "${(isChild) ? 'checkChildProd' : 'checkParentProd'}" data-parent = "${(!isChild)}"> <span class = 'icon'></span></label></div>`,  //  * 부모/자식 상품인지에 따라 checkbox의 name 속성을 다르게 함. (부모 chkAll 체크 박스 체크 시 자식 상품은 체크 되지 않도록)
        `<div class="col col-25" data-label="productName">${productName}</div>`,
        `<div class="col col-15" data-label="amount">${addCommaToNumber(String(amount))} ${(unit) ? unit : ""}</div>`,   // * 수량에 3자리마다 콤마를 추가하여 표시 (단위가 지정된 경우 수량 옆에 작성)
        `<input type="hidden" data-label = "unit" value = ${unit}>`,
        `<div class="col col-20" data-label="manufacturer">${(manufacturer) ? manufacturer : ""}</div>`,   // * 제조사가 null이 아닌 경우에만 표시
        `<div class="col col-15" data-label="warehouseDate">${(warehouseDate) ? warehouseDate : ""}</div>`,    // * 입고일이 null이 아닌 경우에만 표시
        `<div class="col col-25" data-label="categoryName">${categoryName}</div>`,    // * 입고일이 null이 아닌 경우에만 표시
    ]

    if(childExist){ // 구성품이 존재하는 경우
        contentStringList.push(`<div class="col col-3" data-label="">${openRowElem}</div>`)    // toggle button 추가
    }else{  // 구성품이 존재하지 않는 경우
        contentStringList.push(`<div class="col col-3" data-label=""></div>`)   // toggle 버튼 추가하지 않음.
    }

    return contentStringList.join("");
}

function updateTotalProdCnt(){    // 총 상품 수를 업데이트
    const $totalProdCnt = $(".total-prod-cnt");
    const totalProdCnt = $(".product-table__body .table-row").length;

    $totalProdCnt.text(totalProdCnt);
}

async function updateProductTable(categoryName, query="") { // 상품 목록 업데이트
    const productInfoList = await getProducts(categoryName, query);
    const noProductElem = $(".no-product");
    const $prodTableBody = $(".product-table__body");

    $(".responsive-table .table-row").remove(); // 기존 상품 정보 삭제

    $(".product-table input[type = 'checkbox']").prop("checked", false);    // 상품 목록 내 체크박스 모두 해제

    if(productInfoList === null || productInfoList.length === 0){  // 상품 정보 요청에 에러가 발생했거나, query에 해당하는 상품 정보가 없는 경우
        noProductElem.removeClass("none");   // * 상품 정보가 없음을 표시
        $prodTableBody.addClass("none") // 테이블 body 숨김
    }else{
        $prodTableBody.removeClass("none")  // 테이블 body 표시
        noProductElem.addClass("none");
        for(const parentProduct of productInfoList){

            const parentRow = makeProductRow(parentProduct, false); // 상위 상품 정보를 이용하여 row 구성
            let childRow = "";

            const childProductList = parentProduct.childProductList;    // 하위 상품 정보 리스트

            for(const childProduct of childProductList){  // 하위 상품 정보를 이용하여 추가 row 구성
                childRow += "<div class='addition-row product-row'>" + makeProductRow(childProduct, true) + "</div>";
            }

            const productRow = [
                `<li class="table-row">`,
                `<div class="data-expands original-row product-row">${parentRow}</div>`,
                `<div class="expandable">${childRow}</div>`,
                `</li>`].join("");

            $(".responsive-table .product-table__body").append(productRow)   // 테이블에 추가

            $('[data-toggle="tooltip"]').tooltip(); // * tooltip 초기화
        }
    }
    updateCheckedProd() // 체크된 상품의 개수를 업데이트
    updateTotalProdCnt()    // 총 상품 수를 업데이트
}

async function updateCategoryList(categoryName) {   // verticalTav의 카테고리 리스트를 업데이트
    let categoryNameList = await getAllCategoryNames();

    if(categoryNameList === null)
        return;

    const activeCategory = $("#accordian ul li.active");  // active된 카테고리 select
    let curActiveCagtegory = null;    // 현재 활성회된 카테고리명

    if(activeCategory.length !== 0){    // active된 카테고리가 있다면
        curActiveCagtegory = activeCategory.data("label"); // 기존 커테고리 제거 전, active된 카테고리의 label을 확인
    }

    $("#accordian ul li").remove(); // 기존 카테고리 리스트 모두 삭제

    categoryNameList.push("전체");    // * 전체 카테고리를 추가

    const moreMenu = [
        `<div class="more-container none">`,
            `<div class="more">`,
                `<button id="more-btn" class="more-btn">`,
                    `<span class="more-dot"></span>`,
                    `<span class="more-dot"></span>`,
                    `<span class="more-dot"></span>`,
                `</button>`,
                `<div class="more-menu">`,
                    `<div class="more-menu-caret">`,
                        `<div class="more-menu-caret-outer"></div>`,
                        `<div class="more-menu-caret-inner"></div>`,
                    `</div>`,
                    `<ul class="more-menu-items" tabindex="-1" role="menu" aria-labelledby="more-btn">`,
                        `<li class="more-menu-item" role="presentation">`,
                            `<button type="button" class="more-menu-btn mod-category" role="menuitem">수정</button>`,
                        `</li>`,
                        `<li class="more-menu-item" role="presentation">`,
                            `<button type="button" class="more-menu-btn del-category" role="menuitem">삭제</button>`,
                        `</li>`,
                    `</ul>`,
                `</div>`,
            `</div>`,
        `</div>`].join("")
    
    for(const categoryName of categoryNameList){    // 카테고리 정보 요청 결과 추가
        // * 전체인 경우에는 'more' 버튼 추가 x
        $(`<li data-label = '${categoryName}'><a>${categoryName}${(categoryName !== "전체") ? moreMenu : ""}</a></li>`).insertAfter(".selector-active");  // .selector-active 뒤에 카테고리 추가
    }

    const categoryList = $("#accordian ul li");

    if(categoryNameList.includes(categoryName)){   // * 카테고리명을 인자로 받은 경우 해당 카테고리를 클릭. (카테고리를 수정한 경우에는 categoryNameList에 수정된 카테고리명이 없어서 유지가 되지 않음 -> 카테고리명을 인자로 전달하고, 업데이트 후 해당 카테고리를 활성화)
        categoryList.filter(`[data-label = ${categoryName}]`).click();
    }else if(curActiveCagtegory !== null && categoryNameList.includes(curActiveCagtegory)){   // 이전에 active된 카테고리가 있고, 서버로 부터 받은 유저의 카테고리명에 이전에 active된 카테고리가 존재한다면 (카테고리를 삭제하는 경우에는 서버로 부터 새로 받은 카테고리명 리스트에 이전의 카테고리명이 존재하지 않음.)
        categoryList.filter(`[data-label = ${curActiveCagtegory}]`).click();   // 카테고리 리스트를 update하기 이전에 active되어 있던 카테고리를 클릭
    }else{
        categoryList[0].click();    // active된 카테고리가 없다면 (ex. 처음 카테고리를 불러올 때)
    }
}

function modCommon(option){    // 상위 상품, 구성 상품 모두 적용할 수 있는 수정 기능
    const parentProdInfo = getCheckedProd(true) // 체크된 상위 상품 정보 반환
    const childProdInfo = getCheckedProd(false) // 체크된 구성 상품 정보 반환
    const allCheckedProdCnt = parentProdInfo.length + childProdInfo.length; // 체크된 모든 상위 상품, 구성 상품의 개수
    const swalOption = option.swalOption;

    if(allCheckedProdCnt === 0){ // 체크된 상위 상품, 구성 상품이 모두 없는 경우
        swalAlert({icon : "error", html : "선택된 상품이 없습니다."})
        return;
    }else if(allCheckedProdCnt > 1 && option.enableMultiMod === false){ // 다중 수정을 지원하지않고, 체크된 상위 상품, 구성 상품이 여러개 선택된 경우 (ex. 상품명)
        swalAlert({icon : "error", html  : option.multiModMsg})
        return;
    }

    let html;

    if(swalOption.inputTag === "select"){
        html = [`<label class = 'swal2-input-label'>${swalOption.label}${necessaryIconTag}</label>`,
            `<select class = 'swal2-select swal2-input necessary-input' style = "display: flex"></select>`].join("")
    }else{
        html = [`<label class = 'swal2-input-label'>${swalOption.label}${necessaryIconTag}</label>`,
            `<input class = "swal2-input necessary-input" placeholder="${swalOption.placeholder}" type=${swalOption.inputType} style="display: flex">` ].join("")
    }

    swalConfirm({
        html : html,
        preConfirm : () => {
            const userInput = $(".swal2-container .swal2-input").val()
            swalOption.preConfirm(parentProdInfo, childProdInfo, userInput)
        },
        onOpen : () => {
            if(swalOption.disableSwalConfirmBtn) disableSwalConfirmBtn(true); // 확인 버튼 disable
            if(swalOption.onOpen) swalOption.onOpen();  // option에 onOpen 함수가 있으면 호출
        }
    })
}

function modChildProdOnly(option){
    const parentProdInfo = getCheckedProd(true) // 체크된 상위 상품 정보 반환
    const childProdInfo = getCheckedProd(false) // 체크된 구성 상품 정보 반환
    const swalOption = option.swalOption;

    if(parentProdInfo.length >0){
        swalAlert({icon : "error", html : "상위 상품에는 해당 기능을 적용할 수 없습니다."});
        return;
    }else if(childProdInfo.length <= 0){
        swalAlert({icon : "error", html : "선택된 상품이 없습니다."});
        return;
    }

    swalConfirm({
        html : swalOption.html,
        preConfirm : () =>{
            const userInput = $(".swal2-container input").val()
            swalOption.preConfirm(parentProdInfo, userInput)
        },
        onOpen : () => {
            if(swalOption.disableSwalConfirmBtn) disableSwalConfirmBtn(true); // 확인 버튼 disable
            if(swalOption.onOpen) swalOption.onOpen();  // option에 onOpen 함수가 있으면 호출
        }
    })
}

function modParentProdOnly(option){   // 상위 상품에만 적용할 수 있는 수정 기능(ex. 구성 상품 추가)
    const parentProdInfo = getCheckedProd(true) // 체크된 상위 상품 정보 반환
    const childProdInfo = getCheckedProd(false) // 체크된 구성 상품 정보 반환
    const swalOption = option.swalOption;

    if(childProdInfo.length >0){
        swalAlert({icon : "error", html : "구성상품에는 해당 기능을 적용할 수 없습니다."});
        return;
    }else if(parentProdInfo.length <= 0){
        swalAlert({icon : "error", html : "선택된 상품이 없습니다."});
        return;
    }

    swalConfirm({
        html : swalOption.html,
        preConfirm : () =>{
            const userInput = $(".swal2-container input").val()
            swalOption.preConfirm(parentProdInfo, userInput)
        },
        onOpen : () => {
            if(swalOption.disableSwalConfirmBtn) disableSwalConfirmBtn(true); // 확인 버튼 disable
            if(swalOption.onOpen) swalOption.onOpen();  // option에 onOpen 함수가 있으면 호출
        }
    })
}

function getCheckedProd(isParent){  // * 체크된 상품 정보 반환 (isParent에 따라 상위 상품 또는 구성 상품 select)
    const $checked = $(`input.chk.chkProd[data-parent = ${isParent}]:checked`)   // 체크된 체크박스 select (chkAll 제외, isParent에 따라 상위 상품 또는 구성 상품 select)
    const $prodRow = $checked.closest(".product-row")   // 체크된 체크박스 상위의 row elem
    const prodInfoList = [];

    $prodRow.each((index, rowItem) => {
        const prodNm = $(rowItem).find("div[data-label = 'productName']").text();   // 상품명
        const amount = $(rowItem).find("div[data-label = 'amount']").text();    // 재고 수량
        const manufacturer = $(rowItem).find("div[data-label = 'manufacturer']").text();    // 제조사
        const warehouseDt = $(rowItem).find("div[data-label = 'warehouseDate']").text();    // 입고일
        const categoryNm = $(rowItem).find("div[data-label = 'categoryName']").text();  // 카테고리
        const parentProdNm = $checked.closest(".table-row").find(".original-row div[data-label = 'productName']").text();

        prodInfoList.push({
            parent : {
                prodNm : (!isParent) ? parentProdNm : null  // 구성 상품인 경우 상위 상품명을 추가, 상위 상품인 경우 null
            },
            prodNm : prodNm,
            amount : amount,
            manufacturer : manufacturer,
            warehouseDt : warehouseDt,
            categoryNm : categoryNm
        })
    })

    return prodInfoList;    // 체크된 상품 정보 반환
}

function manipulateProdLink(option){  // * 구성 상품 조작 (삽입, 삭제)
    const manipulateInfoList = [{   // * 구성 상품 정보 조작
        url : `/inventory/product-link`,
        type : "POST",
        successObj : {message : "추가 성공"},
        errorObj : {message : "추가 실패!"},
    }, {
        url : `/inventory/product-link`,
        type : "DELETE",
        successObj : {message : "삭제 성공"},
        errorObj : {message : "삭제 실패!"},
    }]

    const curManipulateInfo = manipulateInfoList.find((infoItem) => {
        if(infoItem.type === option.type)   // 파라미터로 전달된 option과 동일한 조작 옵션을 find (find()는 단 하나의 요소만 반환함)
            return infoItem;
    })

    basicAjaxRequest({
        url : curManipulateInfo.url,
        type : curManipulateInfo.type,
        successObj : curManipulateInfo.successObj,
        errorObj : curManipulateInfo.errorObj,
        data : JSON.stringify(option.data),
        contentType : "application/json",
        completeFunc : () => {
            updateCategoryList();   // 카테고리 리스트 업데이트
        }
    })
}

function manipulateProd(option){    // * 상품 조작 (삽입, 삭제, 수정)
    const manipulateInfoList = [{   // * 상품 정보 조작 정보 (TODO : insert도 추가)
        url : `/inventory/product/${(option.param !== undefined) ? option.param.targetColumn : undefined}`,
        type : "PUT",
        successObj : {message : "수정 성공"},
        errorObj : {message : "수정 실패!"},
    }, {
        url : `/inventory/product`,
        type : "DELETE",
        successObj : {message : "삭제 성공"},
        errorObj : {message : "삭제 실패!"},
    }]

    const curManipulateInfo = manipulateInfoList.find((infoItem) => {
        if(infoItem.type === option.type)   // 파라미터로 전달된 option과 동일한 조작 옵션을 find (find()는 단 하나의 요소만 반환함)
            return infoItem;
    })

    basicAjaxRequest({  // * 조작 정보를 이용하여 상품 정보를 수정
        url : curManipulateInfo.url,   
        type : curManipulateInfo.type,
        successObj : curManipulateInfo.successObj,
        errorObj : curManipulateInfo.errorObj,
        data : JSON.stringify(option.data),
        contentType: "application/json",
        completeFunc : () => {
            updateCategoryList();   // 카테고리 리스트 업데이트
        }
    })
}

function manipulateCategory(option){  // * 카테고리 정보 조작 (삽입, 삭제, 수정)
    const param = option.param;

    const manipulateInfoList = [{   // * 카테고리 정보 조작 정보
        url : `/inventory/category?categoryName=${param.categoryName}`,
        type : "POST",
        successObj : {message : "추가 성공!"},
        errorObj : {message : "추가 실패!"},
    }, {
        url : `/inventory/category?categoryName=${param.categoryName}`,
        type : "DELETE",
        successObj : {message : "삭제 성공!"},
        errorObj : {message : "삭제 실패!"},
    }, {
        url : `/inventory/category?oldCategoryName=${param.oldCategoryName}&newCategoryName=${param.newCategoryName}`,
        type : "PUT",
        successObj : {message : "수정 성공!"},
        errorObj : {message : "수정 실패!"},
    }]

    const curManipulateInfo = manipulateInfoList.find((infoItem) => {
        if(infoItem.type === option.type)   // 파라미터로 전달된 option과 동일한 조작 옵션을 find (find()는 단 하나의 요소만 반환함)
            return infoItem;
    })

    basicAjaxRequest({  // * 조작 정보를 이용하여 카테고리 정보를 수정
        url : curManipulateInfo.url,
        type : curManipulateInfo.type,
        successObj : curManipulateInfo.successObj,
        errorObj : curManipulateInfo.errorObj,
        data : null,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        completeFunc : () => {
            updateCategoryList();   // 카테고리 리스트 업데이트
        }
    })
}
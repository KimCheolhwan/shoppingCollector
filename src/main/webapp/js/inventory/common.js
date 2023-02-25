const unitList = ["BOX", "EA"]; // 가능한 상품 단위 리스트

function addUnitOption(selector) {  // * selector에 해당하는 요소에 상품 단위 option을 추가.
    const unitSelectElem = $(selector);

    unitSelectElem.children("option").remove(); // 기존 옵션들 모두 삭제
    
    for(const unit of unitList){
        unitSelectElem.append(`<option value='${unit}'>${unit}</option>`) // 가능한 단위를 select 태그의 옵션에 추가
    }
}

async function addCategoryOption(selector){ // * selector에 해당하는 요소에 카테고리 option을 추가.
    let categoryNameList = await getAllCategoryNames();    // 유저의 전체 카테고리 요청;
    let $categorySelect = $(selector);

    if(categoryNameList === null) // 카테고리 요청에 실패한 경우
        return;

    $categorySelect.children("option").remove(); // select 태그 option 추가하기 전 기존 option 모두 제거

    for(const categoryName of categoryNameList){  // 각각의 카테고리를 select 태그에 삽입
        $categorySelect.append(`<option value='${categoryName}'>${categoryName}</option>`) // 각 카테고리를 select 태그의 옵션에 추가
    }
}

function makeAllCaseOf2d(arr2d){   // 2차원 배열의 모든 경우의 수를 반환 (2차원 배열을 입력으로 받음.)
    if(arr2d.length === 1){    // 2차원 배열 내 1차원 배열이 한 개인 경우엔 해당 1차원 배열을 반환 (재귀 종료 조건)
        return arr2d[0];
    }else{
        arr2d = removeEmptyArrayOf2d(arr2d)    // 2차원 배열에서 빈 1차원 배열을 제거 (firstGroup이나, remainderGroup이 비어있는 경우 allcase가 빈 리스트가 되므로 빈 1차원 배열 제거)

        const firstGroup = arr2d[0];   // 첫번째 1차원 배열
        const remainderGroup = arr2d.slice(1);  // 첫번째 1차원 배열을 제외한 2차원 배열

        const allCase = []; // 2차원 배열의 모든 경우의 수를 담을 리스트
        const allCaseOfRemainGroup = makeAllCaseOf2d(remainderGroup); // * // 첫번째 1차원 배열을 제외한 2차원 배열의 모든 케이스 (재귀)

        for(let firstGroupElem of firstGroup){  // 첫번째 1차원 배열의 각 요소에 대해 순회
            for(let caseOfRemainGroup of allCaseOfRemainGroup){ // // 첫번째 1차원 배열을 제외한 2차원 배열의 각 케이스를 순회
                allCase.push(firstGroupElem + " " + caseOfRemainGroup); // 첫번째 1차원 배열의 요소와 나머지 2차원 배열의 각 케이스를 연결
            }
        }

        return allCase; // 모든 경우의 수 반환
    }
}

function removeEmptyArrayOf2d(arr2d){   // 2차원 배열의 요소 중 빈 1차원 배열을 제거
    return arr2d.filter((arr1d) => {
        if(arr1d.length > 0)
            return true;
    })
}

function removeDupOf2D(arr2d){   // 2차원 배열의 중복을 제거
    const set = new Set();

    const result2d = arr2d.map(arr1d => {
        const inner_result = [];

        arr1d.forEach(elem => { // 1차원 배열의 요소 중 set에 포함되어 있지 않은 것만 새로운 1차원 배열에 push
            if (set.has(elem))
                return;
            set.add(elem);
            inner_result.push(elem);
        });

        return inner_result;    // 중복이 제거된 1차원 배열
    });
    return result2d;    // 중복이 제거된 2차원 배열
}

function getProducts(categoryName, query) {
    return new Promise((resolve, reject) => {
        $.ajax({    // * 상품 정보 요청
            url : `/inventory/product?categoryName=${categoryName}&query=${query}`,
            type : "GET",
            beforeSend : beforeAjaxSend,
            success : function (response) {
                resolve(response)
            },
            error : function (request, err) {
                alert("code:" + request.state() + "\n" + "message:" + request.responseText + "\m" + "Error:" + err);
                // const timeout = sessionTimeoutCheck(xhr);
                // if(!timeout) swalAlert({icon : "error", html : "상품 정보 요청 실패!"})
                reject(null);
            }
        })
    })
}

function getAllCategoryNames() {  // * 유저의 전체 카테고리를 요청하는 메서드
    // ! 호출하는 쪽에서 timeout 검사
    return new Promise(function (resolve, reject) {
        $.ajax({
            url : "/inventory/categories",
            type : "GET",
            beforeSend : beforeAjaxSend,
            success : function (categories) {
                const categoryNameList = categories.reverse().map((categoryInfo) => {   // response의 카테고리 정보중 카테고리명만 추출하여 list를 만듦. (가나다 순으로 카테고리가 추가되도록 reverse())
                    return categoryInfo.name;
                })
                resolve(categoryNameList)
            },
            error : function (xhr) {
                const timeout = sessionTimeoutCheck(xhr);
                if(!timeout) swalAlert({icon : "error", html : "카테고리 정보 요청 실패!"})
                reject(null);
            }
        });
    })
}

function manipulateProduct(setting) {   // * 상품 정보 CRUD  TODO : 다른 ajax 요청 함수도 common.js로 옮기고, complete 함수를 인자로 전달받도록 수정
    $.ajax({
        url : `/inventory/product`,
        type : setting.type,
        contentType: 'application/json',
        data : JSON.stringify(setting.data),
        beforeSend : beforeAjaxSend,
        success : function (response) {
            manipulateSuccessHandler(response, setting.successObj, setting.errorObj)
        },
        error : function (xhr) {
            const timeout = sessionTimeoutCheck(xhr);
            if(!timeout) swalAlert({icon : "error", html : setting.errorObj.message})
        },
        complete : setting.completeFunc
    })
}

function manipulateSuccessHandler(response, successObj, errorObj) { // * 상품/카테고리 CRUD 요청 Ajax의 요청 성공시 호출되는 함수
    // TODO : 주문 수집의 ajax도 같은 success 핸들러를 사용할 수 있도록 수정하고, common.js에 옮겨서 사용
    if(response.result === false){  // 상품을 추가하는데 실패한 경우
        if(response.errorMessage !== null){
            swalAlert({icon : "error", html : response.errorMessage, preConfirm : errorObj.preConfirm})    // 응답에 에러 메시지가 담겨 있는 경우
        }else{
            swalAlert({icon : "error", html : errorObj.message, preConfirm : errorObj.preConfirm})    // 에러가 발생했지만, 에러 메시지는 없는 경우
        }
    }else{  // 상품 추가 성공
        swalAlert({icon : "success", html : successObj.message, preConfirm : successObj.preConfirm});
    }
}

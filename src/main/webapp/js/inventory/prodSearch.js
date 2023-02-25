$(document).on("click", ".search-form .ico-cancel", (event) => {    // ! 구성 상품 추가시 생성되는 alert 창에서도 동작하기 위해서 동적 이벤트 바인딩을 이용
    const target = event.target;
    const searchInputElem = $(target).closest(".search-form").children(".search-form__search-input");    // 가장 가까운 input 태그

    searchInputElem.val("");    // input 태그에 입력된 값 지움.
    removeSuggestions(event);    // 추천 검색어 모두 삭제
})

function removeSuggestions(event) {
    const target = event.target;
    const searchFormElem = $(target).closest(".search-form")    // 이벤트 발생 element 상위의 search form
    const searchInputElem = searchFormElem.children(".search-form__search-input");

    const suggestElem = searchFormElem.find(".search-form__suggestion");   // 추천 검색어

    searchInputElem.css("border-radius", "5px"); // 추천 검색어를 추가했을 때, 제거했던 input 태그 하단의 border-radius 속성을 다시 추가
    suggestElem.remove();   // 기존 검색어 추천 모두 삭제
}

function searchFormSubmitHandler(event){    // 검색 form의 submit 이벤트 핸들러
    event.preventDefault(); // 기본 리스너 동작 제거

    const target = event.target;

    let selectElem = $(target).children(".search-form__suggestions").find(".selected").eq(0) // 추천 검색어들 중 선택된 첫번째 검색어
    const searchInputElem = $(target).children(".search-form__search-input");

    if(selectElem.length !== 0){    // 선택된 검색어가 있는 경우
        const selectedValue = selectElem.children(".suggestion__title").text(); // 선택한 추천 검색어의 title
        searchInputElem.val(selectedValue);    // input 태그에 입력된 값을 선택한 추천 검색어의 title로 수정.
    }

    searchInputElem.blur(); // input 태그의 focus를 제거해서 추천 검색어가 표시되지 않도록 함.
    removeSuggestions(event);    // 추천 검색어 모두 삭제
}

$(document).on("blur", ".search-form__search-input", function(event){
    removeSuggestions(event);    // 추천 검색어 모두 삭제
});

function arrowAndEnterKeyPressHandler(event){   // 눌린 방향키에 따라 해당 방향의 추천 검색어를 선택 표시하고, 눌린키가 위 아래 방향키 또는 Enter키 인 경우 true를 반환함.
    const target = event.target;
    const suggestionElems = $(target).closest(".search-form").children(".search-form__suggestions");    // 추천 검색어 리스트 select
    const suggestionElem = suggestionElems.children(".search-form__suggestion");   // 추천 검색어 select
    const suggestionNum = suggestionElem.length;    // 현재 추천 검색어의 개수

    const code = event.originalEvent.code;  // 눌린 키의 code

    suggestionElem.removeClass("selected"); // 기존 선택된 추천 검색어들의 선택을 모두 해제

    let selectedSuggestionIndex = suggestionElems.data("selected"); // 이벤트 발생 전 선택된 검색어의 index

    if(suggestionElem.length > 0){   // 추천 검색어가 있는 경우
        if(code === "ArrowUp"){    // 위 방향키를 누른 경우
            selectedSuggestionIndex = (selectedSuggestionIndex - 1) % suggestionNum;
            suggestionElem.eq(selectedSuggestionIndex-1).addClass("selected");  // 헤당 추천 검색어를 선택 표시
        }else if(code === "ArrowDown"){    // 아래 방향키를 누른 경우
            selectedSuggestionIndex = (selectedSuggestionIndex + 1) % suggestionNum;
            suggestionElem.eq(selectedSuggestionIndex-1).addClass("selected");  // 헤당 추천 검색어를 선택 표시
        }
    }

    suggestionElems.data("selected", selectedSuggestionIndex);  // 눌린 키에 따라 index를 수정

    return code === "ArrowDown" || code === "ArrowUp" || code === "Enter";
}

$(document).on("mouseenter", ".search-form__suggestion", function (event) {
    const target = event.target;
    const suggestionElem = $(target).closest(".search-form__suggestion");
    const searchInputElem = $(target).closest(".search-form__search-input");

    suggestionElem.addClass("selected")    // 해당 추천 검색어에 마우스가 올라오면 해당 요소에 selected class를 추가해서 선택 표시를 해준다.
    searchInputElem.off("blur")
})

$(document).on("mousedown", ".search-form__suggestion", function (event) {    // 추천 검색어를 클릭한 경우, submit
    const target = event.target;
    const searchFormElem = $(target).closest(".search-form");

    searchFormElem.submit();
})

$(document).on("mouseleave", ".search-form__suggestion", function (event) {
    const target = event.target;
    const suggestionElem = $(target).closest(".search-form__suggestion");
    const searchInputElem = $(target).closest(".search-form__search-input");

    suggestionElem.removeClass("selected")    // 해당 추천 검색어에 마우스가 올라오면 해당 요소에 selected class를 추가해서 선택 표시를 해준다.
    searchInputElem.off("blur")
})

$(document).on("propertyChange keyup paste focus", ".search-form__search-input", async function(event) {  // 입력 받거나 focus가 주어진 경우
                                                                                                          // ! input event를 추가하면 submit후 input event가 다시 발생해서 추천 검색어가 사라지지 않음 -> input event 제거
    const target = event.target;
    const searchFormElem = $(target).closest(".search-form");

    const curTimeStamp = new Date().getTime();  // 현재 이벤트 발생 시간
    let lastKeyEventTime = $(target).data("last-input");

    if(lastKeyEventTime + INPUT_EVENT_MIN_INTERVAL > curTimeStamp){    // (가장 최근에 발생한 이벤트의 시간 + 제한 시간) 이내에 이벤트가 발생한 경우에는, 처리하지 않음.
        return;
    }

    $(target).data("last-input", curTimeStamp)  // 가장 최근에 발생한 이벤트의 timestamp 갱신
    const isArrowOrEnter = arrowAndEnterKeyPressHandler(event)

    if(isArrowOrEnter === true) // 눌린 키가 위 아래 방향키 또는 Enter키 인 경우 이벤트 리스너 종료.
        return;

    const query = target.value; // input 태그에 입력된 검색어

    const searchRange = searchFormElem.data("range")    // 검색 범위
    let searchCategory;

    if(searchRange === "all"){   // 검색 범위가 'all'인 경우
        searchCategory = "전체"
    }else{  // 검색 범위가 'category'인 경우
        searchCategory = $("#accordian li.active").data("label");    // * 현재 활성회된 카테고리명
    }

    if(query !== "") {    // 검색어가 있을 경우에만 서버에 추천 검색어 요청
        let suggestions =  await getProducts(searchCategory, query);

        if(suggestions === null){
            removeSuggestions(event);    // 추천 검색어 모두 삭제
            return;
        }

        const suggestionElems = $(target).closest(".search-form").children(".search-form__suggestions");    // 추천 검색어 리스트 select

        removeSuggestions(event);   // 추천 검색어 모두 삭제
        suggestionElems.data("selected", 0);    // 선택된 검색어 index 초기화

        if(suggestions.length > 0){
            $(target).css("border-radius", "5px 5px 0px 0px"); // 추천 검색어가 있으면 input 태그 하단의 border-radius를 제거해서 빈틈이 없도록 함.

            for(const suggestion of suggestions){
                const index = suggestions.indexOf(suggestion);

                suggestionElems.append([
                    `<div class = "search-form__suggestion">`,
                    `<span class = "number">${index + 1}</span>`,
                    `<span class = "suggestion__title">${suggestion.name}</span>`,
                    `<span class = "suggestion__category">${suggestion.categoryName}</span><br>`,
                    `</div>`
                ].join(""));
            }
        }
    }else{  /// 입력된 검색어가 없는 경우
        removeSuggestions(event);    // 추천 검색어 모두 삭제
    }
})


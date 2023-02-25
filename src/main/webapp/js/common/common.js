/************************** const **************************/
const loginPageUrl = "/login";
const inventoryManageUrl = "/inventory/manage";
const inOutManagePage = "";
const beforeUnloadMessage = "변경사항이 저장되지 않을 수 있습니다. 페이지를 이동하시겠습니까?";

const necessaryIconTag = `<span class = "necessary">*</span>`;

const INPUT_EVENT_MIN_INTERVAL = 10;   // input 태그의 이벤트 발생 최소 간격
const xMark = "x";

const eventNames = {
    MOUSE_LEAVE : "mouseleave",
    MOUSE_ENTER : "mouseenter",
    CLICK : "click",
}

const swalBasicOption = {
    heightAuto : false,  // true이면 body의 height가 auto가 되어서 페이지 구조가 변함
    allowOutsideClick : false,
    confirmButtonText : "확인",
}
/************************************************************************/


/************************** ajax func **************************/
/*
    * ajax 함수 규칙
    *
    *
*/

function fileDownload(setting){
    $.ajax({
        url : `/file/download?fileId=${setting.fileId}`,
        type : "GET",
        xhrFields: {
            responseType: 'blob'
        },
        beforeSend : beforeAjaxSend,
        success : function (response, status, xhr) {
            downloadFileFromResponse(response, xhr);
        },
        error : function (xhr) {
            const timeout = sessionTimeoutCheck(xhr);
            if(!timeout) alert(setting.errorMessage)
        }
    })
}

function downloadFileFromResponse(response, xhr) {
    const blob = new Blob([response]);

    const disposition = xhr.getResponseHeader('Content-Disposition');
    let fileName = "";

    if (disposition && disposition.indexOf('attachment') !== -1) {     // indexOf() 메서드는 호출한 String 객체에서 주어진 값과 일치하는 첫 번째 인덱스를 반환한다. disposition-type이 attachment인지 확인하는 듯하다.
        const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = fileNameRegex.exec(disposition);  // exec() 메소드는 어떤 문자열에서 정규표현식과 일치하는 문자열 검색을 수행한다.
        if (matches != null && matches[1]) fileName = decodeURI(matches[1].replace(/['"]/g, ''));  // Content-Disposition에 한글을 사용하면 오류가 발생하기 때문에 서버에서 인코딩된 문자열을 사용했으므로, decode 해줌.
    }

    // 파일 저장
    if (navigator.msSaveBlob) {
        return navigator.msSaveBlob(blob, url)  // TODO : url 처리
    } else {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.target = "_blank"
        link.download = fileName;   // 다운로드 파일명
        link.click();
    }
}
/************************************************************************/

/************************** event **************************/
$(document).on('input','input[inputmode=numeric]',function(){  // * inputmode가 numeric인 경우 숫자 이외의 문자를 입력하지 못하도록 하고, 3자리마다 ,을 추가하는 이벤트
    // ? https://amagrammer91.tistory.com/15 참조
    this.value = numberInputPreprocess(this.value);   // 입력값이 숫자가 아니면 공백으로 replace
    this.value = this.value.replace(/,/g,'');          // ,값 공백처리
    this.value = addCommaToNumber(this.value); // 정규식을 이용해서 3자리 마다 , 추가
});

$("input.chkAll").change(function (event) {
    const checkboxNm = event.target.name;

    if($(this).is(":checked")){ // 체크된 경우
        $(`input[name='${checkboxNm}']`).prop("checked", true)    // name이 동일한 체크박스를 모두 체크
    }else{
        $(`input[name='${checkboxNm}']`).prop("checked", false)   // name이 동일한 체크박스를 모두 체크 해제
    }
})

$(document).on("propertyChange keyup paste focus input", ".swal2-container .necessary-input", () => {  // * sweetAlert의 input 태그의 입력 이벤트
    const necessaryInputList = $(".swal2-container .necessary-input");  // * 입력값이 반드시 필요한 input 태그 모두 select
    let isFilled = true;    // * 입력값이 필요한 모든 input 태그에 값이 입력되었는지 나타내는 flag

    necessaryInputList.each((index, input) => { // 각각의 input 태그를 확인
        if(input.value === "")  // 입력된 값이 없는 경우
            isFilled = false;
    })

    if(isFilled){  // * 입력값이 필요한 모든 input 태그에 값이 입력된 경우
        disableSwalConfirmBtn(false) // 버튼을 enable
    }else{
        disableSwalConfirmBtn(true) // 버튼을 disable
    }
})
/************************************************************************/

/************************** sesstion timeout check **************************/
// TODO : ajax로 요청할 때마다 함수를 호출해주는 방법 말고 다른 방법 없는지 확인
// ? http://springisnotproblem.blogspot.com/2014/11/01-spring-security-session-time-out-ajax.html, ? https://stackoverflow.com/questions/24730917/spring-security-session-timeout-handling-for-ajax-calls 참조
function beforeAjaxSend(xhr) {
    xhr.setRequestHeader("AJAX", true);
}

function sessionTimeoutCheck(xhr) {
    if (xhr.status === 401) {
        alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");  // ! swalAlert를 사용하면 확인을 누르지 않아도, 로그인 페이지로 리다이렉트 돼서 alert를 사용해서 메시지를 확인해야 리다이렉트 되도록 함.
        location.href = loginPageUrl;
        return true;
    } else if (xhr.status === 403) {
        alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
        location.href = loginPageUrl;
        return true;
    }

    return false;
}
/************************************************************************/

/************************** Swal func **************************/
function swalAlert(option) {
    Object.assign(option, swalBasicOption); // 인자로 전달받은 option과 기본 옵션을 합침

    Swal.fire(option)
}

function swalConfirm(option) {
    const confirmBasicOption = {
        showCancelButton: true,
        cancelButtonText: "취소",
    }

    Object.assign(option, confirmBasicOption, swalBasicOption);   // 인자로 전달받은 option, 기본 option, confirm alert의 기본 옵션을 합침

    Swal.fire(option)
}

function disableSwalConfirmBtn(disable) {
    const confirmButton = $(".swal2-container .swal2-confirm"); // sweetAlert의 확인 버튼
    confirmButton.attr("disabled", disable);   // 버튼을 disable 또는 enable
}
/************************************************************************/

/************************** String func **************************/
function numberInputPreprocess(str) {  // 유저로부터 숫자를 입력 받을 때 전처리 작업
    return str.replace(/[^0-9]/g,'');    // 입력값이 숫자가 아니면 공백으로 replace
}

function addCommaToNumber(strNumber){    // 정규식을 이용해서 숫자의 3자리 마다 , 추가
    return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
/************************************************************************/


/************************** etc func **************************/
function delay(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

function basicAjaxRequest(option){   // * ajax 요청 기본 틀
    const successObj = option.successObj;
    const errorObj = option.errorObj;

    $.ajax({
        type : option.type,
        url : option.url,
        contentType: option.contentType,
        data : option.data,
        beforeSend : beforeAjaxSend,
        success : function (res){
            manipulateSuccessHandler(res, successObj, errorObj)
        },
        error : function (xhr) {
            const timeout = sessionTimeoutCheck(xhr);
            if(!timeout) swalAlert({icon : "error", html : errorObj.message})
        },
        complete : option.completeFunc
    })
}

function getTxtFromName(values, name){  // * ex. values = [{name : "in", text : "입고"}]에서 name 프로퍼티가 인자로 전달된 name과 같은 객체의 text 프로퍼티 값을 반환
    for(let value of values){
        if(value.name === name)
            return value.text
    }

    return null;
}
/************************************************************************/


function loading(flag){ // 로딩창을 생성 또는 삭제하는 함수
    if(flag === true){
        /* 로딩창 추가 */
        $(".loading-bg").removeClass("none")
        $(".infinityChrome").removeClass("none")
    }else{
        /* 로딩창 삭제 */
        $(".loading-bg").addClass("none")
        $(".infinityChrome").addClass("none")
    }
}
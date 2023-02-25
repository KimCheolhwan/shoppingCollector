(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/

    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){ // login.php의 form태그 안에서 form전송을 하기 전에 입력된 데이터의 유효성을 체크하기 위해 사용하는 이벤트.
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;    // 반환값에 따라 요청 여부가 결정된다.
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        /*
            if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                    return false;
                }
            }
            else {

            }
        */
        if($(input).val().trim() == ''){
            return false;
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent(); // parent는 input 태그 상위의 div 태그 즉, email을 잘못 입력한 경우 email에 해당하는 div        
        $(thisAlert).addClass('alert-validate');    // 해당 div에 alert-validate를 추가해 alert 메시지를 화면에 출력한다.
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);

<%--
  Created by IntelliJ IDEA.
  User: rlfal
  Date: 2020-10-19
  Time: 오후 6:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Shop Collector</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="<c:url value="/images/icons/favicon.ico"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/vendor/login/bootstrap/css/bootstrap.min.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/fonts/font-awesome-4.7.0/css/font-awesome.min.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/vendor/login/animate/animate.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/vendor/login/select2/select2.min.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/login/util.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/login/main.css"/>">
    </head>

    <body>
        <!-- 로그인 폼 https://uicookies.com/free-bootstrap-login-forms/ 참고-->
        <div class="limiter" style="background:url(/images/bg-01.jpg) no-repeat 0 0;background-size:110% 110%;">
            <!-- 바탕화면-->
            <div>
                <a id="logo_wrap" href="/login">
                    <img id="login_logo" src="/images/login_logo1_white.png"><!-- Shop Collector 로고-->
                </a>
            </div>

            <div class="container-login100">
                <div class="wrap-login100">
                    <div class="login100-pic js-tilt" data-tilt=""><img src="/images/img-01.png" alt="IMG"></div>

                    <form class="login100-form validate-form" action="/authenticate" method="post">
                        <span class="login100-form-title">Member Login</span>

                        <div class="wrap-input100 validate-input" id="id_wrap" data-validate="아이디를 입력해주세요.">
                            <input class="input100" type="text" name="loginId" placeholder="id">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div class="wrap-input100 validate-input" id="password_wrap" data-validate="비밀번호를 입력해주세요.">
                            <input class="input100" type="password" name="loginPwd" placeholder="Password">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>

                        <c:if test="${loginFailMsg != null}">
                            <script>
                                document.querySelector("#password_wrap").style.marginBottom = "0px";
                            </script>
                        </c:if>

                        <span class = "login-error-msg">${loginFailMsg}</span>

                        <button class="login100-form-btn" type="summit">Login</button>
                        <div class="text-center p-t-12"><span class="txt1">Forgot</span><a class="txt2" href="#"> Username / Password?</a></div>
                        <div class="text-center p-t-75"><a class="txt2" href="#">Create your Account<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true">         </i></a></div>
                    </form>
                </div>
            </div>
        </div>


        <script src="<c:url value="/vendor/login/jquery/jquery-3.2.1.min.js"/>"></script>
        <script src="<c:url value="/vendor/login/bootstrap/js/popper.js"/>"></script>
        <script src="<c:url value="/vendor/login/bootstrap/js/bootstrap.min.js"/>"></script>
        <script src="<c:url value="/vendor/login/select2/select2.min.js"/>"></script>
        <script src="<c:url value="/vendor/login/tilt/tilt.jquery.min.js"/>"></script>
        <script>
            $('.js-tilt').tilt({
                scale: 1.1
            })
        </script>
        <script src="<c:url value="/js/login/main.js"/>"></script>
    </body>
</html>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020-11-29
  Time: 오전 1:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
    <head>
        <title>Shop Collector</title>
        <link rel="icon" type="image/png" href="<c:url value="/images/icons/favicon.ico"/>">
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>

        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/nav.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/footer.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/gooey.css"/>">

        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/toggleButton.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/resizeTable.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/jellyCheckbox.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/common.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/inventory/common.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/inventory/addProducts/main.css"/>">
    </head>

    <body>
        <%@ include file="../common/nav.jsp"%>
        <%@ include file="../common/gooey.jsp"%>
        <div class="content-container">
            <div class="content">
                <div class = "add-product">
                    <div class="add-product__row">
                        <div class = "add-product__row-header">옵션 여부</div>
                        <label class="switch option-switch">
                            <input type="checkbox">
                            <div>
                                <span></span>
                            </div>
                        </label>
                    </div>

                    <div class = "none" data-option="off">
                        <div class="add-product__row">
                            <div class = "add-product__row-header">카테고리명 <span class = "necessary">*</span></div>
                            <select class= "add-product__input input-large" data-label = "category">
                                <option value="">선택1</option>
                            </select>
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">상품명 <span class = "necessary">*</span></div>
                            <input type="text" class= "add-product__input input-large" data-label = "productName" placeholder="상품명 입력">
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">제조사</div>
                            <input type="text" class= "add-product__input input-large" data-label = "manufacturer" placeholder="제조사 입력">
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">재고수량</div>
                            <input type="text" class= "add-product__input input-large" data-label = "amount" placeholder="재고수량 입력" inputmode="numeric">
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">입고일</div>
                            <input type="date" class= "add-product__input input-large" data-label = "warehouseDate">
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">단위</div>
                            <select class= "add-product__input input-large" data-label = "unit">
                            </select>
                        </div>
                    </div>

                    <div class = "none" data-option="on">
                        <div class="add-product__row">
                            <div class = "add-product__row-header">카테고리명 <span class = "necessary">*</span></div>
                            <select class= "add-product__input input-large" data-label = 'category'>
                            </select>
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">상품명 <span class = "necessary">*</span></div>
                            <input type="text" class= "add-product__input input-large" data-label = "productName" placeholder="상품명 입력">
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">제조사</div>
                            <input type="text" class= "add-product__input input-large" data-label = "manufacturer" placeholder="제조사 입력">
                        </div>

                        <div class="add-product__row">
                            <div class = "add-product__row-header">옵션 정보 <span class = "necessary">*</span></div>
                            <div class= "option-input-list">
                                <div class="option-wrap">
                                    <div class="input-wrap">
                                        <div class = "input-wrap__input-header">옵션값</div>
                                        <input class= "add-product__input" data-label = "optionValue" placeholder="예시 : 그린,블랙 (,로 구분)">
                                    </div>

                                    <div class="input-wrap">
                                        <label class="empty-area"></label>
                                        <button type="button" class="btn btn-success add-option">추가</button>
                                    </div>
                                </div>

                                <button type="button" class="btn btn-info option-apply" disabled>목록으로 적용 <i class="fa fa-arrow-down"></i></button>
                            </div>
                        </div>

                        <div class="add-product__row">
                            <div class = "product-info-container">
                                <button type="button" class="delete-all-row">삭제</button>
                                <table class="product-info-table table table-striped table-bordered table-resizable">
                                    <thead>
                                        <tr>
                                            <th><label class="checkbox"> <input type="checkbox" class = "chkAll" name = "chkProd"> <span class="icon"></span></label></th>
                                            <th>상품명</th>
                                            <th>재고수량 <br><button type="button" class="blanket-apply" data-label = "amount">일괄적용</button></th>
                                            <th>단위 <br><button type="button" class="blanket-apply" data-label = "unit">일괄적용</button></th>
                                            <th>입고일 <br><button type="button" class="blanket-apply" data-label = "warehouseDate">일괄적용</button></th>
                                            <th>삭제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                                <div class="no-product">
                                    <p class="message">상품 정보가 없습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="add-product__row">
                        <div class = "action">
                            <button type="button" class ="confirm-button">확인</button>
                            <button type="button" class ="cancel-button">취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%@include file="../common/footer.jsp"%>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js"integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://www.w3cplus.com/sites/default/files/blogs/2015/1506/gooey.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

        <script src="<c:url value="/js/common/gooeyMenu.js"/>"></script>
        <script src="<c:url value="/js/common/common.js"/>"></script>
        <script src="<c:url value="/js/common/resizeTable.js"/>"></script>
        <script src="<c:url value="/js/common/toggleButton.js"/>"></script>
        <script src="<c:url value="/js/inventory/common.js"/>"></script>
        <script src="<c:url value="/js/inventory/addProducts/main.js"/>"></script>
    </body>
</html>

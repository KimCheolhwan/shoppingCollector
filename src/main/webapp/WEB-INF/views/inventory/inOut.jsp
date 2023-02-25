<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020-12-04
  Time: 오전 3:37
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

        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/prodSearch.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/scrollbar.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/dropzone.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/radioButton.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/common.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/inventory/common.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/inventory/inOut/main.css"/>">
    </head>

    <body>
        <%@ include file="../common/nav.jsp"%>
        <%@ include file="../common/gooey.jsp"%>

        <div class="content-container dropZone">
            <form class = "drop-form uploadExcelForm" enctype="multipart/form-data">
                <input type="file" name="selectFile" class="uploadExcelForm__input none" accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
            </form>

            <div class="drag-bg dark-bg dark-bg--strict none">
                <span>파일을 여기에 올려주세요.</span>
            </div>

            <div class="content">
                <div class="in-out-container wrap-column">
                    <label class = "in-out-container__title">입/출고 관리</label>
                    <div class="wrap-util">
                        <div class = "radio-util">
                            <label class="radio">
                                <input type="radio" name = "in-out-radio" value="in" checked>  <!-- name 비우면 동작 안함 -->
                                <span>입고</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name = "in-out-radio" value="out">
                                <span>출고</span>
                            </label>
                        </div>

                        <div class = "upload-excel">
                            <button type="button" class="btn btn-info upload-excel-btn">엑셀로 등록하기</button>
                            <img class = "small-img upload-excel-desc" src="/images/question.png" alt="엑셀 등록 설명">
                        </div>
                    </div>

                    <div class = "wrap-row in-out-content">
                        <div class = "wrap-column">
                            <div class = "column-label">상품 선택</div>
                            <div class = "product-picker wrap-column">
                                <%-- tableUpdate : search form submit 이벤트 발생시 테이블 업데이트 여부 --%>
                                <%-- dataRange : 검색 범위 ('category', 'all') --%>
                                <jsp:include page="../common/prodSearch.jsp">
                                    <jsp:param name="tableUpdate" value="true"/>
                                    <jsp:param name="dataRange" value="all"/>
                                </jsp:include>

                                <div class = "product-list scrollbar">
                                    <div class = "no-product none">
                                        <span class = "message">상품 검색 결과가 없습니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class = "wrap-column">
                            <div class = "column-label">선택된 상품</div>
                            <div class = "picked-product wrap-column">
                                <div class = "product-list scrollbar">
                                </div>
                                <div class = "picked-summary wrap-row">
                                    <label class = "picked-summary__title">Total</label>
                                    <div class = "picked-summary__total-info">
                                        <span class = "picked-summary__label">상품 수 :</span>
                                        <span class = "picked-summary__product-count">0</span>
                                    </div>

                                    <div class = "picked-summary__total-info">
                                        <span class = "picked-summary__label">총 수량 :</span>
                                        <span class = "picked-summary__variation">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="text" class = "in-out-container__in-out-memo" placeholder="메모를 입력하세요.">
                    <div class="action">
                        <button type="button" class="confirm-button">확인</button>
                        <button type="button" class="cancel-button">취소</button>
                    </div>
                </div>
            </div>
        </div>

        <%@ include file="../common/footer.jsp"%>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="crossorigin="anonymous"></script>
        <script src="https://www.w3cplus.com/sites/default/files/blogs/2015/1506/gooey.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js"></script>

        <script src="<c:url value="/js/common/gooeyMenu.js"/>"></script>
        <script src="<c:url value="/js/common/common.js"/>"></script>

        <script src="<c:url value="/js/common/dropzone.js"/>"></script>
        <script src="<c:url value="/js/common/excel.js"/>"></script>
        <script src="<c:url value="/js/inventory/common.js"/>"></script>
        <script src="<c:url value="/js/inventory/prodSearch.js"/>"></script>
        <script src="<c:url value="/js/inventory/inOut/main.js"/>"></script>
    </body>
</html>

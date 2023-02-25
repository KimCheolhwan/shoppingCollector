<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020-11-13
  Time: 오전 4:24
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

        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/table2.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/prodSearch.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/verticalTab.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/expand.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/more.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/jellyCheckbox.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/scrollbar.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/common.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/inventory/manage/main.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/inventory/common.css"/>">
    </head>

    <body>
        <%@ include file="../common/nav.jsp"%>
        <%@ include file="../common/gooey.jsp"%>

        <div class="content-container">
            <div class="content">
                <div class = "category-list" id="accordian">
                    <ul class="show-dropdown main-navbar">
                        <div class="selector-active">
                            <div class="top"></div>
                            <div class="bottom"></div>
                        </div>

                        <button class="btn-cate add-category" type="button"> + 카테고리 추가</button>
                    </ul>
                </div>

                <div class = "inventory-manage">
                    <div class = "wrap-util">
                        <div class="wrap-util__util-left">
                            <button class = "kakao-btn btn-download link-util download-inventory-status"><span class="kakao-ico ico-download"></span><span>재고 현황 다운로드</span></button>
                        </div>

                        <div class="wrap-util__util-right">
                            <button class = "kakao-btn btn-refresh link-util"><span class="kakao-ico ico-refresh"></span><span>새로고침</span></button>
                            <a href="/inventory/products/in-out"><button class = "kakao-btn btn-in-out in-out-manage link-util"><i class="ico-in-out fa fa-truck"></i>입/출고 관리</button></a>
                            <a href="/inventory/products/add"><button class = "kakao-btn btn-add-blue add-product link-util-blue"><span class="kakao-ico ico-add-blue"></span>상품 추가</button></a>
                        </div>
                    </div>

                    <div class="table-container">
                        <div class="product-table responsive-table data-group">
                            <ul class="product-table__header">
                                <li class="product-table__wrap-util">
                                    <div class="dropdown">
                                        <button class="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown">수정/추가
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li class = "dropdown-item mod-prodNm"><a>상품명 수정</a></li>
                                            <li class = "dropdown-item mod-all-category"><a>카테고리 수정</a></li>
                                            <li class = "dropdown-item mod-all-unit"><a>단위 수정</a></li>
                                            <li class = "dropdown-item mod-all-manufacturer"><a>제조사 수정</a></li>
                                            <li class = "dropdown-item mod-all-warehouseDt"><a>입고일 수정</a></li>
                                            <li class = "dropdown-item add-all-childProd"><a>구성상품 추가</a></li>
                                        </ul>
                                    </div>

                                    <div class="dropdown">
                                        <button class="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">삭제/해제
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li class = "dropdown-item del-all-prod"><a>상품 삭제</a></li>
                                            <li class = "dropdown-item release-all-childProd"><a>구성상품 해제</a></li>
                                        </ul>
                                    </div>

                                    <div class = "check-info">
                                        <span class = "none cnt-box check-info__parent-info"><span class = "cnt-box__cnt"></span>개의 상품 선택</span>
                                        <span class = "none cnt-box check-info__child-info"><span class = "cnt-box__cnt"></span>개의 구성상품 선택</span>
                                    </div>

                                    <%-- tableUpdate : search form submit 이벤트 발생시 테이블 업데이트 여부 --%>
                                    <%-- dataRange : 검색 범위 ('category', 'all') --%>
                                    <div class="search wrap-row">
                                        <span class = "cnt-box">(총 <span class = "cnt-box__cnt total-prod-cnt">0</span>건)</span>

                                        <jsp:include page="../common/prodSearch.jsp">
                                            <jsp:param name="tableUpdate" value="true"/>
                                            <jsp:param name="dataRange" value="category"/>
                                        </jsp:include>
                                    </div>
                                </li>

                                <li class = "product-table__col-desc">
                                    <div class="col col-3">
                                        <label class = "checkbox">
                                            <input type='checkbox' class = "chkAll chkProd" name = "checkParentProd" data-parent = true>
                                            <span class = 'icon'></span>
                                        </label>
                                    </div>
                                    <div class="col col-25">상품명</div>
                                    <div class="col col-15">수량</div>
                                    <div class="col col-20">제조사</div>
                                    <div class="col col-15">입고일</div>
                                    <div class="col col-25">카테고리</div>
                                    <div class="col col-3"></div>
                                </li>
                            </ul>

                            <ul class = "product-table__body scrollbar">
                            </ul>

                            <div class = "no-product none">
                                <p class = "message">해당 카테고리에 등록된 상품 정보가 없습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <%@include file="../common/footer.jsp"%>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js"integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="https://www.w3cplus.com/sites/default/files/blogs/2015/1506/gooey.min.js"></script>

        <script src="<c:url value="/js/common/gooeyMenu.js"/>"></script>
        <script src="<c:url value="/js/inventory/common.js"/>"></script>

        <script src="<c:url value="/js/common/more.js"/>"></script>
        <script src="<c:url value="/js/common/common.js"/>"></script>
        <script src="<c:url value="/js/common/expand.js"/>"></script>
        <script src="<c:url value="/js/common/verticalTab.js"/>"></script>
        <script src="<c:url value="/js/inventory/prodSearch.js"/>"></script>
        <script src="<c:url value="/js/inventory/manage/main.js"/>"></script>
    </body>
</html>

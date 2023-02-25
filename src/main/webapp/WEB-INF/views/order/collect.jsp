<%--
  Created by IntelliJ IDEA.
  User: rlfal
  Date: 2020-10-19
  Time: 오후 5:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Shop Collector</title>
        <link rel="icon" type="image/png" href="<c:url value="/images/icons/favicon.ico"/>">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

        <link rel="stylesheet" type="text/css" href="<c:url value="/vendor/table/bootstrap/css/bootstrap.min.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/vendor/table/animate/animate.css"/>">

        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/nav.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/footer.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/gooey.css"/>">

        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/table1/util.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/table1/main.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/loading.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/jellyCheckbox.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/common/common.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/order/collect/main.css"/>">
    </head>

    <body>
        <%@ include file="../common/nav.jsp"%>
        <%@ include file="../common/gooey.jsp"%>

        <div class="content-container">
            <div class="content">
                <table class = "collect-option-table shadow">
                    <tr>
                        <td class = "collect-option-table__desc">주문수집<img class = "small-img question-img option-desc" src = "<c:url value="/images/question.png"/>" alt="주문 수집 기능 설명"></td>
                        <td>
                            <button type="button" class="btn btn-outline-primary collect-option-table__collect-mode" data-mode = "new">신규</button>
                            <button type="button" class="btn btn-outline-success collect-option-table__collect-mode" data-mode = "total">전체</button>
                            <button type="button" class="btn btn-outline-danger collect-option-table__collect-mode" data-mode = "new+total">신규 + 전체</button>
                        </td>
                    </tr>
                </table>

                <div class="shop-table">
                    <table class="shadow">
                        <thead>
                            <tr>
                                <th rowspan="2">No</th>
                                <th rowspan="2" class="checkbox-col">
                                    <label class = "checkbox"> <input type='checkbox' class = "chkAll" name = "chkShop"> <span class = 'icon'></span></label>
                                </th>
                                <th rowspan="2">쇼핑몰명</th>
                                <th rowspan="2">아이디 개수</th>
                                <th colspan="7">최근 주문 수집<img class = "small-img question-img collect-info-desc" src="<c:url value="/images/question.png"/>" alt="주문 수집 정보 설명"></th>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <th>날짜</th>
                                <th>에러</th>
                                <th>발주 확인 여부</th>
                                <th>신규 주문 개수</th>
                                <th>발주확인 개수</th>
                                <th>총 주문 개수</th>
                            </tr>
                        </thead>

                        <tbody>
                            <c:forEach var="shopInfo" items="${shopInfoList}" varStatus="status">
                                <c:forEach var="accountNumInfo" items = "${accountNumInfoList}">
                                    <c:if test="${accountNumInfo.get('shopName').equals(shopInfo.name)}">
                                        <c:set var = "accountNum" value="${accountNumInfo.get('num')}"/>
                                    </c:if>
                                </c:forEach>

                                <tr data-shop-name-en = "${shopInfo.name}" data-shop-name-ko = ${shopNameDict.get(shopInfo.name)}>
                                    <td>${status.index + 1}</td>
                                    <td>
                                        <label class = "checkbox"> <input type='checkbox' name = "chkShop"> <span class = 'icon'></span></label>
                                    </td>
                                    <td class = "shop-table__shop-name p-t-5 p-b-5">
                                        <a href="${shopInfo.url}">
                                            <img class = "shop-table__shop-img" src="${shopInfo.src}" alt="${shopInfo.name}"><br>
                                                ${shopNameDict.get(shopInfo.name)}
                                        </a>
                                    </td>

                                    <td class = "account-num">${accountNum}</td>

                                    <td class = "shop-id recent-collect-info"></td>
                                    <td class = "collect-date recent-collect-info"></td>
                                    <td class = "error recent-collect-info"></td>
                                    <td class = "order-confirmed recent-collect-info"></td>
                                    <td class = "total-new-order-num recent-collect-info"></td>
                                    <td class = "order-confirm-num recent-collect-info"></td>
                                    <td class = "total-order-num recent-collect-info"></td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <%@include file="../common/footer.jsp"%>
        <%@include file="../common/loading.jsp"%>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js"integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <script src="https://www.w3cplus.com/sites/default/files/blogs/2015/1506/gooey.min.js"></script>

        <script src="<c:url value="/js/common/gooeyMenu.js"/>"></script>
        <script src="<c:url value="/js/common/common.js"/>"></script>
        <script src="<c:url value="/vendor/table/bootstrap/js/popper.js"/>"></script>
        <script src="<c:url value="/vendor/table/bootstrap/js/bootstrap.min.js"/>"></script>
        <script src="<c:url value="/vendor/table/select2/select2.min.js"/>"></script>
        <script src="<c:url value="/js/order/collect/main.js"/>"></script>
        <script src="<c:url value="/js/common/loading.js"/>"></script>
    </body>
</html>
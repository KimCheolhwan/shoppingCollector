<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020-11-14
  Time: 오전 3:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<form class="search-form" data-table-update = "${param.tableUpdate}" data-range = "${param.dataRange}">
    <button type="submit" class = "kakao-btn btn-search"><span class="kakao-ico ico-search"></span></button>

    <input type = "search" placeholder="상품명 검색" class="search-form__search-input" data-last-input = "0"/>
    <button class = "kakao-btn btn-cancel"><span class="kakao-ico ico-cancel"></span></button>
    <div class = "search-form__suggestions" data-selected = "0"></div>  <%-- 추천 검색어 container --%>
</form>
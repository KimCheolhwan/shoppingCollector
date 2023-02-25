<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020-11-13
  Time: 오전 5:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="tab-wrapper">
    <!-- Tab panes -->
    <nav id="gooey-v" class="navimenu">
        <input type="checkbox" class="menu-open" name="menu-open4" id="menu-open4">
        <label class="open-button" for="menu-open4" style="width: 70px; height: 70px; background-color: rgb(233, 123, 122); line-height: 70px;">
            <span class="burger burger-1" style="font-size: 0.8em; width: 35px; height: 3px; left: 17.5px;"></span>
            <span class="burger burger-2" style="font-size: 0.8em; width: 35px; height: 3px; left: 17.5px;"></span>
            <span class="burger burger-3" style="font-size: 0.8em; width: 35px; height: 3px; left: 17.5px;"></span>
        </label>
        <a href="/logout" class="gooey-menu-item" style="width: 70px; height: 70px; color: white; background-color: rgb(233, 123, 122); line-height: 70px;">
            <i class="fa fa-sign-out menu__icon"></i>
        </a>
        <a href="#" class="gooey-menu-item" style="width: 70px; height: 70px; color: white; background-color: rgb(233, 123, 122); line-height: 70px;">
            <i class='fa fa-user'></i>
        </a>
    </nav>
</div>

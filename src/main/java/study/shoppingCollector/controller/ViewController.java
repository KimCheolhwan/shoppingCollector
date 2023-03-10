package study.shoppingCollector.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ViewController {
    private final TestService testService;

    public final User user = new User(1,"jasd0330@naver.com","12341234", new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()));
    @GetMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        return "login";
    }

    @GetMapping("/order/collect")
    public String collect(HttpServletRequest request, HttpServletResponse response) {
        return "order/collect";
    }

    @GetMapping("/inventory/manage")
    public String manage(HttpServletRequest request, HttpServletResponse response) {
        return "inventory/manage";
    }

    @GetMapping("/inventory/products/add")
    public String addProduct(HttpServletRequest request, HttpServletResponse response) {
        return "inventory/addProducts";
    }

    @PostMapping("/authenticate")
    public String authenticate(@RequestParam(name="loginId") String loginId, HttpServletRequest request, HttpServletResponse response) {
        return "inventory/manage";
    }

}
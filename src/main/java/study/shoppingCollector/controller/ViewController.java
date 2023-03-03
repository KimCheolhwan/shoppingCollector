package study.shoppingCollector.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
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
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ViewController {
    private final TestService testService;

    @GetMapping("/")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        log.info("@GetMapping(\"/\")");
        return "login";
    }

    @GetMapping("/order/collect")
    public String collect(HttpServletRequest request, HttpServletResponse response) {
        log.info("@GetMapping(\"/order/collect\")");
        return "order/collect";
    }

    @GetMapping("/inventory/manage")
    public String manage(HttpServletRequest request, HttpServletResponse response) {
        log.info("@GetMapping(\"/inventory/manage\")");
        return "inventory/manage";
    }
    @GetMapping("/inventory/products/add")
    public String addProduct(HttpServletRequest request, HttpServletResponse response) {
        log.info("@GetMapping(\"/inventory/products/add\")");
        return "inventory/addProducts";
    }

    @PostMapping("/authenticate")
    public String authenticate(@RequestParam(name="loginId") String loginId, HttpServletRequest request, HttpServletResponse response) {
        log.info("@PostMapping(\"/authenticate\")");

        User user = testService.findByUser(loginId);
        if(user == null)
        {
            return "login";
        }
        HttpSession session = request.getSession();

        session.setAttribute(user.getEmail(),user);

        log.info("session = " + session);
        log.info("loginId = " + loginId);

        return "inventory/manage";
    }

}
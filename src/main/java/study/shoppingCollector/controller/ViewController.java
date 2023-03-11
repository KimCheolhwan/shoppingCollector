package study.shoppingCollector.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ViewController {
    private final TestService testService;


    @GetMapping("/")
    public String login(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session.getAttribute(session.getId()) == null)
            session.invalidate();
        return "login";
    }

    @GetMapping("/order/collect")
    public String collect(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session.getAttribute(session.getId()) == null)
            return "redirect:/";
        return "order/collect";
    }

    @GetMapping("/inventory/manage")
    public String manage(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session.getAttribute(session.getId()) == null)
            return "redirect:/";
        return "inventory/manage";
    }

    @GetMapping("/inventory/products/add")
    public String addProduct(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session.getAttribute(session.getId()) == null)
            return "redirect:/";
        log.info(request.getSession(false).getId());
        return "inventory/addProducts";
    }

    @PostMapping("/authenticate")
    public String authenticate(HttpServletRequest request, @ModelAttribute User user) {
        User foundUser = testService.findByUser(user);
        if(foundUser==null)
            return "redirect:/";

        HttpSession session = request.getSession(true);
        session.setAttribute(session.getId(), foundUser);

        log.info("session Id:" + session.getId());
        User found2User = (User) session.getAttribute(session.getId());
        return "inventory/manage";

    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null)
            session.invalidate();
        return "redirect:/";
    }
}
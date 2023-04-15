package study.shoppingCollector.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;
import study.shoppingCollector.session.LoginUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ViewController {
    private final TestService testService;


    @GetMapping("/")
    public String login(HttpServletRequest request, @LoginUser User user) {
//        Enumeration<String> attributeNames = request.getSession(false).getAttributeNames();
//
//        while(attributeNames.hasMoreElements())
//        {
//            log.info(attributeNames.nextElement());
//        }
//        if(isExist(user))
//            request.getSession(false).invalidate();

        return "login";
    }

    @GetMapping("/order/collect")
    public String collect(@LoginUser User user) {
        if(!isExist(user))
            return "redirect:/";
        return "order/collect";
    }

//    @GetMapping("/inventory/manage")
//    public String manage(@LoginUser User user, HttpServletRequest request) {
//        if(!isExist(user))
//            return "redirect:/";
//        log.info("session:" + request.getSession(false).getId());
//        return "inventory/manage";
//    }

    @GetMapping("/inventory/products/add")
    public String addProduct(@LoginUser User user) {
        if(!isExist(user))
            return "redirect:/";
        return "inventory/addProducts";
    }

    @PostMapping("/authenticate")
    public String authenticate(HttpServletRequest request, @ModelAttribute User user) {
        User foundUser = testService.findByUser(user);
        if(foundUser==null)
            return "redirect:/";

        HttpSession session = request.getSession(true);
        session.setAttribute(session.getId(), foundUser);

        return "inventory/manage";

    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, @LoginUser User user) {
        if(!isExist(user))
            request.getSession(false).invalidate();
        return "redirect:/";
    }

    public boolean isExist(User user){
         return user.getLoginId() != null;
    }
}
package study.shoppingCollector.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.Date;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ViewController {
    private final TestService testService;

    @GetMapping("/")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        log.info("/");
        return "login";
    }

    @GetMapping("/order/collect")
    public String collect(HttpServletRequest request, HttpServletResponse response) {
        log.info("/order/collect");
        return "order/collect";
    }

    @GetMapping("/inventory/manage")
    public String manage(HttpServletRequest request, HttpServletResponse response) {
        log.info("/inventory/manage");
        return "inventory/manage";
    }

    @PostMapping("/authenticate")
    public String authenticate(HttpServletRequest request, HttpServletResponse response) {
        log.info("/authenticate");
        HttpSession session = request.getSession(true);

        return "inventory/manage";
    }

    @GetMapping("/test")
    public String test(){
        User user = new User();
        user.setUser_id(2);
        List<Category> list = testService.getAllCategoryList(user);
        for(int i=0;i<list.size();i++)
        {
            log.info(list.get(i).getName());
        }
        return "inventory/manage";
    }
}

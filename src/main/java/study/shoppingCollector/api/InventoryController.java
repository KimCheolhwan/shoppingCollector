package study.shoppingCollector.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
@RestController
@Slf4j
@RequiredArgsConstructor
public class InventoryController {

    private final TestService testService;

    @GetMapping("/inventory/categories")
    public ResponseEntity<List<Category>> categories(Model model) {
        log.info("inventory/categories");
        User user = new User();
        user.setUser_id(1);
        List<Category> list = testService.getAllCategoryList(user);

        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return ResponseEntity.ok(list);

    }
    @GetMapping("/inventory/product")
    public ResponseEntity<List<Item>> items(@RequestParam(value = "categoryName") String categoryName, @RequestParam(value = "query") String query) {
        log.info("inventory/product");
        log.info("{} {}",categoryName, query);
//        int category_id = testService.getCategoryId(categoryName);
//        log.info(category_id + " ");
        List<Item> items = new ArrayList<Item>();
        List<Item> child = new ArrayList<Item>();
//        child.add(new Item("child1",1,"(1)","Child1","2023.02.01","name1"));
//        child.add(new Item("child2",2,"(2)","Child2","2023.02.01","name1"));
//        List<Item> child2 = new ArrayList<Item>();
//        child2.add(new Item("child3",1,"(1)","Child3","2023.02.01","name1"));
//        child2.add(new Item("child4",2,"(1)","Child4","2023.02.01","name1"));
//        Items.add(new Item("item1",1,"(1)","제조사1","2023.02.01","name1",child));
//        Items.add(new Item("item2",2,"(2)","제조사2","2023.02.01","name1",child2));


        return new ResponseEntity<>(items, HttpStatus.OK);

    }
}
